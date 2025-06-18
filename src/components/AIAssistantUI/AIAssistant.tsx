import { Box, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import React, { useEffect } from 'react';
import { keyframes } from '@mui/system';
import ChatDisplay from "./ChatDisplay";
import AIAssistantInput from "./AIAssistantInput";
import SuggestionsMenu from "./SuggestionsMenu";
import { ConnectionAlert } from "../ConnectionAlert";
import { Message } from "../../types/assistant";
import { aiAssistant } from "../../services/api/aiAssistantApi";
import { DeleteForeverRounded } from "@mui/icons-material";

const getSectionOverview = (title: string) => {
  switch (title) {
    case "About":
      return "Ask about my background, interests, or journey.";
    case "Experience":
      return "Curious about my work, roles, or achievements?";
    case "Projects":
      return "Learn about my projects and tech stack.";
    case "Skills":
      return "Explore my technical skills across stack.";
    case "Contact":
      return "Want to know how to reach me or collaborate?";
    default:
      return "Ask me anything about this section!";
  }
};

const getSectionTitleFromPath = (pathname: string) => {
  if (pathname.includes("/experience")) return "Experience";
  if (pathname.includes("/projects")) return "Projects";
  if (pathname.includes("/techstack")) return "Skills";
  if (pathname.includes("/contact")) return "Contact";
  if (pathname.includes("/")) return "About";
  return "Portfolio";
};

const sectionSuggestedQuestions = {
  About: [
    "What's your background?",
    "Tell me about yourself.",
    "What are your career goals?",
    "What motivates you in your work?"
  ],
  Experience: [
    "What's your current role?",
    "Tell me about your work at Xoriant.",
    "What are your key achievements?",
    "What technologies do you work with?"
  ],
  Projects: [
    "What's your most challenging project?",
    "Tell me about your portfolio website.",
    "Have you worked on any AI projects?",
    "What's your favorite project?"
  ],
  Skills: [
    "What are your core technical skills?",
    "How experienced are you with React?",
    "What backend technologies do you know?",
    "Tell me about your cloud experience."
  ],
  Contact: [
    "What's the best way to reach you?",
    "Are you open to new opportunities?",
    "Do you do freelance work?",
    "Where are you located?"
  ]
};

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
  const STORAGE_KEY = 'portfolio-chat-messages-' + sectionTitle;
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastFailedQuestion, setLastFailedQuestion] = React.useState<string | null>(null);
  const [allMessages, setAllMessages] = React.useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
        return [];
      }
    }
    return [];
  });
  const [followUpQuestions, setFollowUpQuestions] = React.useState<string[]>(
    sectionSuggestedQuestions[sectionTitle as keyof typeof sectionSuggestedQuestions]
  );

  // Update initial questions when section changes
  useEffect(() => {
    setFollowUpQuestions(sectionSuggestedQuestions[sectionTitle as keyof typeof sectionSuggestedQuestions]);
  }, [sectionTitle]);

  // Filter messages for current section
  const currentMessages = allMessages.filter(msg => msg.section === sectionTitle);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allMessages));
  }, [allMessages]);

  // Initialize welcome message for new sections
  useEffect(() => {
    if (currentMessages.length === 0) {
      setAllMessages(prev => [...prev]);
    }
  }, [sectionTitle]);

  // Handle delayed closing for animation
  useEffect(() => {
    if (!showSuggestions) {
      setIsClosing(true);
      const timeout = setTimeout(() => setIsClosing(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [showSuggestions]);

  const handleSendMessage = async (question: string) => {
    try {
      setIsLoading(true);
      setLastFailedQuestion(null);
      // Add user message immediately
      setAllMessages(prev => [...prev, { 
        role: 'user', 
        text: question,
        section: sectionTitle
      }]);
      
      // Call AI Assistant API
      const response = await aiAssistant(question, sectionTitle.toLowerCase());
      
      // Add AI response
      setAllMessages(prev => [...prev, { 
        role: 'ai', 
        text: response.answer,
        section: sectionTitle
      }]);
      
      // Update follow-up questions
      setFollowUpQuestions(response.followUpQuestions);
      setShowSuggestions(false);
    } catch (error) {
      setLastFailedQuestion(question);
      // Add error message
      setAllMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Sorry, I encountered an error. Please try again later.',
        section: sectionTitle,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedQuestion) {
      // Remove the last error message
      setAllMessages(prev => prev.slice(0, -2));
      // Retry the question
      handleSendMessage(lastFailedQuestion);
    }
  };

  const handleSelectQuestion = (question: string) => {
    handleSendMessage(question);
    setShowSuggestions(false);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAllMessages([]);
  };

  return (
    <>
      <ConnectionAlert />
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
            p: { xs: 1, sm: 2},
            background: isDark
              ? 'linear-gradient(135deg, #23272f 0%, #2c3440 100%)'
              : theme.palette.background.paper,
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
            position: 'relative',
            minHeight: 0, // allow flex children to shrink
          }}
        >
          <Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 1, mr: { xs: 5, sm: 0 }, fontStyle: 'italic' }}
            >
              {getSectionOverview(sectionTitle)}
            </Typography>
            <Tooltip title="Clear chat history" placement="left">
            <IconButton
              onClick={handleReset}
              disabled={allMessages.length ? false : true}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                p: { xs: .5, sm: 1},
                zIndex: 1,
                background: 'rgba(0, 0, 0, 0.12)',
                color: isDark ? 'text.secondary' : 'text.primary',
                opacity: 0.6,
                ':hover': {
                  opacity: 1,
                  color: 'error.main',
                }
              }}
            >
              <DeleteForeverRounded />
            </IconButton>
          </Tooltip>
          </Box>
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <ChatDisplay 
              messages={currentMessages} 
              isDark={isDark} 
              onReset={handleReset}
              onRetry={handleRetry}
              // isError={lastFailedQuestion !== null}
            />
            <SuggestionsMenu
              showSuggestions={showSuggestions}
              isClosing={isClosing}
              suggestedQuestions={followUpQuestions}
              chipExpand={chipExpand}
              chipShrink={chipShrink}
              isDark={isDark}
              onToggle={() => setShowSuggestions((s) => !s)}
              onSelectQuestion={handleSelectQuestion}
            />
          </Box>
          {/* User input */}
          <AIAssistantInput 
            isDark={isDark} 
            theme={theme} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </Paper>
      </Box>
    </>
  );
};

export default AIAssistant;