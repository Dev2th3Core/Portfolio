import React, { useState } from 'react';
import { Button, Tooltip, Box } from '@mui/material';
import { BusinessCenter } from '@mui/icons-material';
import JDAnalysisModal from './JDAnalysisModal';

const JDAnalysisButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Tooltip 
        title="Analyze Job Description" 
        arrow
      >
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 70, sm: 32 },
            right: 20,
            zIndex: 50,
          }}
        >
          <Button
            variant="contained"
            aria-label="analyze jd"
            startIcon={<BusinessCenter />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              position: 'relative',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              background: 'linear-gradient(-45deg, #4a00e0, #8e2de2, #2d8de2, #00d4ff)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              transition: 'all 0.3s ease-in-out',
              '@keyframes gradient': {
                '0%': {
                  backgroundPosition: '0% 50%'
                },
                '50%': {
                  backgroundPosition: '100% 50%'
                },
                '100%': {
                  backgroundPosition: '0% 50%'
                }
              },
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => 
                  theme.palette.mode === 'dark' 
                    ? '0 8px 16px rgba(78, 13, 218, 0.3)'
                    : '0 8px 16px rgba(78, 13, 218, 0.2)',
              }
            }}
          >
            Hire Me
          </Button>
        </Box>
      </Tooltip>

      <JDAnalysisModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default JDAnalysisButton;