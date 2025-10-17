import React from 'react';
import './exercises.css'

const Prologue: React.FC = () => {
  return (
    <div className="prologue-container">
      <div className="prologue-panel">
        <h2>Structure of the course</h2>
        <p>
          This course contains four chapters. For the best learning experience, it is recommended that you complete them in the following order:
        </p>
        <ul className="star-circle-list">
          <h3>Chapter 1</h3>
          <li>Feasibility</li>
          <li>Key Partners</li>
          <li>Key Activities</li>
          <li>Key Resources</li>
          <h3>Chapter 2</h3>
          <li>Desirability</li>
          <li>Customer Relationships</li>
          <li>Customer Segments</li>
          <li>Channels</li>
          <h3>Chapter 3</h3>
          <li>Value Propositions</li>
          <h3>Chapter 4</h3>
          <li>Viability</li>
          <li>Cost Structure</li>
          <li>Revenue Streams</li>
        </ul>
      </div>

      <div className="prologue-separator" />

      <div className="prologue-panel">
        <h2>Peer review criteria</h2>
        <p>
          The course assignments will be peer reviewed. To complete it, you need to submit your assignment on the course platform, once it is ready. You will receive two anonymous reviews for it. You will also need to provide three reviews for other peers’ assignment anonymously.
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
          If you have any questions, contact <a href="mailto:mooc@cs.helsinki.fi">mooc@cs.helsinki.fi</a>. We will respond within three days.
        </p>
      </div>
    </div>
  );
};

export default Prologue;