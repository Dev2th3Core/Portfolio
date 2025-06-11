import React from 'react';
import { Box, Typography } from '@mui/material';
import { Message } from '../../types/assistant';

interface ChatDisplayProps {
  messages: Message[];
  isDark: boolean;
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

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages, isDark }) => {
  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        mb: 2,
        px: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minHeight: 120,
        maxHeight: { xs: '40vh', sm: '55vh', md: '60vh' },
        justifyContent: hasUserMessages ? 'flex-start' : 'center',
        alignItems: hasUserMessages ? 'stretch' : 'center',
      }}
    >
      {!hasUserMessages ? (
        <WelcomeMessage isDark={isDark} />
      ) : (
        messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                bgcolor: msg.role === 'user'
                  ? (isDark ? 'primary.dark' : 'primary.main')
                  : (isDark ? 'background.default' : '#f1f3fa'),
                color: msg.role === 'user'
                  ? '#fff'
                  : (isDark ? 'text.primary' : 'text.secondary'),
                px: 2.2,
                py: 1.2,
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
          </Box>
        ))
      )}
    </Box>
  );
};

export default ChatDisplay;
