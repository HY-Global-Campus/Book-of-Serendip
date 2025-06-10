import React, { useState, useEffect } from 'react';
import ExpandingTextArea from './ExpandingTextarea';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import { Values } from '../../../types/exercises';
import { useExerciseContext } from './ExerciseContext';
import valueProposition from '../../../assets/value_proposition.jpg'


const infotext = `Choose the values that guide your BMC actions. What is important for you?`;

const ValuesExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, loading, error, readonly } = useExerciseContext();

  const [answers, setAnswers] = useState<Values>({
    left: {
      title: 'Values',
      description: 'Our actions are guided by our deepest values. What are your top three values? Write them below and let them guide your vision for the future.',
      question1: { title: 'Value 1.', answer: bookOne?.exercises.valuesAnswer.left.question1.answer || '' },
      question2: { title: 'Value 2.', answer: bookOne?.exercises.valuesAnswer.left.question2.answer || '' },
      question3: { title: 'Value 3.', answer: bookOne?.exercises.valuesAnswer.left.question3.answer || '' },
    },
    right: null,
  });

  useEffect(() => {
    if (bookOne) {
      setAnswers((prev) => ({
        left: {
          ...prev.left,
          question1: { title: 'Value 1.', answer: bookOne.exercises.valuesAnswer.left.question1.answer || '' },
          question2: { title: 'Value 2.', answer: bookOne.exercises.valuesAnswer.left.question2.answer || '' },
          question3: { title: 'Value 3.', answer: bookOne.exercises.valuesAnswer.left.question3.answer || '' },
        },
        right: null,
      }));
    }
  }, [bookOne]);

  const handleAnswerChange = (question: 'question1' | 'question2' | 'question3') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      left: {
        ...prevAnswers.left,
        [question]: { answer: value },
      },
    }));

    if (bookOne) {
      bookOne.exercises.valuesAnswer.left[question].answer = value;

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
        <h3>{answers.left.question1.title}</h3>
        <ExpandingTextArea
          id="values-question1"
          instructionText=""
          value={answers.left.question1.answer}
          onChange={handleAnswerChange('question1')}
          rows={2}
          readonly={readonly}
        />
        <h3>{answers.left.question2.title}</h3>
        <ExpandingTextArea
          id="values-question2"
          instructionText=""
          value={answers.left.question2.answer}
          onChange={handleAnswerChange('question2')}
          rows={2}
          readonly={readonly}
        />
        <h3>{answers.left.question3.title}</h3>
        <ExpandingTextArea
          id="values-question3"
          instructionText=""
          value={answers.left.question3.answer}
          onChange={handleAnswerChange('question3')}
          rows={2}
          readonly={readonly}
        />
      </div>
      <div style={separatorStyle} />
      <div style={panelStyle}>
        <h2>"A successful value proposition ensures that the product or service is positioned around the customer's values ​​and needs."</h2>
        <img src={valueProposition} alt="Value Proposition" style={{ width: '45%', marginTop: '100px' }} />
      </div>
    </div>
  );
};

export default ValuesExercise;
