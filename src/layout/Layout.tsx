import { createTheme, CssBaseline, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";

function Layout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // state to manage the dark mode
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

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
        fontFamily: 'cursive'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Sidebar showSidebar={showSidebar} handleTogglePage={handleTogglePage}/>
      <Home showSidebar={showSidebar} toggleDarkTheme={toggleDarkTheme} handleTogglePage={handleTogglePage} />
    </ThemeProvider>
  )
}

export default Layout;