import React from 'react';
import { containerStyle } from './styles';

const desc = `
The Business Model Canvas (BMC) is a strategic management and entrepreneurial tool used to visualize and develop business models. 

BMC is a one-page document that breaks down the core elements of a business into nine building blocks: customer segments, value propositions, channels, customer relationships, revenue streams, key activities, key resources, key partnerships and cost structure. 
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
      <h1 style={headingStyle}>What is Business Model Canvas?</h1>
      <p> {desc} </p>
      </div>
    </div>
  );
};

export default Welcome;
