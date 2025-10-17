import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonsProps {
  pages: { path: string; label: string; color: string }[];
  currentPage: number;
}

const navigationButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  width: '60px', // Adjust the width as needed
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '60px',
  cursor: 'pointer',
  zIndex: '1000',
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ pages, currentPage }) => {
  const navigate = useNavigate();



  // Memoize the navigation functions to prevent unnecessary re-renders
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) {
      navigate(pages[currentPage - 1].path);
    }
  }, [currentPage, navigate, pages]);

  const goToNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      navigate(pages[currentPage + 1].path);
    }
  }, [currentPage, navigate, pages]);

  // Add event listeners for keydown events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousPage();

      } else if (event.key === 'ArrowRight') {
        goToNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextPage, goToPreviousPage]);

  if (currentPage < 0) {
    return null;
  }

  return (
    <div>
      {currentPage > 0 && (
        <div
          onClick={goToPreviousPage}
          style={{
            ...navigationButtonStyle,
            left: '0', // Position the button at the very left edge
            color: pages[currentPage]?.color || 'black',
          }}
        >
          {'<'}
        </div>
      )}
      {currentPage < pages.length - 1 && (
        <div
          onClick={goToNextPage}
          style={{
            ...navigationButtonStyle,
            right: '0', // Position the button at the very right edge
            color: pages[currentPage]?.color || 'black',
          }}
        >
          {'>'}
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
