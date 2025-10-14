import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCourseByUserId, Course } from '../../api/courseService';
import { useParams } from 'react-router';
import { ExerciseContext } from '../../Components/Exercise/ExerciseContext';
import { exercisesMeta } from '../../../content/exercises';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header';

const ViewAllExercises: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: bookOne, isLoading: loading, error } = useQuery<Course, Error>({
    queryKey: ['course', userId],
    queryFn: () => getCourseByUserId(userId!),
    enabled: !!userId
  });



  if (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      sessionStorage.clear();
      return <Navigate to="/login" />;
    }
  }

  return (
    <>
      <Header />
      <div className="exercise-container">
        <div className="exercise-content">
        <ExerciseContext.Provider
          value={{
            bookOne: bookOne || null,
            onUpdateBookOne: () => {},
            loading,
            error: error?.message || null,
            readonly: true
          }}
        >
          {exercisesMeta.map(meta => (
            <div key={meta.id} className="exercise-panel">
              <h2 className="exercise-title">{meta.title}</h2>
              {meta.type === 'text' ? (
                <div className="readonly-text">
                  {(bookOne as any)?.exercises?.[meta.id]?.value || ''}
                </div>
              ) : (
                <table className="table-exercise">
                  <thead>
                    <tr>
                      {(meta.props?.headers ?? []).map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(((bookOne as any)?.exercises?.[meta.id]?.value as string[][]) || []).map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </ExerciseContext.Provider>
        </div>
      </div>
    </>
  );
};

export default ViewAllExercises;
