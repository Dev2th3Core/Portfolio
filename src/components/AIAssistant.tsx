import { Box, Typography, Paper, TextField, IconButton, InputAdornment, Chip, Stack, Collapse, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import React from 'react';
import { keyframes } from '@mui/system';
import { ArrowCircleRight, ArrowRight, ArrowUpward } from "@mui/icons-material";

const getSectionOverview = (title: string) => {
  switch (title) {
    case "Me":
      return "Ask me anything about my background, interests, and personal journey.";
    case "Experience":
      return "Curious about my work experience, roles, or achievements? Just ask!";
    case "Projects":
      return "Learn more about my projects, technologies used, and my contributions.";
    case "Skills":
      return "Find out about my technical and soft skills, and how I apply them.";
    case "Contact":
      return "Want to know how to reach me or collaborate? Ask your questions here.";
    default:
      return "Ask me anything about this section!";
  }
};

const getSectionTitleFromPath = (pathname: string) => {
  if (pathname.includes("/experience")) return "Experience";
  if (pathname.includes("/projects")) return "Projects";
  if (pathname.includes("/techstack")) return "Skills";
  if (pathname.includes("/contact")) return "Contact";
  if (pathname.includes("/")) return "Me";
  return "Portfolio";
};

const suggestedQuestions = [
  "What are your main skills?",
  "Tell me about your latest project.",
  "What experience do you have?",
  "How can I contact you?"
];

// Animation keyframes for chip expand and shrink
const chipExpand = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
`;
const chipShrink = keyframes`
  from {
    transform: scaleX(1);
    opacity: 1;
  }
  to {
    transform: scaleX(0);
    opacity: 0;
  }
`;

const AIAssistant = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const location = useLocation();
  const sectionTitle = getSectionTitleFromPath(location.pathname);
  const [showSuggestions, setShowSuggestions] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);

  // Handle delayed closing for animation
  React.useEffect(() => {
    if (!showSuggestions) {
      setIsClosing(true);
      const timeout = setTimeout(() => setIsClosing(false), 250); // match Collapse timeout
      return () => clearTimeout(timeout);
    }
  }, [showSuggestions]);

  return (
    <Box maxWidth={900} sx={{
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      height: 'calc(100vh - 150px)',
      minHeight: 400,
    }}>
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          borderRadius: 4,
          p: 3,
          background: isDark
            ? 'linear-gradient(135deg, #23272f 0%, #2c3440 100%)'
            : theme.palette.background.paper,
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, fontStyle: 'italic' }}
        >
          {getSectionOverview(sectionTitle)}
        </Typography>
        {/* Chat area placeholder */}
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            mb: 0,
            p: 2,
            borderRadius: 3,
            background: isDark ? theme.palette.background.paper : '#fff',
            border: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto',
          }}
        >
          <Box sx={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          minWidth: 200,
        }}>
          <Tooltip title={showSuggestions ? 'Hide suggestions' : 'Show suggestions'} placement="left">
            <IconButton size="small" onClick={() => setShowSuggestions((s) => !s)} sx={{ m: 1, background: 'background.paper', boxShadow: 1 }}>
              {showSuggestions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
          <Collapse in={showSuggestions || isClosing} timeout={550} unmountOnExit>
            <Stack direction="column" spacing={1} sx={{ width: 'auto', maxWidth: 320, alignItems: 'flex-end', p: 1, borderRadius: 2 }}>
              {suggestedQuestions.map((q, i) => (
                <Box
                  key={i}
                  sx={{
                    overflow: 'hidden',
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
                      clickable
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        width: 'fit-content',
                        maxWidth: '100%',
                      }}
                    />
                  </Tooltip>
                </Box>
              ))}
            </Stack>
          </Collapse>
        </Box>
          <Typography variant="body2" color="text.disabled" align="center">
            Start a conversation to know more about {sectionTitle}.
          </Typography>
        </Paper>
        {/* Suggested Questions */}
        
        {/* User input */}
        <Box
          component="form"
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'flex-end',
            position: 'sticky',
            bottom: 0,
            pt: 2,
            borderRadius: '16px',
            background: isDark ? 'rgba(30,34,44,0.95)' : 'rgba(255,255,255,0.95)',
            boxShadow: isDark
              ? '0 2px 12px 0 rgba(0,0,0,0.35)'
              : '0 2px 12px 0 rgba(0,0,0,0.08)',
            px: 2,
            pb: 2,
            mt: 2,  
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
                fontSize: 18,
                fontWeight: 500,
                lineHeight: 1.6,
                background: 'transparent',
                color: isDark ? theme.palette.text.primary : '#222',
              },
            }}
            sx={{
              background: isDark ? 'rgba(40,44,54,0.98)' : '#f7faff',
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
                  <InputAdornment position="end" sx={{ position: 'absolute', right: 8, bottom: 15 }}>
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
                      <ArrowUpward fontSize="medium"/>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AIAssistant;