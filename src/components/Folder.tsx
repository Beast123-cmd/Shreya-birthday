import React, { useState } from 'react';
import './Folder.css';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  const [open, setOpen] = useState(false);
  const [paperVisible, setPaperVisible] = useState(false);

  const folderBackColor = darkenColor(color, 0.08);
  const paperColor = '#ffffff';

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperVisible(false);
    }
  };

  const handlePaperClick = () => {
    setPaperVisible(true);
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-color': paperColor
  } as React.CSSProperties;

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={{ ...scaleStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={className}>
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>
        <div className="folder__back">
          {open && (
            <div
              className="paper"
              onClick={handlePaperClick}
              style={{ display: paperVisible ? 'none' : 'block' }}
            ></div>
          )}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
      {paperVisible && (
        <div className="letter-popup">
          <div className="letter-content">
            {/* Add your letter content here */}
            <p>Your personalized letter content goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;