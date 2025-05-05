import { useState } from "react";
import { Box, Typography, Paper, Tooltip } from "@mui/material";
import { Email, LocationOn, OutgoingMail } from "@mui/icons-material";
import AIAssistant from "./AIAssistant";
import useTabLayout from "../hooks/useTabLayout";
import SocialLinks from "./SocialLinks";

const ContactContent = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const contactInfo = [
    {
      id: 'email',
      icon: <Email />,
      title: "Email",
      content: "dev2th3core@gmail.com",
      color: "#FF6B6B",
      description: "Feel free to reach out for collaborations or just a friendly chat"
    },
    {
      id: 'location',
      icon: <LocationOn />,
      title: "Location",
      content: "Mumbai, India",
      color: "#45B7D1",
      description: "Open to remote work opportunities worldwide"
    }
  ];

  return (
    <Box sx={{ 
      maxWidth: 900,
      maxHeight: '70vh',
      overflowY: 'auto', 
      margin: '0 auto', 
      py: 3,
      px: { xs: 1, sm: 3},
      background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      borderRadius: 3,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            WebkitBackgroundClip: 'text',
            mb: 1
          }}
        >
          Let's Connect
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        gap: 3,
        mb: 6
      }}>
        {contactInfo.map((info) => (
          <Paper
            key={info.id}
            elevation={0}
            sx={{
              py: 3,
              px: { xs: 1, sm: 3},
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: activeCard === info.id ? info.color : 'divider',
              transition: 'all 0.3s ease',
              transform: activeCard === info.id ? 'translateY(-8px)' : 'translateY(0)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                borderColor: info.color
              }
            }}
            onClick={() => setActiveCard(info.id)}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              mb: 2
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: info.color,
                color: 'white'
              }}>
                {info.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                  {info.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {info.id === 'email' ? (
                    <Tooltip title='Click to send mail' arrow>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <a 
                          href={`mailto:${info.content}`}
                          style={{ 
                            color: 'inherit', 
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          >
                          {info.content}
                          <OutgoingMail sx={{ fontSize: 24, color: info.color }} />
                        </a>
                      </span>
                    </Tooltip>
                  ) : (
                    info.content
                  )}
                </Typography>
              </Box>
            </Box>
            {activeCard === info.id && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 2,
                  pl: 2,
                  borderLeft: `3px solid ${info.color}`,
                  transition: 'all 0.3s ease'
                }}
              >
                {info.description}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          Connect with me on social media
        </Typography>
        <SocialLinks 
          size="large"
          variant="minimal"
        />
      </Box>
    </Box>
  );
};

export default useTabLayout(ContactContent, AIAssistant, "Contact");