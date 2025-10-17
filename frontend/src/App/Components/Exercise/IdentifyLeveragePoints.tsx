import React, { useState, useEffect } from 'react';
import ExpandingTextArea from './ExpandingTextarea';
import './exercises.css'
import { IdentifyLeveragePoints } from '../../../types/exercises';
import { useExerciseContext } from './ExerciseContext';


const infotext = `After choosing your leverage points, look again over your map, now focusing on the different leverage points you have identified and think how difficult or easy they are to change, as you have evaluated them. Think about the different kinds of change that can be used to influence a system (technology, investment, infrastructure,  policies, regulations, awareness, attitudes, values, etc.). Think also about feedback cycles and how their dynamics can be influenced. Choose one  aspect you can and want to change in order to influence the system.`;

const IdentifyLeveragePointsExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, loading, error, readonly } = useExerciseContext();

  const [answers, setAnswers] = useState<IdentifyLeveragePoints>({
    left: {
      title: 'Identify the leverage points',
      description: `Leverage points are places within a complex system where a small shift in one thing can produce big changes in everything.

Look at your Map of Connections and estimate how easy/hard it is to affect different factors of the system. In the boxes below, mark factors based on the level of change.`,
      question1: { title: 'Easy to change', answer: bookOne?.exercises.identifyLeveragePointsAnswer.left.question1.answer || '' },
      question2: { title: 'Require something in order to change', answer: bookOne?.exercises.identifyLeveragePointsAnswer.left.question2.answer || '' },
      question3: { title: 'Difficult to change', answer: bookOne?.exercises.identifyLeveragePointsAnswer.left.question3.answer || '' },
    },
    right: {
      title: 'Chosen leverage point',
      description: 'Choose one leverage point! The chosen leverage point should be one that you have some control on how you affect it.',
      answer: bookOne?.exercises.identifyLeveragePointsAnswer.right.answer || '',
    },
  });
  useEffect(() => {
    if (bookOne) {
      setAnswers((prev) => ({
        left: {
          ...prev.left,
          question1: { ...prev.left.question1, answer: bookOne.exercises.identifyLeveragePointsAnswer.left.question1.answer || '' },
          question2: { ...prev.left.question2, answer: bookOne.exercises.identifyLeveragePointsAnswer.left.question2.answer || '' },
          question3: { ...prev.left.question3, answer: bookOne.exercises.identifyLeveragePointsAnswer.left.question3.answer || '' },
        },
        right: {
          ...prev.right,
          answer: bookOne.exercises.identifyLeveragePointsAnswer.right.answer || '',
        },
      }));
    }
  }, [bookOne]);

  const handleAnswerChange = (side: 'left' | 'right', question?: 'question1' | 'question2' | 'question3') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [side]: {
        ...prevAnswers[side],
        ...(question ? { [question]: { answer: value } } : { answer: value }),
      },
    }));

    if (bookOne) {
      if (side === 'left') {
        if (question) {
          bookOne.exercises.identifyLeveragePointsAnswer.left[question].answer = value;
        }
      } else {
        bookOne.exercises.identifyLeveragePointsAnswer.right.answer = value;
      }

      onUpdateBookOne(bookOne);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
  <div className="exercise-container">
    <div className="exercise-panel">
      <h2>{answers.left.title}</h2>
      <p>{answers.left.description}</p>
      <h3>{answers.left.question1.title}</h3>
      <ExpandingTextArea
        id="identify-leverage-points-question1"
        instructionText=""
        value={answers.left.question1.answer}
        onChange={handleAnswerChange('left', 'question1')}
        rows={2}
        readonly={readonly}
      />
      <h3>{answers.left.question2.title}</h3>
      <ExpandingTextArea
        id="identify-leverage-points-question2"
        instructionText=""
        value={answers.left.question2.answer}
        onChange={handleAnswerChange('left', 'question2')}
        rows={2}
        readonly={readonly}
      />
      <h3>{answers.left.question3.title}</h3>
      <ExpandingTextArea
        id="identify-leverage-points-question3"
        instructionText=""
        value={answers.left.question3.answer}
        onChange={handleAnswerChange('left', 'question3')}
        rows={2}
        readonly={readonly}
      />
    </div>

    <div className="exercise-separator" />

    <div className="exercise-panel">
      <h2>{answers.right.title}</h2>
      <p><i>{infotext}</i></p>
      <p>{answers.right.description}</p>
      <ExpandingTextArea
        id="identify-leverage-points-right"
        instructionText=""
        value={answers.right.answer}
        onChange={handleAnswerChange('right')}
        rows={15}
        readonly={readonly}
      />
    </div>
  </div>
  );
};

export default IdentifyLeveragePointsExercise;

