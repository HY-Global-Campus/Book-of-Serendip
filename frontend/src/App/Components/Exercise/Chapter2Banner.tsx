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
        <p> Fill in the following sections while you're playing in levels 2-7 </p>
      </div>
    </div>
  );
};

export default Chapter2Banner;
