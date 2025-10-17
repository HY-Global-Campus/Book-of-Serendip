import React, { useState, useEffect } from 'react';
import ExpandingTextArea from './ExpandingTextarea';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import { ChooseChallenge } from '../../../types/exercises';
import { useExerciseContext } from './ExerciseContext';


const chosenChallengeInfoText = `Find one problem related to climate change that you find interesting. Use the OWL box in the beginning of this training programme to get familiar with the different challenges. Remember there are many aspects to climate change, not only  meteorological but also ecological, social, cultural, economic, political  and others. Choose a problem that calls to you, something you want to explore more.
`;

const challengeDescriptionInfoText = `Write a definition for the problem you have chosen. What exactly does it mean? Why is it a problem? What are the causes and  consequences it implies?`;

const ChooseChallengeExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, loading, error, readonly } = useExerciseContext();
  const [answers, setAnswers] = useState<ChooseChallenge>({
    left: {
      title: 'Chosen Challenge',
      description: 'Choose a challenge of the boreal forest caused by climate change',
      answer: bookOne?.exercises.chooseChallengeAnswer.left.answer || '',
    },
    right: {
      title: 'Challenge description',
      description: 'Describe your chosen challenge',
      answer: bookOne?.exercises.chooseChallengeAnswer.right.answer || '',
    },
  });
  useEffect(() => {
    if (bookOne) {
      setAnswers((prev) => ({
        left: {
          ...prev.left,
          answer: bookOne.exercises.chooseChallengeAnswer.left.answer || '',
        },
        right: {
          ...prev.right,
          answer: bookOne.exercises.chooseChallengeAnswer.right.answer || '',
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
      bookOne.exercises.chooseChallengeAnswer[side].answer = value; 
        onUpdateBookOne(bookOne); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
       <h2>{answers.left.title}</h2>
        <p><i>{chosenChallengeInfoText}</i></p>
        <p>{answers.left.description}</p>
        <ExpandingTextArea
          id="choose-challenge-text-area-1"
          instructionText=""
          value={answers.left.answer}
          onChange={handleAnswerChange('left')}
          readonly={readonly}
        />
      </div>
      <div style={separatorStyle} />
      <div style={panelStyle}>
        <h2>{answers.right.title}</h2>
        <p><i>{challengeDescriptionInfoText}</i></p>
        <p>{answers.right.description}</p>
        <ExpandingTextArea
          id="choose-challenge-text-area-2"
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

export default ChooseChallengeExercise;
