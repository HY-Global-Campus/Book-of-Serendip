import React from 'react';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import star from '../../../assets/star.png'

const Prologue: React.FC = () => {
  return (
    <div style={containerStyle}>
      {/* Inline CSS for the custom star-in-circle bullet */}
      <style>{`
        .star-circle-list {
          list-style: none;
        }
        .star-circle-list li {
          position: relative;
          padding-left: 28px;
          margin-bottom: 15px;
          margin-top: 15px;
        }
        .star-circle-list li::before {
          content: "";
          background: url(${star}) no-repeat center;
          background-size: 70%; /* Adjust this value to scale the image as desired */
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border: 0.5px solid #000;  /* The circle border */
          border-radius: 50%;      /* Makes the element a circle */
      }
      `}</style>

      <div style={panelStyle}>
        <h2>Structure of the assignment</h2>
        <p>
          The Book includes four chapters, which for the best learning experience, you need to fill them in order:
        </p>
        <ul className="star-circle-list">
          <h3> chapter 1 </h3>
          <li>Choose and define a challenge</li>
          <h3> chapter 2 </h3>
          <li>Map of connections</li>
          <li>Identify leverage points</li>
          <li>Redefine the chosen challenge</li>
          <h3> chapter 3 </h3>
          <li>Values</li>
          <h3> chapter 4 </h3>
          <li>Future vision and steps to achieve it</li>
          <li>My future vision pitch</li>
        </ul>
      </div>

      <div style={separatorStyle} />

      <div style={panelStyle}>
        <h2>Peer review criteria</h2>
        <p>
          This assignment will be peer reviewed, so to complete it, you need to submit your Book on the course platform, once it is ready. You will receive two anonymous reviews for it. You will also need to provide three reviews for other peers’ Books anonymously. The selection of the Books that you are requested to peer review is done automatically. The peer review will be done using a Likert scale of 1 (Strongly disagree) to 5 (Strongly agree).
        </p>
        <p>
          The peer review criteria for the Book of Serendip are:
        </p>
        <ul className="star-circle-list">
          <li>The challenge is clearly described</li>
          <li>The map shows connections between information from at least three levels of the episode</li>
          <li>At least two leverage points were identified</li>
          <li>The future vision is clearly based on the values of the student</li>
          <li>The student explained a credible desirable future and steps leading to it (not a dream)</li>
          <li>The future vision pitch was coherent</li>
          <li>The student reflected on their learning journey in this episode</li>
        </ul>
      </div>
    </div>
  );
};

export default Prologue;
