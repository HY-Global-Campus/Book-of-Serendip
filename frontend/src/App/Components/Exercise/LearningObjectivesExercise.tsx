import React, { useCallback } from 'react';
import { useExerciseContext } from './ExerciseContext';
import { exercisesMeta } from '../../../content/exercises';
import { useLocation } from 'react-router-dom';
import ChatBot from '../ChatBot';

const LearningObjectivesExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, readonly } = useExerciseContext();
  const location = useLocation();
  const meta = exercisesMeta.find(e => e.route === location.pathname);

  if (!meta) return null;

  const getFieldValue = useCallback((fieldLabel: string) => {
    if (!bookOne || !meta?.id) return '';
    const exerciseData = (bookOne as any).exercises?.[meta.id];
    return exerciseData?.[fieldLabel] || '';
  }, [bookOne, meta?.id]);

  const updateFieldValue = useCallback((fieldLabel: string, value: string) => {
    if (!onUpdateBookOne || !meta?.id) return;
    
    // Use a function to get the current state instead of relying on stale closure
    onUpdateBookOne((currentBookOne: any) => {
      if (!currentBookOne) return currentBookOne;
      
      const currentData = currentBookOne.exercises?.[meta.id] || {};
      const updatedData = {
        ...currentData,
        [fieldLabel]: value
      };

      return {
        ...currentBookOne,
        exercises: {
          ...currentBookOne.exercises,
          [meta.id]: updatedData
        }
      };
    });
  }, [onUpdateBookOne, meta?.id]);

  if (!meta?.props?.leftColumn || !meta?.props?.rightColumn) {
    return <div>Invalid exercise configuration</div>;
  }

  const { leftColumn, rightColumn } = meta.props;

  return (
    <div className="exercise-content">
      <div className="exercise-two-column">
        <div className="exercise-column">
          <h2 className="exercise-title">{leftColumn.title}</h2>
          {leftColumn.description && (
            <p className="exercise-description" style={{
              marginBottom: '24px',
              lineHeight: '1.5',
              fontSize: '16px',
              color: '#000',
              whiteSpace: 'pre-line'
            }}>
              {leftColumn.description}
            </p>
          )}
          {leftColumn.fields.map((field, index) => (
            <div key={index} style={{ marginBottom: '24px', minHeight: '140px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                fontFamily: "'Gotham Narrow', Arial, sans-serif",
                fontSize: '16px',
                color: '#000'
              }}>
                {field.label}:
              </label>
              <textarea
                className="exercise-textarea"
                value={getFieldValue(field.label)}
                onChange={(e) => updateFieldValue(field.label, e.target.value)}
                disabled={readonly}
                placeholder={field.placeholder}
                required={field.required}
                rows={6}
                style={{
                  width: '100%',
                  border: '1px solid #000',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '16px',
                  fontFamily: "'Gotham Narrow', Arial, sans-serif",
                  background: 'white',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  minHeight: '120px',
                  height: '120px'
                }}
              />
            </div>
          ))}
        </div>
        <div className="exercise-column">
          <h2 className="exercise-title">{rightColumn.title}</h2>
          <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '450px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              background: '#f5f5f5',
              padding: '12px 16px',
              borderBottom: '1px solid #ccc',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#666',
              flexShrink: 0
            }}>
              Conversation with Chatbot
            </div>
            <div style={{ 
              flex: 1, 
              minHeight: 0,
              height: '100%',
              position: 'relative'
            }}>
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningObjectivesExercise;
