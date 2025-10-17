import { createContext, useContext } from 'react';
import { BookOne } from '../../api/bookOneService';

interface ExerciseContextProps {
  bookOne: BookOne | null;
  loading: boolean;
  error: string | null;
  readonly: boolean;
  onUpdateBookOne: (updatedBook: Partial<BookOne>) => void;
}

export const ExerciseContext = createContext<ExerciseContextProps | undefined>(undefined);

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider');
  }
  return context;
};
