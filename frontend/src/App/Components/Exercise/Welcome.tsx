import React from 'react';
import './exercises.css'

const desc = `
The Business Model Canvas (BMC) is a strategic management and entrepreneurial tool used to visualize and develop business models. 

BMC is a one-page document that breaks down the core elements of a business into nine building blocks: customer segments, value propositions, channels, customer relationships, revenue streams, key activities, key resources, key partnerships and cost structure. 
`;

const Welcome: React.FC = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-heading">What is Business Model Canvas?</h1>
        <p className="welcome-text">{desc}</p>
      </div>
    </div>
  );
};

export default Welcome;
