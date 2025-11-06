import { Box, Typography, Paper, Avatar } from "@mui/material";
import AIAssistant from "./AIAssistantUI/AIAssistant";
import useTabLayout from "../hooks/useTabLayout";
import image from "../assets/profile-photo.png";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";

const AboutContent = () => {

  return (
    <Box sx={{ maxWidth: 900, maxHeight: "80vh", overflowY: "scroll", overflowX: 'hidden', margin: '0 auto', padding: 2, pb: 8 }}>
      {/* <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}> */}
        {/* Personal Snapshot Section - Grid Layout */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
          gap: 2,
          alignItems: 'center',
          mb: 4 
        }}>
          <Box sx={{ 
            alignItems: 'center',
            textAlign: 'center'
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center'
          }}>
            <Avatar
              sx={{ 
                margin: '0 auto',
                width: 120, 
                height: 120, 
                filter: "drop-shadow(0 0px 6px rgba(25, 118, 210))"
              }}
              src={image}
              alt="Rakshit Shinde"
            >
              RS
            </Avatar>
              <Box>
                <SocialLinks 
                  size="medium"
                  variant="minimal" 
                />
              </Box>
          </Box>
          <Box
            sx={{
              textAlign: {
                xs: 'center',   // for extra-small screens and up
                md: 'left',
                lg: 'left',     // for large screens and up (laptop+)
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Rakshit Shinde
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Software Engineer | Full Stack Developer
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              "Hi👋🏻! Rakshit Shinde here, aka Dev2th3Core 👨🏻‍💻. I build unique software or at least I try to 😅. 
              Most of my projects are slowly rusting away on my local machine 💻 but hey, what’s a developer without a graveyard🪦 of brilliant unfinished ideas?😊"
            </Typography>
          </Box>
        </Box>


        {/* Experience and Organization Section - Grid Layout */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 4 
        }}>
          {/* Years of Experience */}
          <Paper elevation={4} sx={{ p: 2, textAlign: 'center', backgroundImage: 'var(--Paper-overlay)' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              3+
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Years of Experience
            </Typography>
          </Paper>

          {/* Current Organization */}
          <Paper elevation={4} sx={{ p: 2, textAlign: 'center', backgroundImage: 'var(--Paper-overlay)' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              WCT
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Current Organization
            </Typography>
          </Paper>
        </Box>

        {/* Tech Stack Marquee */}
        <Skills />
      {/* </Paper> */}
    </Box>
  );
};

export default useTabLayout(AboutContent, AIAssistant, "About Me");
