import React from 'react';
import { Box, Tooltip, Collapse, Stack, Chip, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface SuggestionsMenuProps {
  showSuggestions: boolean;
  isClosing: boolean;
  suggestedQuestions: string[];
  chipExpand: any;
  chipShrink: any;
  isDark: boolean;
  onToggle: () => void;
  onSelectQuestion?: (question: string) => void;
}

const SuggestionsMenu: React.FC<SuggestionsMenuProps> = ({
  showSuggestions,
  isClosing,
  suggestedQuestions,
  chipExpand,
  chipShrink,
  isDark,
  onToggle,
  onSelectQuestion
}) => (
  <Box sx={{ position: 'absolute', bottom: { xs: 50, sm: 80 }, right: 5, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 200 }}>
    <Tooltip title={showSuggestions ? 'Hide suggestions' : 'Show suggestions'} placement="left">
      <Button 
        variant='outlined'
        endIcon={showSuggestions ? <ExpandMoreIcon /> : <ExpandLessIcon />} 
        onClick={onToggle} 
        sx={{ m: 1, borderRadius: 6, px: 2, boxShadow: 1, bgcolor: isDark ? 'background.default' : '#f1f3fa',
        color: isDark ? 'text.primary' : 'text.secondary', }}>
        Quick Questions
      </Button>
    </Tooltip>
    <Collapse in={showSuggestions || isClosing} timeout={550} unmountOnExit>
      <Stack direction="column" spacing={1} sx={{ width: 'auto', maxWidth: 320, alignItems: 'flex-end', p: 1, borderRadius: 2 }}>
        {suggestedQuestions.map((q, i) => (
          <Box
            key={i}
            sx={{
              overflow: 'visible',
              display: 'inline-block',
              animation: `${showSuggestions ? chipExpand : chipShrink} 0.35s cubic-bezier(0.4, 0, 0.2, 1) both`,
              animationDelay: `${i * 120}ms`,
              transformOrigin: 'right',
            }}
          >
            <Tooltip title="Ask Question" placement="left">
              <Chip
                label={q}
                size="medium"
                onClick={() => onSelectQuestion?.(q)}
                clickable
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  px: 1,
                  py: .5,
                  borderRadius: 2,
                  width: 'fit-content',
                  maxWidth: '80vw',
                  height: 'auto',
                  minHeight: '8px',
                  border: '1px solid',
                  bgcolor: isDark ? 'background.default' : '#f1f3fa',
                  color: isDark ? 'text.primary' : 'text.secondary',
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'right',
                    [`@media (max-width: ${520}px)`]: {
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    },
                    [`@container (max-width: ${520}px)`]: {
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }
                  },
                  ":hover": {
                    transform: 'none',
                    boxShadow: 'none',
                    bgcolor: isDark ? 'background.default' : '#f1f3fa',
                  }
                }}
              />
            </Tooltip>
          </Box>
        ))}
      </Stack>
    </Collapse>
  </Box>
);

export default SuggestionsMenu;
