import React, { useState } from 'react';
import { Button, Tooltip, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { DownloadForOffline } from '@mui/icons-material';

interface ResumeButtonProps {
  className?: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
}

const ResumeButton: React.FC<ResumeButtonProps> = ({ 
  className,
  variant = 'contained',
  size = 'medium'
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    try {
      setIsDownloading(true);
  
      const resumeUrl = '/Rakshit Shinde.pdf';
  
      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.setAttribute('download', 'Rakshit Shinde.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Optional: reset loading state
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again later.');
      setIsDownloading(false);
    }
  };

  const buttonStyles = {
    borderRadius: "12px",
    marginLeft: "10px",
    position: isSmallScreen ? 'fixed' : 'static',
    bottom: isSmallScreen ? '20px' : 'auto',
    right: isSmallScreen ? '20px' : 'auto',
    zIndex: 1000,
    boxShadow: isSmallScreen ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
    '&:hover': {
      boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
    }
  };

  return (
    <Tooltip 
      title="Download Resume" 
      arrow
    >
      <Button
        variant={variant}
        size={size}
        startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <DownloadForOffline color="inherit" />}
        onClick={handleDownload}
        sx={buttonStyles}
        className={className}
      >
        {isDownloading ? 'Downloading...' : 'Resume'}
      </Button>
    </Tooltip>
  );
};

export default ResumeButton; 