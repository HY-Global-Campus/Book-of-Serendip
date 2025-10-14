import { createContext, useContext } from 'react';
import { Course } from '../../api/courseService';

interface ExerciseContextProps {
  bookOne: Course | null;
  loading: boolean;
  error: string | null;
  readonly: boolean;
  onUpdateBookOne: (updatedBook: Partial<Course>) => void;
}

export const ExerciseContext = createContext<ExerciseContextProps | undefined>(undefined);

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider');
  }
  return context;
};
