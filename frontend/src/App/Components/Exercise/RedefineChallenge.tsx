
import React, { useState, useEffect } from 'react';
import ExpandingTextArea from './ExpandingTextarea';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import { RedefineChallenge } from '../../../types/exercises';
import { useExerciseContext } from './ExerciseContext';
const infotext = `Write a definition for the problem you have chosen. What exactly does it mean? Why is it a problem? What are the causes and consequences it implies?`;

const RedefineChallengeExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, loading, error, readonly } = useExerciseContext(); 

  const [answers, setAnswers] = useState<RedefineChallenge>({
    left: {
      title: 'Redefine the chosen challenge',
      description: 'Is the initial chosen challenge still the focus of your future vision? Or have you found another one that caught your interest? Here you can redefine the chosen challenge based on the information you learned in BCM.',
      answer: bookOne?.exercises.redefineChallengeAnswer.left.answer || '',
    },
    right: {
      title: 'Final Challenge description',
      description: 'Describe the final version of your chosen challenge in the text box below.',
      answer: bookOne?.exercises.redefineChallengeAnswer.right.answer || '',
    },
  });

    useEffect(() => {
    if (bookOne) {
      setAnswers((prev) => ({
        left: {
          ...prev.left,
          answer: bookOne.exercises.redefineChallengeAnswer.left.answer || '',
        },
        right: {
          ...prev.right,
          answer: bookOne.exercises.redefineChallengeAnswer.right.answer || '',
        },
      }));
    }
  }, [bookOne]);

  const handleAnswerChange = (side: 'left' | 'right') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [side]: {
        ...prevAnswers[side],
        answer: value,
      },
    }));

    if (bookOne) {
      bookOne.exercises.redefineChallengeAnswer[side].answer = value;

      onUpdateBookOne(bookOne);
    
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
        <h2>{answers.left.title}</h2>
        <p><i>{infotext}</i></p>
        <p>{answers.left.description}</p>
        <ExpandingTextArea
          id="redefine-challenge-text-area-left"
          instructionText=""
          value={answers.left.answer}
          onChange={handleAnswerChange('left')}
          readonly={readonly}
        />
      </div>
      <div style={separatorStyle} />
      <div style={panelStyle}>
        <h2>{answers.right.title}</h2>
        <p>{answers.right.description}</p>
        <ExpandingTextArea
          id="redefine-challenge-text-area-right"
          instructionText=""
          value={answers.right.answer}
          onChange={handleAnswerChange('right')}
          rows={20}
          readonly={readonly}
        />
      </div>
    </div>
  );
};

export default RedefineChallengeExercise;
