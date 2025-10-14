//import { CSSProperties } from "react";
import '../pages.css'
import placeholderImage from '../../../assets/endpage-placeholder.jpg';
import Header from '../../Components/Header'
import { courseCopy } from '../../../content/copy';
import { useNavigate } from "react-router";

//   const navigationButtonStyle: CSSProperties = {
//    cursor: 'pointer',
//    padding: '10px 20px',
//    fontSize: '36px',
//    position: 'fixed',
//    top: '50%',
//  };
//const placeholderWrapperStyle: CSSProperties = {
//  position: 'relative',
//  width: '100%', // Ensure wrapper fills container for full responsiveness
//  height: '100vh' // Adjust based on your design needs
//};

//const placeholderStyle: CSSProperties = {
//  width: '100%',
//  height: '100%',
//};


//const overlayTextStyle: CSSProperties = {
//  position: 'absolute',
//  top: '50%', // Center vertically
//  left: '50%', // Center horizontally
//  transform: 'translate(-50%, -50%)', // Ensure centered regardless of text length
//  color: 'white', // Text color
//  fontSize: '2rem', // Large text size
//  fontWeight: 'bold',
//  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', // Text shadow for better readability
//  backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
//  padding: '10px 20px', // Padding around the text
//  borderRadius: '10px', // Rounded corners for the background
//  textAlign: 'center', // Center the text inside the box
//  width: 'auto', // Auto width based on content
//  maxWidth: '80%', // Max width to avoid edge cases
//};

const EndPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="exercise-container">
        <div className="exercise-content">
          <div className="exercise-single-column">
            <div className="exercise-panel">
              <h2 className="exercise-title" style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000'
              }}>
                Share your course canvas
              </h2>
              <p className="exercise-description" style={{ 
                fontSize: '20px',
                textAlign: 'center',
                color: '#000'
              }}>
                Link here... or canvas PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndPage;

