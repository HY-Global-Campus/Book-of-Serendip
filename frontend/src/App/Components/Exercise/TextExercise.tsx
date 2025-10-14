import React, { useMemo } from 'react';
import { useExerciseContext } from './ExerciseContext';
import { exercisesMeta } from '../../../content/exercises';
import { useLocation } from 'react-router-dom';
import './exercises.css';

const TextExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, readonly } = useExerciseContext();
  const location = useLocation();
  const meta = exercisesMeta.find(e => e.route === location.pathname);

  if (!meta) return null;

  const value: string = (bookOne as any)?.exercises?.[meta.id]?.value ?? '';
  const placeholder = meta.props?.placeholder ?? '';

  const onChange = useMemo(() => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onUpdateBookOne({
      exercises: {
        ...(bookOne as any)?.exercises,
        [meta.id]: { value: e.target.value },
      },
    } as any);
  }, [bookOne, onUpdateBookOne, meta?.id]);

  const multiline = !!meta.props?.multiline;

  return (
    <div className="exercise-content">
      <div className="exercise-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 className="exercise-title">{meta.title}</h2>
        {multiline ? (
          <textarea 
            className="exercise-textarea"
            value={value} 
            onChange={onChange} 
            disabled={readonly} 
            placeholder={placeholder}
            style={{ flex: 1 }}
          />
        ) : (
          <input 
            className="exercise-input"
            value={value} 
            onChange={onChange} 
            disabled={readonly} 
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export default TextExercise;


