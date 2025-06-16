import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/components.css';

interface NavigationButtonsProps {
  pages: { path: string; label: string; color: string }[];
  currentPage: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ pages, currentPage }) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goToPreviousPage();
      else if (event.key === 'ArrowRight') goToNextPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPreviousPage]);

  if (currentPage < 0) return null;

  return (
    <>
      {/* Mobile buttons */}
      <div className="nav-buttons-mobile">
        {currentPage > 0 && (
          <button
            className="nav-btn-mobile"
            style={{ color: pages[currentPage]?.color || 'black' }}
            onClick={goToPreviousPage}
          >
            {'<'}
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button
            className="nav-btn-mobile"
            style={{ color: pages[currentPage]?.color || 'black' }}
            onClick={goToNextPage}
          >
            {'>'}
          </button>
        )}
      </div>

      {/* Desktop arrows */}
      {currentPage > 0 && (
        <div
          className="nav-arrow left"
          style={{ color: pages[currentPage]?.color || 'black' }}
          onClick={goToPreviousPage}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && goToPreviousPage()}
        >
          {'<'}
        </div>
      )}
      {currentPage < pages.length - 1 && (
        <div
          className="nav-arrow right"
          style={{ color: pages[currentPage]?.color || 'black' }}
          onClick={goToNextPage}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && goToNextPage()}
        >
          {'>'}
        </div>
      )}
    </>
  );
};

export default NavigationButtons;
