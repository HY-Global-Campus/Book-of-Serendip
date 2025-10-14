// import React, { useRef, CSSProperties } from 'react';
import React, { useRef, useCallback } from 'react';
import '../pages.css'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Header from '../../Components/Header';
import { getCourseByUserId, updateCourse, Course } from '../../api/courseService';
import { ExerciseContext } from '../../Components/Exercise/ExerciseContext';
import axios from 'axios';
import { exercisesMeta } from '../../../content/exercises';

// Define the type for the mutation context
type MutationContext = {
  previousData?: Course;
};

const ExercisePage: React.FC = () => {
  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('id');
  const location = useLocation();
  const navigate = useNavigate();

  // Use `useQuery` to fetch the bookOne data
  const { data: bookOne, isLoading: loading, error } = useQuery<Course, Error>({
    queryKey: ['course', userId], // Unique query key
    queryFn: () => getCourseByUserId(userId!), // Query function
    enabled: !!userId, // Only run if userId exists
  }, queryClient);



  // Mutation for updating BookOne
  const mutation = useMutation<Course, Error, Partial<Course>, MutationContext>({
    mutationFn: async (updatedBook: Partial<Course>) => {
      // Get the current optimistic data from the cache instead of using stale bookOne
      const currentData = queryClient.getQueryData<Course>(['course', userId]);
      if (!currentData) {
        throw new Error('Course data is not defined');
      }
      return await updateCourse(currentData.id, updatedBook);
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ['course', userId],
      }); // Cancel queries to ensure fresh data
      const previousData = queryClient.getQueryData<Course>(['course', userId]);
      queryClient.setQueryData<Course>(['course', userId], (old) => {
        if (!old) {
          throw new Error('bookOne is not defined');
        }
        return { ...old, ...newData };
      });
      return { previousData };
    },
    onError: (error, _newData, context) => {
      console.error('Error updating BookOne:', error);
      if (context?.previousData) {
        queryClient.setQueryData<Course>(['course', userId], context.previousData);
      }
    },
  });

  // Immediate UI update function (no debounce, no server calls)
  const updateBookOneImmediate = useCallback((updateFn: Partial<Course> | ((current: Course) => Course)) => {
    queryClient.setQueryData<Course>(['course', userId], (old) => {
      if (!old) return old;
      
      if (typeof updateFn === 'function') {
        return updateFn(old);
      } else {
        return { ...old, ...updateFn };
      }
    });
  }, [queryClient, userId]);

  // Debounced server save function
  const debouncedSaveToServer = useRef(
    debounce(() => {
      const currentData = queryClient.getQueryData<Course>(['course', userId]);
      if (currentData) {
        mutation.mutate(currentData);
      }
    }, 1000)
  ).current;

  // Combined function that updates UI immediately and saves to server later
  const onUpdateBookOne = useCallback((updateFn: Partial<Course> | ((current: Course) => Course)) => {
    updateBookOneImmediate(updateFn);
    debouncedSaveToServer();
  }, [updateBookOneImmediate, debouncedSaveToServer]);


  if (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      sessionStorage.clear();
      return <Navigate to ="/login" />;
      }
  }

  return (
    <>
      <Header />
      <div className="exercise-page">
        <ExerciseContext.Provider value={{ bookOne: bookOne || null, loading, error: error?.message || null, readonly: false, onUpdateBookOne }}>
          <Outlet />
          <NavigationControls bookOne={bookOne} currentPath={location.pathname} onNavigate={navigate} />
        </ExerciseContext.Provider>
      </div>
    </>
  );
};

export default ExercisePage;

type NavProps = {
  bookOne: Course | undefined;
  currentPath: string;
  onNavigate: ReturnType<typeof useNavigate>;
};

const NavigationControls: React.FC<NavProps> = ({ bookOne, currentPath, onNavigate }) => {
  const currentIndex = exercisesMeta.findIndex(e => e.route === currentPath);
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === exercisesMeta.length - 1;

  const validate = (): boolean => {
    if (!bookOne) return false;
    const meta = exercisesMeta[currentIndex];
    if (!meta) return true;
    const data: any = (bookOne as any).exercises?.[meta.id];
    if (meta.type === 'text') {
      if (meta.props?.required) return !!data?.value && String(data.value).trim().length > 0;
      return true;
    }
    if (meta.type === 'table') {
      if (!meta.props?.required) return true;
      const rows: string[][] = data?.value ?? [];
      return rows.some(r => r.some(c => (c ?? '').trim().length > 0));
    }
    return true;
  };

  const goPrev = () => {
    if (isFirst) return;
    const prev = exercisesMeta[currentIndex - 1];
    if (prev) onNavigate(prev.route);
  };

  const goNext = () => {
    if (isLast) return;
    if (!validate()) return;
    const next = exercisesMeta[currentIndex + 1];
    if (next) onNavigate(next.route);
  };

  const canNext = !isLast && validate();

  return (
    <div className="exercise-navigation">
      <button className="nav-button" onClick={goPrev} disabled={isFirst}>←</button>
      <button className="nav-button" onClick={goNext} disabled={!canNext}>→</button>
    </div>
  );
};
