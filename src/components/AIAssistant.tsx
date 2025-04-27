import { Box, Typography, Paper } from "@mui/material";

interface AIAssistantProps {
  title: string;
}

const AIAssistant = ({ title }: AIAssistantProps) => {
  return (
    <Box maxWidth={900} sx={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Coming Soon!</Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          I'm working on an AI-powered assistant that will provide deeper insights about my work and experience.
        </Typography>
        <Typography variant="body1">
          Soon, you'll be able to ask questions about {title} and get detailed, AI-generated responses that offer a more comprehensive understanding of my professional journey, projects, and expertise.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AIAssistant; 