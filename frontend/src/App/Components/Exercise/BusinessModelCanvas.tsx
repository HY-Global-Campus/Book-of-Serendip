import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './exercises.css';

const BusinessModelCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadCanvas = () => {
    const element = canvasRef.current;
    if (!element) return;

    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.download = 'business-model-canvas.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div>
      <div ref={canvasRef} className="canvas">
        <div className="section key-partners"><div className="header">Key Partners</div></div>
        <div className="section key-activities"><div className="header">Key Activities</div></div>
        <div className="section key-resources"><div className="header">Key Resources</div></div>
        <div className="section value-propositions"><div className="header">Value Propositions</div></div>
        <div className="section customer-relationships"><div className="header">Customer Relationships</div></div>
        <div className="section channels"><div className="header">Channels</div></div>
        <div className="section customer-segments"><div className="header">Customer Segments</div></div>

        <div className="bottom-row">
          <div className="section cost-structure"><div className="header">Cost Structure</div></div>
          <div className="section revenue-streams"><div className="header">Revenue Streams</div></div>
        </div>
      </div>

      <button onClick={downloadCanvas} style={{ marginTop: '20px' }}>
        Download as Image
      </button>
    </div>
  );
};

export default BusinessModelCanvas;
