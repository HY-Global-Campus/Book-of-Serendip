import React from 'react';
import Header from '../../Components/Header';
import { courseCopy } from '../../../content/copy';
import '../pages.css';

const AssignmentPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="exercise-container">
        <div className="exercise-content">
          <div className="exercise-two-column">
            <div className="exercise-column">
              <h2 className="exercise-title">{courseCopy.assignment.leftColumn.title}</h2>
              {courseCopy.assignment.leftColumn.content.map((paragraph, index) => (
                <p key={index} className="exercise-description">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="exercise-column">
              <h2 className="exercise-title">{courseCopy.assignment.rightColumn.title}</h2>
              {courseCopy.assignment.rightColumn.content.map((paragraph, index) => (
                <p key={index} className="exercise-description">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentPage;
