import React, { useEffect, useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useInternetConnection } from '../hooks/useInternetConnection';
import { keyframes } from '@mui/system';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

interface ConnectionAlertProps {
  showManualDismiss?: boolean;
}

export const ConnectionAlert: React.FC<ConnectionAlertProps> = ({ showManualDismiss = true }) => {
  const isOnline = useInternetConnection();
  const [dismissed, setDismissed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Reset dismissed state when connection status changes
  useEffect(() => {
    if (!isOnline) {
      setDismissed(false);
      setIsExiting(false);
    }
  }, [isOnline]);

  const handleDismiss = () => {
    setIsExiting(true);
    // Wait for animation to complete before setting dismissed
    setTimeout(() => {
      setDismissed(true);
      setIsExiting(false);
    }, 300); // Match this with animation duration
  };

  if (isOnline || dismissed) return null;

  return (
    <Collapse in={!isOnline && !dismissed}>
      <Alert
        severity="error"
        icon={<WifiOffIcon />}
        action={
          showManualDismiss && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleDismiss}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          boxShadow: 3,
          width: '50%',
          margin: '1rem auto',
          borderRadius: 4,
          animation: isExiting
            ? `${slideUp} 0.3s ease-in-out forwards`
            : `${slideDown} 0.3s ease-in-out`,
        }}
      >
        No internet connection. Some features may not work properly.
      </Alert>
    </Collapse>
  );
};
