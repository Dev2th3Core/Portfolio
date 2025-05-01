import Icon from "../assets/Rakshit_Icon.png"
import { Box, IconButton, Link, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import MaterialUISwitch from "./Switch";
import { ChromeReaderMode, ArrowBack, ArrowForward } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ResumeButton from "./ResumeButton";
import PathConstants from "../routes/pathConstants";

interface NavbarProps {
    showSidebar: boolean;
    toggleDarkTheme: () => void;
    handleTogglePage: () => void;
}

function Navbar({ showSidebar, toggleDarkTheme, handleTogglePage }: NavbarProps){
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isDarkMode = theme.palette.mode === 'dark';

    const navigationSequence = [
        PathConstants.ABOUT,
        PathConstants.EXPERIENCE,
        PathConstants.PROJECTS,
        PathConstants.TECHSTACK,
        PathConstants.CONTACT
    ];

    const currentIndex = navigationSequence.indexOf(location.pathname);
    const isFirstPage = currentIndex === 0;
    const isLastPage = currentIndex === navigationSequence.length - 1;

    const handlePrevPage = () => {
        if (!isFirstPage) {
            navigate(navigationSequence[currentIndex - 1]);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            navigate(navigationSequence[currentIndex + 1]);
        }
    };

    return(
        <Box className="home-header">
            <Box 
                style={{ 
                    width: isSmallScreen ? "auto" : "11rem", 
                    padding: ".5rem", 
                    display: "flex", 
                    visibility: showSidebar ? "hidden" : "visible" 
                }} 
            >
                <Link 
                    href="/" 
                    p="8px" 
                    className="side-bar-logo" 
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block',
                            md: 'block'
                        }
                    }}
                >
                    <img className="logo" width="35px" height="35px" src={Icon}></img>
                </Link>
                <Tooltip title="Open Sidebar" placement='bottom' arrow>
                    <IconButton sx={{ padding: isSmallScreen ? "5px" : "10px" }} aria-label='menu' onClick={handleTogglePage}>
                        <ChromeReaderMode 
                            sx={{ 
                                fontSize: {
                                    xs: 25,
                                    sm: 30,
                                } 
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: {
                        xs: 0,
                        sm: 2
                    },
                    justifyContent: 'space-between',
                    width: isSmallScreen ? "-webkit-fill-available" : "15rem"
                }}
            >
                <Tooltip title="Previous" arrow>
                    <span>
                        <IconButton 
                            onClick={handlePrevPage} 
                            disabled={isFirstPage}
                            sx={{ 
                                padding: isSmallScreen ? "5px" : "13px",
                                opacity: isFirstPage ? 0.5 : 1
                            }}
                        >
                            <ArrowBack sx={{ fontSize: 25 }}/>
                        </IconButton>
                    </span>
                </Tooltip>
                <Typography variant="body2" fontWeight={700}>
                    {location.pathname.substring(1).length ? location.pathname.substring(1).toUpperCase() : 'HOME'}
                </Typography>
                <Tooltip title="Next" arrow>
                    <span>
                        <IconButton 
                            onClick={handleNextPage} 
                            disabled={isLastPage}
                            sx={{ 
                                padding: isSmallScreen ? "5px" : "13px",
                                opacity: isLastPage ? 0.5 : 1
                            }}
                        >
                            <ArrowForward sx={{ fontSize: 25 }}/>
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
            <Box className="home-btn">
                <MaterialUISwitch checked={isDarkMode ? true : false} className="switch" onClick={toggleDarkTheme} />
                {!isSmallScreen && <ResumeButton />}
            </Box>
            {isSmallScreen && <ResumeButton />}
        </Box>
    )
}

export default Navbar;