import React from "react";
import { Box, Typography, Card, CardContent, CardActions, IconButton } from "@mui/material";
import { GitHub, Launch, Code } from "@mui/icons-material";
import AIAssistant from "./AIAssistantUI/AIAssistant";
import useTabLayout from "../hooks/useTabLayout";
import { 
  SiReact, SiTypescript,
  SiRedux,
  SiJavascript,
  SiCss3,
  SiDotnet,
  SiMui,
  SiGooglegemini,
  SiNodedotjs,
  SiNetlify,
  SiNextdotjs,
  SiTailwindcss,
  SiSocketdotio
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { GrConnect } from "react-icons/gr";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";

interface Project {
  title: string;
  description: string;
  technologies: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  githubLink?: string;
  liveLink?: string;
  image?: string;
}

const ProjectsContent = () => {
  const projects: Project[] = [
    {
      title: "TCP Socket Programming App",
      description: "A .NET Console-based TCP client-server application demonstrating real-time socket communication. Features include encrypted message exchange, asynchronous handling of multiple clients, and real-time system responses. The project showcases core networking principles, with a focus on secure and efficient data transfer.",
      technologies: [
        { name: ".NET", icon: SiDotnet },
        { name: "C#", icon: TbBrandCSharp },
        { name: "Socket Programming", icon: GrConnect },
        { name: "Encryption", icon: MdNoEncryptionGmailerrorred }
      ],
      githubLink: "https://github.com/Dev2th3Core/Socket-Programming",
      liveLink: ""
    },
    {
      title: "Personal Portfolio Website",
      description: "A sleek, fully responsive portfolio built with React and TypeScript to showcase projects, experience, and skills. Includes dark mode toggle, smooth animations, and an interactive AI assistant for guided exploration. Designed with a focus on clean UI and performance.",
      technologies: [
        { name: "React", icon: SiReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Material-UI", icon: SiMui }
      ],
      githubLink: "https://github.com/Dev2th3Core/Portfolio",
      liveLink: "https://dev2th3core.site"
    },
    {
      title: "NetliFunk",
      description: "NetliFunk is a serverless backend for my React portfolio, featuring a Gemini-powered AI assistant that answers questions about portfolio sections. It also supports AI-driven features like skill matching and job description analysis.",
      technologies: [
        { name: "Gemini API", icon: SiGooglegemini },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Netlify Functions", icon: SiNetlify },
        { name: "TypeScript", icon: SiTypescript },
      ],
      githubLink: "https://github.com/Dev2th3Core/NetliFunk"
    },
    {
      title: "Tic-Tac-Toe Infinity",
      description: "Tic-Tac-Toe Infinity takes the classic game to the next level with an exciting twist — no more draws! The grid expands infinitely, ensuring every match ends with a winner. Play against friends or smart bots in a dynamic, strategy-driven experience that keeps evolving.",
      technologies: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Socket.io", icon: SiSocketdotio },
        { name: "Tailwind CSS", icon: SiTailwindcss }
      ],
      githubLink: "https://github.com/Dev2th3Core/tic-tac-toe-infinity",
      liveLink: "https://tic-tac-toe-infinity.onrender.com/"
    },
    {
      title: "Minimal Shopping App",
      description: "A frontend-only e-commerce web app built using Fakestore API. It features a product catalog, shopping cart, and basic filtering. State management is handled via Redux, and the app is fully responsive and deployed on Netlify.",
      technologies: [
        { name: "React", icon: SiReact },
        { name: "Redux", icon: SiRedux },
        { name: "JavaScript", icon: SiJavascript },
        { name: "CSS3", icon: SiCss3 }
      ],
      githubLink: "https://github.com/Dev2th3Core/React-Redux-Shopping-Website",
      liveLink: "https://earnest-unicorn-afcf9e.netlify.app/"
    }
  ];

  return (
    <Box sx={{ maxWidth: 1000, maxHeight: '80vh', overflow: 'scroll', margin: '0 auto', p: { xs: 2, sm: 3}, pb: {xs: '8rem' } }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 2,
          ml: 2
        }}
      >
        <Code /> Featured Projects
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4 
      }}>
        {projects.map((project, index) => (
          <Card 
            key={index}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
              borderRadius: 2,
              backgroundImage: 'var(--Paper-overlay)',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3} }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                {project.title}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 3 }}
              >
                {project.description}
              </Typography>
              <Box className="skills-container">
                <Typography 
                  variant="subtitle1" 
                  className="skills-title"
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 1,
                    color: 'text.secondary',
                  }}
                >
                  Technologies Used
                </Typography>
                <Box>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Box
                        className="skill-item"
                        key={techIndex}
                        sx={{
                          border: theme => `1px solid ${theme.palette.divider}`,
                          backgroundColor: theme => theme.palette.action.hover,
                          color: theme => theme.palette.text.primary,
                          '&:hover': {
                            backgroundColor: theme => theme.palette.action.selected,
                          },
                        }}
                      >
                        {React.createElement(tech.icon, { className: 'skill-icon' })}
                        <span>{tech.name}</span>
                      </Box>
                    ))}
                  </div>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end', gap: 1 }}>
              {project.githubLink && (
                <IconButton 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <GitHub />
                </IconButton>
              )}
              {project.liveLink && (
                <IconButton 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <Launch />
                </IconButton>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default useTabLayout(ProjectsContent, AIAssistant, "Projects");