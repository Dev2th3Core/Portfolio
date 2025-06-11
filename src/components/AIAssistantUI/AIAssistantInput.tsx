import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { Theme } from '@mui/material/styles';

interface AIAssistantInputProps {
  sectionTitle: string;
  isDark: boolean;
  theme: Theme;
}

const AIAssistantInput: React.FC<AIAssistantInputProps> = ({ sectionTitle, isDark, theme }) => (
  <Box
    component="form"
    sx={{
      display: 'flex',
      gap: 1,
      mt: 2,
      alignItems: 'flex-end',
      position: 'sticky',
    }}
  >
    <TextField
      fullWidth
      placeholder={`Ask about ${sectionTitle}...`}
      size="medium"
      variant="outlined"
      multiline
      minRows={1}
      maxRows={5}
      inputProps={{
        style: {
          overflowY: 'auto',
          maxHeight: '160px',
          resize: 'none',
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.6,
        //   background: 'transparent',
        //   color: isDark ? theme.palette.text.primary : '#222',
        },
      }}
      sx={{
        // background: isDark ? 'rgba(40,44,54,0.98)' : '#f7faff',
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
          paddingRight: 0,
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
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ position: 'absolute', right: 8, bottom: 12 }}>
              <IconButton
                type="submit"
                color="primary"
                sx={{
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
                }}
              >
                <ArrowUpward fontSize="medium" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  </Box>
);

export default AIAssistantInput;
