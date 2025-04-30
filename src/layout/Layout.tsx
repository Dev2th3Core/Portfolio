import { Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";

function Layout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Check if the user prefers dark mode using window.matchMedia
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // state to manage the dark mode
  const [toggleDarkMode, setToggleDarkMode] = useState(!prefersDarkMode);

  const [showSidebar, setShowSidebar] = useState(isSmallScreen ? false : true);

  const handleTogglePage = () => {
    if(showSidebar){
        setShowSidebar(false);
    }else{
        setShowSidebar(true);
    }
  }

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
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
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", width: '100vw'}}>
        <Sidebar showSidebar={showSidebar} handleTogglePage={handleTogglePage}/>
        <Home showSidebar={showSidebar} toggleDarkTheme={toggleDarkTheme} handleTogglePage={handleTogglePage} />
      </Box>
    </ThemeProvider>
  )
}

export default Layout;