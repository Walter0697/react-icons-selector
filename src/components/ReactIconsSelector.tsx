import React, { useState } from 'react';
import { IconComponent } from './getIconComponent';
import { IconSelectorDialog } from './IconSelectorDialog';

export interface ReactIconsSelectorProps {
  value?: string; // Icon name
  onChange?: (value: string) => void; // Function to change the icon name
  text?: string;
  onClick?: () => void;
}

const ICON_OPTIONS = [
  'FaBeer',
  'FaCoffee',
  'FaApple',
  'MdAlarm',
  'MdBuild',
  'AiFillAndroid',
  'AiFillApple',
  'IoIosAirplane',
  'IoIosAlarm',
  'IoIosBasket',
];

export const ReactIconsSelector: React.FC<ReactIconsSelectorProps> = ({ value, onChange, text, onClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    if (onClick) onClick();
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // Constants for consistent sizing with the dialog
  const ICON_SIZE = 24;
  const BUTTON_SIZE = 80;

  return (
    <>
      <button
        type="button"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem',
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          borderRadius: '0.5rem',
          border: '1px solid #3b82f6',
          backgroundColor: 'white',
          transition: 'all 150ms',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {value ? (
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: ICON_SIZE,
              width: ICON_SIZE,
              marginBottom: '0.25rem'
            }}>
              <IconComponent iconName={value} size={ICON_SIZE} />
            </div>
            <span style={{ 
              fontSize: '0.75rem',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {value}
            </span>
          </span>
        ) : (
          text || 'Select an Icon'
        )}
      </button>
      
      <IconSelectorDialog
        value={value}
        onChange={onChange}
        iconOptions={ICON_OPTIONS}
        isOpen={isDialogOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default ReactIconsSelector; 