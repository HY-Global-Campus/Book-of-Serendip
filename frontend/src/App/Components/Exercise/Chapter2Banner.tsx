import React from 'react';
import { containerStyle } from './styles';

const Chapter2Banner: React.FC = () => {


  const pageStyle: React.CSSProperties = {
    fontSize: '46px',
    textAlign: 'center',
    width: '100%',
    marginTop: '10%',
  }
  const headingStyle: React.CSSProperties = {
    fontSize: '64px'
  }

  return (
    <div style={containerStyle}>
      <div style={pageStyle}>
        <h1 style={headingStyle}>Chapter 2</h1>
        <p> Desirability: how to reach, serve and retain your audience? </p>
      </div>
    </div>
  );
};

export default Chapter2Banner;
