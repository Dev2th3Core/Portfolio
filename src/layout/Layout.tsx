import { Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import JDAnalysisButton from "../components/JDAnalysis/JDAnalysisButton";

function Layout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Check if the user prefers dark mode using window.matchMedia
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // state to manage the dark mode
  const [toggleDarkMode, setToggleDarkMode] = useState(!prefersDarkMode);

  const [showSidebar, setShowSidebar] = useState(isSmallScreen ? false : true);

  const handleTogglePage = () => {
    setShowSidebar(!showSidebar);// function to toggle the dark mode as true or false

  }

// function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
    // Update the data-theme attribute for CSS variables
    document.documentElement.setAttribute('data-theme', toggleDarkMode ? 'dark' : 'light');// applying the primary and secondary theme colors

  };

  // applying the primary and secondary theme colors
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'light' : 'dark', //default theme
      // primary: {
      //   main: '#90caf9',
      // },
      // secondary: {
      //   main: '#f48fb1',
      // },
      // add other properties here…
      // background: {
      //   // Correct syntax for gradients:
      //   default: toggleDarkMode 
      //     ? 'white'  // Dark gradient
      //     : 'gray',  // Light gradient
      //   paper: toggleDarkMode 
      //     ? 'white'  // Pink gradient for paper in dark mode
      //     : 'black',  // Light pink gradient for paper in light mode
      // },
    },
    typography: {
      fontFamily: 'Roboto, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiFab: {
        styleOverrides: {
          root: {
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            },
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", width: '100vw'}}>
        <Sidebar showSidebar={showSidebar} handleTogglePage={handleTogglePage}/>
        <Home showSidebar={showSidebar} toggleDarkTheme={toggleDarkTheme} handleTogglePage={handleTogglePage} />
        <JDAnalysisButton />
      </Box>
    </ThemeProvider>
  )
}

export default Layout;