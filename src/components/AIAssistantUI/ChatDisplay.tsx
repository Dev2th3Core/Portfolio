import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';
import { Message } from '../../types/assistant';

interface ChatDisplayProps {
  messages: Message[];
  isDark: boolean;
  onReset?: () => void;
  onRetry?: () => void;
}

const WelcomeMessage: React.FC<{ isDark: boolean }> = ({ isDark }) => (
    <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: 2,
        }}
    >
        <Box
        sx={{
            bgcolor: isDark ? 'background.default' : '#f1f3fa',
            color: isDark ? 'text.primary' : 'text.secondary',
            px: 3,
            py: 2,
            borderRadius: 3,
            fontSize: 17,
            fontWeight: 500,
            boxShadow: '0 1px 6px 0 rgba(0,0,0,0.06)',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 6,
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: 6,
            textAlign: 'center',
            maxWidth: 420,
        }}
        >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Welcome! 👋
        </Typography>
        <Typography>
            Nothing on your mind? Checkout the Quick Questions button at the bottom.
        </Typography>
        </Box>
    </Box>
);

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages, isDark, onRetry }) => {
  const hasUserMessages = messages.some(m => m.role === 'user');
  const latestQuestionRef = useRef<HTMLDivElement>(null);

  const scrollToLatestQuestion = () => {
    if (latestQuestionRef.current) {
      latestQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to latest question when messages change
  useEffect(() => {
    scrollToLatestQuestion();
  }, [messages]);

  // Find the index of the last user message
  const lastUserMessageIndex = messages.map(m => m.role).lastIndexOf('user');

  return (
    <Box
      sx={{        
        flex: 1,
        overflowY: 'auto',
        mb: 1,
        px: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        minHeight: '30vh',
        maxHeight: '57vh',
        justifyContent: hasUserMessages ? 'flex-start' : 'center',
        alignItems: hasUserMessages ? 'stretch' : 'center',
        position: 'relative',
      }}
    >
      {!hasUserMessages ? (
        <WelcomeMessage isDark={isDark} />
      ) : (
        <>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              ref={idx === lastUserMessageIndex ? latestQuestionRef : undefined}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                pb: {
                  xs: 1,
                  sm: 0
                }
              }}
            >
              <Box
                sx={{
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  bgcolor: msg.role === 'user'
                    ? (isDark ? 'primary.dark' : 'primary.main')
                    : (isDark ? 'background.default' : '#f1f3fa'),
                  color: msg.role === 'user'
                    ? '#fff'
                    : (isDark ? 'text.primary' : 'text.secondary'),
                  px: {
                    xs: 1,
                    sm: 2
                  },
                  py: 1,
                  borderRadius: 3,
                  maxWidth: '75%',
                  fontSize: 16,
                  fontWeight: 500,
                  boxShadow: msg.role === 'user'
                    ? '0 2px 8px 0 rgba(25,118,210,0.10)'
                    : '0 1px 6px 0 rgba(0,0,0,0.06)',
                  borderTopRightRadius: msg.role === 'user' ? 6 : 24,
                  borderTopLeftRadius: msg.role === 'user' ? 24 : 6,
                  borderBottomRightRadius: msg.role === 'user' ? 6 : 24,
                  borderBottomLeftRadius: msg.role === 'user' ? 24 : 6,
                  wordBreak: 'break-word',
                  transition: 'background 0.2s',
                }}
              >
                {msg.text}
              </Box>
              {msg.role === 'ai' && msg.isError && onRetry && (
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={onRetry}
                  startIcon={<ReplayRounded />}
                  sx={{
                    mt: 1,
                    fontSize: 14,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(33, 150, 243, 0.08)' : 'rgba(33, 150, 243, 0.04)',
                    }
                  }}
                >
                  Try Again
                </Button>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default ChatDisplay;
