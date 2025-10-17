
import React, { useState, useEffect } from 'react';
import ExpandingTextArea from './ExpandingTextarea';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import { FromFutureToPresent } from '../../../types/exercises';
import StyledTextArea from './StyledTextArea';
import { useExerciseContext } from './ExerciseContext';
import ReadMore from '../ReadMore';



const infotextQ1 = ``;

const infotextQ2 = ``;

const FromFutureToPresentExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, loading, error, readonly } = useExerciseContext();

  const [answers, setAnswers] = useState<FromFutureToPresent>({
    left: {
      title: 'From Future to Present',
      question: `
Thinking about the futures that could be for the problem you have chosen. What are the probable, possible and desirable futures for this specific aspect you want to change? Think about how futures are different when they are based on reactions or actions (discuss difference between mitigation and adaptation—and perhaps beyond those two, creation?). Think about the different stakeholders and interests that can also influence the system. Imagine the multiple perspectives they represent, their motivations and their desires. Now, choose one desirable future for your problem and the aspect you are working with, and describe it. It is the year 2050: What is the state of the problem?`,
      answer: bookOne?.exercises.fromFutureToPresentAnswer.left.answer || '',
    },
    right: {
      title: 'Timeline',
      description: `Imagine you are now in 2050 telling your success story. Describe your path from 2050 to present and do a narrative in the past tense, for example: “Back in the days in 2023,  I started by .....”. In your success story, describe: What caused the system to change? What did you do to impact the system? Did you need help? What obstacles did you encounter? How did you overcome them? What was your role in this process?

Make a timeline 2024-2050. Mark down all the significant steps and events that led to the solution. What was your first action in 2024?`,
      question1: { title: 'Step 1', answer: bookOne?.exercises.fromFutureToPresentAnswer.right.question1.answer || '' },
      question2: { title: 'Step 2', answer: bookOne?.exercises.fromFutureToPresentAnswer.right.question2.answer || '' },
      question3: { title: 'Step 3', answer: bookOne?.exercises.fromFutureToPresentAnswer.right.question3.answer || '' },
      question4: { title: 'Step 4', answer: bookOne?.exercises.fromFutureToPresentAnswer.right.question4.answer || '' },
      question5: { title: 'Step 5', answer: bookOne?.exercises.fromFutureToPresentAnswer.right.question5.answer || '' },
      question6: { title: 'Step 6', answer: bookOne?.exercises.fromFutureToPresentAnswer.right.question6.answer || '' },
    },
  });

  useEffect(() => {
    if (bookOne) {
      setAnswers((prev) => ({
        left: {
          ...prev.left,
          answer: bookOne.exercises.fromFutureToPresentAnswer.left.answer || '',
        },
        right: {
          ...prev.right,
          question1: { ...prev.right.question1, answer: bookOne.exercises.fromFutureToPresentAnswer.right.question1.answer || '' },
          question2: { ...prev.right.question2, answer: bookOne.exercises.fromFutureToPresentAnswer.right.question2.answer || '' },
          question3: { ...prev.right.question3, answer: bookOne.exercises.fromFutureToPresentAnswer.right.question3.answer || '' },
          question4: { ...prev.right.question4, answer: bookOne.exercises.fromFutureToPresentAnswer.right.question4.answer || '' },
          question5: { ...prev.right.question5, answer: bookOne.exercises.fromFutureToPresentAnswer.right.question5.answer || '' },
          question6: { ...prev.right.question6, answer: bookOne.exercises.fromFutureToPresentAnswer.right.question6.answer || '' },
        },
      }));
    }
  }, [bookOne]);



  const handleAnswerChange = (side: 'left' | 'right', question?: 'question1' | 'question2' | 'question3' | 'question4' | 'question5' | 'question6') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        bookOne.exercises.fromFutureToPresentAnswer.left.answer = value;
      } else {
        if (question !== undefined) {
          bookOne.exercises.fromFutureToPresentAnswer.right[question].answer = value;
        }
      }

      onUpdateBookOne(bookOne);
    }
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const numberStyle: React.CSSProperties = {
    marginLeft: '1rem',
    marginTop: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
        <h2>{answers.left.title}</h2>
        <ReadMore><i>{infotextQ1}</i></ReadMore>
        <p>{answers.left.question}</p>
        <ExpandingTextArea
          id="from-future-to-present-left"
          instructionText=""
          value={answers.left.answer}
          onChange={handleAnswerChange('left')}
          rows={16}
          readonly={readonly}
        />
      </div>
      <div style={separatorStyle} />
      <div style={panelStyle}>
        <h2>{answers.right.title}</h2>
        <ReadMore><i>{infotextQ2}</i></ReadMore>
        <p>{answers.right.description}</p>
        <div style={{ marginTop: '1.5rem' }}>
          <div style={rowStyle} >
            <div style={numberStyle}>
              2050
            </div>
            <StyledTextArea
              id="from-future-to-present-question1"
              value={answers.right.question1.answer}
              onChange={handleAnswerChange('right', 'question1')}
              readonly={readonly}
            />

          </div>
          <div style={rowStyle}>
            <div style={numberStyle}>
              2045
            </div>

            <StyledTextArea
              id="from-future-to-present-question2"
              value={answers.right.question2.answer}
              onChange={handleAnswerChange('right', 'question2')}
              readonly={readonly}
            />
          </div>
          <div style={rowStyle}>
            <div style={numberStyle}>
              2040
            </div>
            <StyledTextArea
              id="from-future-to-present-question3"
              value={answers.right.question3.answer}
              onChange={handleAnswerChange('right', 'question3')}
              readonly={readonly}
            />
          </div>
          <div style={rowStyle}>
            <div style={numberStyle}>
              2035
            </div>
            <StyledTextArea
              id="from-future-to-present-question4"
              value={answers.right.question4.answer}
              onChange={handleAnswerChange('right', 'question4')}
              readonly={readonly}
            />
          </div>
          <div style={rowStyle}>
            <div style={numberStyle}>
              2030
            </div>
            <StyledTextArea
              id="from-future-to-present-question5"
              value={answers.right.question5.answer}
              onChange={handleAnswerChange('right', 'question5')}
              readonly={readonly}
            />

          </div>
          <div style={rowStyle}>
            <div style={numberStyle}>
              2024
            </div>
            <StyledTextArea
              id="from-future-to-present-question6"
              value={answers.right.question6.answer}
              onChange={handleAnswerChange('right', 'question6')}
              readonly={readonly}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default FromFutureToPresentExercise;
