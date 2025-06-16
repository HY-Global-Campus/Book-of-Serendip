// import React, { useRef, CSSProperties } from 'react';
import React, { useRef } from 'react';
import '../pages.css'
import { Navigate, Outlet } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Header from '../../Components/Header';
import { getBookOneByUserId, updateBookOne, BookOne } from '../../api/bookOneService';
import { ExerciseContext } from '../../Components/Exercise/ExerciseContext';
import axios from 'axios';

// Define the type for the mutation context
type MutationContext = {
  previousData?: BookOne;
};

const ExercisePage: React.FC = () => {
  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('id');

  // Use `useQuery` to fetch the bookOne data
  const { data: bookOne, isLoading: loading, error } = useQuery<BookOne, Error>({
    queryKey: ['bookone', userId], // Unique query key
    queryFn: () => getBookOneByUserId(userId!), // Query function
    enabled: !!userId, // Only run if userId exists
  }, queryClient);



  // Mutation for updating BookOne
  const mutation = useMutation<BookOne, Error, Partial<BookOne>, MutationContext>({
    mutationFn: async (updatedBook: Partial<BookOne>) => {
      if (!bookOne) {
        throw new Error('bookOne is not defined');
      }
      return await updateBookOne(bookOne.id, updatedBook);
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ['bookone', userId],
      }); // Cancel queries to ensure fresh data
      const previousData = queryClient.getQueryData<BookOne>(['bookone', userId]);
      queryClient.setQueryData<BookOne>(['bookone', userId], (old) => {
        if (!old) {
          throw new Error('bookOne is not defined');
        }
        return { ...old, ...newData };
      });
      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['bookone', userId], data);
      console.log('BookOne updated successfully');
    },
    onError: (error, _newData, context) => {
      console.error('Error updating BookOne:', error);
      if (context?.previousData) {
        queryClient.setQueryData<BookOne>(['bookone', userId], context.previousData);
      }
    },
  });

  // Debounced mutation to avoid multiple rapid updates
  const debouncedUpdateBookOne = useRef(
    debounce((updatedBook: Partial<BookOne>) => mutation.mutate(updatedBook), 500)
  ).current;


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
        <ExerciseContext.Provider value={{ bookOne: bookOne || null, loading, error: error?.message || null, readonly: false, onUpdateBookOne: debouncedUpdateBookOne }}>
          <Outlet />
        </ExerciseContext.Provider>
      </div>
    </>
  );
};

export default ExercisePage;
