import React from 'react';
import { iconPacks } from './getAllIcons';

export function getIconComponent(iconName: string): React.ReactNode | null {
  if (!iconName) return null;
  
  // Try to determine the prefix from the icon name
  for (const [prefix, pack] of Object.entries(iconPacks)) {
    if (pack[iconName]) {
      const Icon = pack[iconName] as React.ComponentType;
      return <Icon />;
    }
  }
  
  return null;
}

export interface IconComponentProps {
  iconName: string;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

export const IconComponent: React.FC<IconComponentProps> = ({ 
  iconName, 
  size, 
  color, 
  style 
}) => {
  if (!iconName) return null;
  
  // Try to find the correct icon in any pack
  for (const [prefix, pack] of Object.entries(iconPacks)) {
    if (pack[iconName]) {
      const Icon = pack[iconName] as React.ComponentType<any>;
      return <Icon size={size} color={color} style={style} />;
    }
  }
  
  return null;
}; 