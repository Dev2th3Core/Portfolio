import React, { ReactNode, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

interface GridBackgroundProps {
  children: ReactNode;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ children }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !containerRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty('--x', `${x}px`);
    containerRef.current.style.setProperty('--y', `${y}px`);
  };

  const mode = theme.palette.mode;

  return (
    <div
      ref={containerRef}
      className={`grid-background ${mode}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default GridBackground;
