import React from 'react';
import { containerStyle } from './styles';

const Chapter3Banner: React.FC = () => {


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
      <h1 style={headingStyle}>Chapter 3</h1>
      <p> What value you offer and why customers should choose you? </p>
      </div>
    </div>
  );
};

export default Chapter3Banner;
