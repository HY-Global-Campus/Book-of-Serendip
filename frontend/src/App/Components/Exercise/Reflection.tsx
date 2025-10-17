import React, { useState, useEffect } from 'react';
import ExpandingTextArea from './ExpandingTextarea';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import { useExerciseContext } from './ExerciseContext';


const Reflection: React.FC = () => {
  const { bookOne, onUpdateBookOne, loading, error, readonly } = useExerciseContext();
  const [answers, setAnswers] = useState<string>('');
  useEffect(() => {
    if (bookOne) {
      setAnswers(bookOne.reflection || '');
    }
  }, [bookOne]);


  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setAnswers(value);

    if (bookOne) {
      bookOne.reflection = value;
        onUpdateBookOne(bookOne); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const userId = sessionStorage.getItem('id');
    const link = `${window.location.origin}/view/${userId}`;


  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
        <h2>Reflection</h2>
        <p>Reflect and answer these questions: What did you learn during this assignment? How can you use your newly acquired knowledge and skills in the sustainability action in your everyday life?</p>
        <ExpandingTextArea
          id="choose-challenge-text-area-1"
          instructionText=""
          value={answers}
          onChange={handleAnswerChange}
          readonly={readonly}
          rows={15}
        />
      </div>
      <div style={separatorStyle} />
      <div style={panelStyle}>
        <div style={{ textAlign: 'center', fontSize: '6rem', fontWeight: 'bold', marginTop: '50%' }}>The End</div>
        <p> Share your Book of Serendip with this link: <br/> <a href={link}> {link} </a> </p>
      </div>
    </div>
  );
};

export default Reflection;
