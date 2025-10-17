import React from 'react';
import { containerStyle } from './styles';

const desc = `
This is the Book of Serendip. It is your main task in this programme. Fill it in as you proceed in your journey and you will complete the first stage of your training.

The main goal of this exercise is to create a desirable future vision based on a specific Boreal forest challenge.
`;



const Welcome: React.FC = () => {


  const pageStyle: React.CSSProperties = {
    marginLeft: '3%',
    marginRight: '3%',
    fontSize: '46px',
  }
  const headingStyle: React.CSSProperties = {
    fontSize: '64px'
  }

  return (
    <div style={containerStyle}>
      <div style={pageStyle}>
      <h1 style={headingStyle}>What is this assignment?</h1>
      <p> {desc} </p>
      </div>
    </div>
  );
};

export default Welcome;
