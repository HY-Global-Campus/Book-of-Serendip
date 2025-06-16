import React, { useState } from 'react';

interface InfoIconProps {
  infoText: string;
  color?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ infoText, color }) => {
  const bgcolor = color || 'black';
  const [isOpen, setIsOpen] = useState(false);

  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };

  const infoIconStyle: React.CSSProperties = {
    cursor: 'pointer',
    display: 'inline-block',
    width: '24px',
    height: '24px',
    backgroundColor: 'transparent',
    color: bgcolor,
    borderRadius: '50%',
    border: `2px solid ${bgcolor}`,
    fontSize: '16px',
    textAlign: 'center',
    lineHeight: '24px',
    position: 'absolute',
    right: '5%',
  };

  const floatingWindowStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20%',
    left: '5%',
    right: '5%',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    zIndex: 1000,
    color: 'black',
    whiteSpace: 'pre-line',
    fontSize: '16px',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={infoIconStyle} onClick={toggleWindow}>
        i
      </div>
      {isOpen && (
        <div style={floatingWindowStyle}>
          <button style={closeBtnStyle} onClick={toggleWindow}>
            ×
          </button>
          <div>{infoText}</div>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
