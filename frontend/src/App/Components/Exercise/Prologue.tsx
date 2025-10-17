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
        <h2>Structure of the course</h2>
        <p>
          This course contains four chapters. For the best learning experience, it is recommended that you complete them in the following order:
        </p>
        <ul className="star-circle-list">
          <h3> Chapter 1 </h3>
          <li>Feasibility</li>
          <li>Key Partners</li>
          <li>Key Activities</li>
          <li>Key Resources</li>
          <h3> Chapter 2 </h3>
          <li>Desirability</li>
          <li>Customer Relationships</li>
          <li>Customer Segments</li>
          <li>Channels</li>
          <h3> Chapter 3 </h3>
          <li>Value Propostions</li>
          <h3> Chapter 4 </h3>
          <li>Viability</li>
          <li>Cost Structure</li>
          <li>Revenue Streams</li>
        </ul>
      </div>

      <div style={separatorStyle} />

      <div style={panelStyle}>
        <h2>Peer review criteria</h2>
        <p>
          The course assignments will be peer reviewed. To complete it, you need to submit your assignment on the course platform, once it is ready. You will receive two anonymous reviews for it. You will also need to provide three reviews for other peers’ assignment anonymously. The selection of the assignments that you are requested to peer review is done automatically. The peer review will be done using a Likert scale of 1 (Poor) to 5 (Excellent).
        </p>
        <p>
          The peer review criteria for the assignment are:
        </p>
        <ul className="star-circle-list">
          <li>The challenge is clearly described</li>
          <li>The context shows connections between information from at least three levels of the episode</li>
          <li>At least two leverage points were identified</li>
          <li>The future vision is clearly based on the values of the student</li>
          <li>The student explained a credible desirable future and steps leading to it (not a dream)</li>
          <li>The future vision pitch was coherent</li>
          <li>The student reflected on their learning journey in this episode</li>
        </ul>
        <p>
          If you have any questions about the course assignments and their grading criteria, or anything else related to the course content, please contact mooc@cs.helsinki.fi. 
        </p>
        <p>
          We will respond to questions as soon as possible within three days.
        </p>
      </div>
    </div>
  );
};

export default Prologue;
