import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import React from 'react';
import { keyframes } from '@mui/system';
import ChatDisplay from "./ChatDisplay";
import AIAssistantInput from "./AIAssistantInput";
import SuggestionsMenu from "./SuggestionsMenu";
import { Message } from "../../types/assistant";

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
  const [isClosing, setIsClosing] = React.useState(true);
  // Chat state for messages
  const [messages] = React.useState<Message[]>([
    // Example initial messages
    { role: 'ai', text: `Hi! I'm your AI Assistant. How can I help you with ${sectionTitle}?` },
    { role: 'user', text: 'What are your main skills?' },
    { role: 'ai', text: 'I am skilled in React, TypeScript, Node.js, and more. Would you like to know about a specific skill?' },
    { role: 'ai', text: `Hi! I'm your AI Assistant. How can I help you with ${sectionTitle}?` },
    { role: 'user', text: 'What are your main skills?' },
    { role: 'ai', text: 'I am skilled in React, TypeScript, Node.js, and more. Would you like to know about a specific skill?' },
  ]);

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
          justifyContent: 'space-between',
          flex: 1,
          borderRadius: 4,
          p: 2,
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
        {/* Chat display section */}
        <Box>
          <ChatDisplay messages={messages} isDark={isDark} />
          {/* End chat display section */}
          <SuggestionsMenu
            showSuggestions={showSuggestions}
            isClosing={isClosing}
            suggestedQuestions={suggestedQuestions}
            chipExpand={chipExpand}
            chipShrink={chipShrink}
            isDark={isDark}
            onToggle={() => setShowSuggestions((s) => !s)}
          />
        </Box>
        {/* User input */}
        <AIAssistantInput sectionTitle={sectionTitle} isDark={isDark} theme={theme} />
      </Paper>
    </Box>
  );
};

export default AIAssistant;