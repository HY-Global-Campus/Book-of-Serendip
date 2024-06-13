
import React, { useState } from 'react';



interface InfoIconProps {
  infoText: string;
    color?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ infoText, color }) => {
    const bgcolor = color ? color : 'black';
  const [isOpen, setIsOpen] = useState(false);

    const toggleWindow = () => {
        setIsOpen(!isOpen);
    };

    const infoIconStyle: React.CSSProperties = {
        cursor: 'pointer',
        display: 'inline-block',
        width: '24px',
        height: '24px',
        backgroundColor: bgcolor,
        color: bgcolor == 'black' ? 'white' : 'black',
        borderRadius: '50%',
        fontSize: '16px',
        textAlign: 'center',
        lineHeight: '24px',
        position: 'absolute',
        right: '5%'
    };

    const floatingWindowStyle: React.CSSProperties = {
        position: 'fixed',
        top: '30%',
        left: '30%',
        width: '200px',
        padding: '50px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        zIndex: 1000,
        color: 'black',  
        whiteSpace: 'pre-line',
        minWidth: '500px',
    };

    const closeBtnStyle: React.CSSProperties = {
        position: 'absolute',
        top: '5px',
        right: '5px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={infoIconStyle} onClick={toggleWindow}>
        i
      </div>
      {isOpen && (
        <div style={floatingWindowStyle}>
          <button style={closeBtnStyle} onClick={toggleWindow}>×</button>
          <div>{infoText}</div>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
