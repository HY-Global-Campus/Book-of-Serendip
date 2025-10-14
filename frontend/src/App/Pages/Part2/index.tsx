import React from 'react';
import Header from '../../Components/Header';
import { courseCopy } from '../../../content/copy';
import '../pages.css';
import '../../Components/Exercise/exercises.css';

const Part2Page: React.FC = () => {
  return (
    <>
      <Header />
      <div className="exercise-container">
        <div className="exercise-content">
          <div className="exercise-single-column">
            <div className="exercise-panel">
              <h2 className="exercise-title" style={{ fontSize: '48px', marginBottom: '20px' }}>
                {courseCopy.part2.title}
              </h2>
              <p className="exercise-description" style={{ fontSize: '20px' }}>
                {courseCopy.part2.instruction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Part2Page;
