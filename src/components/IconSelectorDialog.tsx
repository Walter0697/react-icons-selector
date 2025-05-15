import React, { useRef, useState, useEffect } from 'react';
import { IconComponent } from './getIconComponent';
import { getAllIconNames, searchIcons, iconPacks } from './getAllIcons';
import { DEFAULT_ICON_OPTIONS } from './defaultIconOptions';

export interface IconSelectorDialogProps {
  value?: string;
  onChange?: (value: string) => void;
  iconOptions?: string[];
  isOpen: boolean;
  onClose: () => void;
  maxResults?: number; // Maximum number of results to show when searching
  defaultIconOptions?: string[]; // Default icons to show when no search is active
}

export const IconSelectorDialog: React.FC<IconSelectorDialogProps> = ({
  value,
  onChange,
  iconOptions,
  isOpen,
  onClose,
  maxResults = 12, // Default to 12 results
  defaultIconOptions = DEFAULT_ICON_OPTIONS
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPack, setSelectedPack] = useState<string | undefined>(undefined);
  
  // Constants for consistent sizing
  const ICON_SIZE = 24; // Size in pixels for the icon
  const BUTTON_SIZE = 80; // Size in pixels for the button
  
  // Get icons to display based on current state
  const getIconsToDisplay = () => {
    // If search term is provided, filter icons by search
    if (searchTerm.trim() !== '') {
      return searchIcons(searchTerm, maxResults, selectedPack);
    }
    
    // If custom icon options are provided, use those
    if (iconOptions) {
      return iconOptions;
    }
    
    // If a specific pack is selected, show top N icons from that pack
    if (selectedPack) {
      return searchIcons('', maxResults, selectedPack);
    }
    
    // Otherwise, show default icon options (when "All" is selected)
    return defaultIconOptions;
  };
  
  // Initialize and filter icons
  useEffect(() => {
    const updateIcons = async () => {
      setIsLoading(true);
      const results = getIconsToDisplay();
      setFilteredIcons(results);
      setIsLoading(false);
    };
    
    updateIcons();
  }, [searchTerm, selectedPack, iconOptions, defaultIconOptions, maxResults]);
  
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  // Reset search when dialog opens or closes
  useEffect(() => {
    setSearchTerm('');
    setSelectedPack(undefined);
    if (isOpen) {
      setIsLoading(true);
      setFilteredIcons(defaultIconOptions);
      setIsLoading(false);
    }
  }, [isOpen, defaultIconOptions]);

  const handleIconPick = (iconName: string) => {
    if (onChange) onChange(iconName);
    onClose();
  };
  
  // Handle library selection
  const handleLibrarySelect = (packName: string | undefined) => {
    setSelectedPack(packName);
    setSearchTerm(''); // Clear search when changing libraries
  };

  return (
    <dialog 
      ref={dialogRef} 
      style={{
        padding: '1.5rem',
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '2px solid #4f46e5',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '90vw',
        maxHeight: '85vh',
        overflow: 'auto'
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <style>
        {`
          dialog::backdrop {
            background-color: rgba(0, 0, 0, 0.6);
          }
        `}
      </style>
      <div style={{ minWidth: '320px', maxWidth: '600px' }}>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center' 
          }}>
            Select an Icon
          </h2>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'all 150ms',
              background: 'none',
              border: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#374151';
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ✕
          </button>
        </div>
        
        {/* Search input */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 150ms ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4f46e5';
              e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
            {filteredIcons.length > 0 
              ? `Showing ${filteredIcons.length} icons ${searchTerm ? `matching "${searchTerm}"` : ''}${selectedPack ? ` from ${selectedPack}` : ''}`
              : 'No icons found'}
          </div>
        </div>
        
        {/* Icons grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem', 
          marginTop: '1rem',
          height: '320px',
          overflowY: 'auto',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 0'
        }}>
          {isLoading ? (
            <div style={{ 
              gridColumn: 'span 4', 
              textAlign: 'center', 
              padding: '2rem',
              color: '#6b7280'
            }}>
              Loading icons...
            </div>
          ) : filteredIcons.length > 0 ? (
            filteredIcons.map((icon) => (
              <button
                key={icon}
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
                  border: value === icon ? '1px solid #3b82f6' : '1px solid #e5e7eb',
                  backgroundColor: value === icon ? '#eff6ff' : 'white',
                  transition: 'all 150ms',
                  cursor: 'pointer'
                }}
                onClick={() => handleIconPick(icon)}
                onMouseOver={(e) => {
                  if (value !== icon) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (value !== icon) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: ICON_SIZE,
                  width: ICON_SIZE,
                  marginBottom: '0.5rem'
                }}>
                  <IconComponent iconName={icon} size={ICON_SIZE} />
                </div>
                <span style={{ 
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {icon}
                </span>
              </button>
            ))
          ) : (
            <div style={{ 
              gridColumn: 'span 4', 
              textAlign: 'center', 
              padding: '2rem',
              color: '#6b7280'
            }}>
              No icons found matching "{searchTerm}"
            </div>
          )}
        </div>
        
        {/* Library selection */}
        <div style={{ marginTop: '1rem' }}>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Filter by Library
            </div>
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              maxHeight: '120px',
              overflowY: 'auto',
              padding: '0.5rem 0'
            }}>
              <button
                onClick={() => handleLibrarySelect(undefined)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: selectedPack === undefined ? 'bold' : 'normal',
                  backgroundColor: selectedPack === undefined ? '#4f46e5' : '#f3f4f6',
                  color: selectedPack === undefined ? 'white' : '#374151',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                All
              </button>
              {Object.keys(iconPacks).map(packName => (
                <button
                  key={packName}
                  onClick={() => handleLibrarySelect(packName)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: selectedPack === packName ? 'bold' : 'normal',
                    backgroundColor: selectedPack === packName ? '#4f46e5' : '#f3f4f6',
                    color: selectedPack === packName ? 'white' : '#374151',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {packName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
  );
}; 