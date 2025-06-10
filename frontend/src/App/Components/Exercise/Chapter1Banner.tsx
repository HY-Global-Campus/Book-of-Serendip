import React from 'react';
import { containerStyle } from './styles';

const Chapter1Banner: React.FC = () => {


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
      <h1 style={headingStyle}>Chapter 1</h1>
      <p>Feasibility: the operational and strategic basis of BCM</p>
      </div>
    </div>
  );
};

export default Chapter1Banner;
