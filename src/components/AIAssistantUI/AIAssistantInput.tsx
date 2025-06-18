import React from 'react';
import { Box, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { Theme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

interface AIAssistantInputProps {
  isDark: boolean;
  theme: Theme;
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const getInputPlaceholder = (pathname: string) => {
  if (pathname.includes("/experience")) return "Ask about my Experience";
  if (pathname.includes("/projects")) return "Ask about my Projects";
  if (pathname.includes("/techstack")) return "Ask about my TechStack";
  if (pathname.includes("/contact")) return "Check how to connect";
  if (pathname.includes("/")) return "Start a Conversation";
  return "Ask me anything";
};

const AIAssistantInput: React.FC<AIAssistantInputProps> = ({ 
  isDark, 
  theme, 
  onSendMessage,
  isLoading 
}) => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    await onSendMessage(message.trim());
    setMessage('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        mt: 1,
        alignItems: 'flex-end',
        position: 'sticky',
      }}
    >
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={getInputPlaceholder(useLocation().pathname)}
        size="medium"
        variant="outlined"
        multiline
        minRows={1}
        maxRows={5}
        disabled={isLoading}
        sx={{
          bgcolor: isDark ? 'background.default' : '#f1f3fa',
          color: isDark ? 'text.primary' : 'text.secondary',
          borderRadius: 3,
          boxShadow: isDark
            ? '0 1px 6px 0 rgba(0,0,0,0.18)'
            : '0 1px 6px 0 rgba(0,0,0,0.06)',
          border: '1.5px solid',
          borderColor: isDark ? theme.palette.divider : '#e3e8f0',
          transition: 'border-color 0.2s',
          '& .MuiOutlinedInput-root': {
            pr: 0,
            alignItems: 'flex-end',
            background: 'transparent',
            borderRadius: 3,
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-inputMultiline': {
            overflowY: 'auto',
            maxHeight: '160px',
            resize: 'none',
          },
          '&:hover': {
            borderColor: theme.palette.primary.main,
          },
          '&:focus-within': {
            borderColor: theme.palette.primary.main,
            boxShadow: isDark
              ? '0 0 0 2px #1976d2aa'
              : '0 0 0 2px #1976d233',
          },
        }}
        slotProps={{
          input:{
            endAdornment: (
              <InputAdornment position="end" sx={{ position: 'absolute', right: 8, bottom: 12 }}>
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={!message.trim() || isLoading}
                  sx={{
                    p: 1,
                    background: theme.palette.primary.main,
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(25,118,210,0.10)',
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    },
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 2,
                    transition: 'background 0.18s',
                    '&.Mui-disabled': {
                      background: theme.palette.action.disabledBackground,
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <ArrowUpward fontSize="medium" />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  );
};

export default AIAssistantInput;
