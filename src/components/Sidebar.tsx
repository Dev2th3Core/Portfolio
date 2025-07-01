import { Box, Button, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import Icon from "../assets/Rakshit_Icon.png"
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import { ChatRounded, CodeOff, GitHub, Person, Work } from "@mui/icons-material";
import StyledLink from "./StyledLink";
import PathConstants from "../routes/pathConstants";
import SocialLinks from "./SocialLinks";
import GridBackground from "./GridBackground";

interface SidebarProps {
    showSidebar: boolean;
    handleTogglePage: () => void;
}
  
const Sidebar = ({ showSidebar, handleTogglePage} : SidebarProps) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Box 
            bgcolor={theme.palette.background.default}
            className={`side-bar-container ${showSidebar ? "side-bar-container-full" : "side-bar-container-mini"}`}
        >
            <GridBackground>
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box className="side-bar-header">
                        <StyledLink to={PathConstants.ABOUT} className="side-bar-logo">
                            <img className="logo" width="35px" height="35px" src={Icon}></img>
                            <h5>Rakshit Shinde</h5>
                        </StyledLink>
                        <Tooltip title="Close Sidebar" placement="bottom" arrow>
                            <IconButton sx={{ padding: "10px" }} aria-label='menu' onClick={handleTogglePage}>
                                <ChromeReaderModeIcon 
                                    sx={{ 
                                        fontSize: {
                                            xs: 25,
                                            sm: 30,
                                            md: 30
                                        } 
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box className="side-bar-content" mx={2} mt={2}>
                        <StyledLink to={PathConstants.ABOUT} onClick={() => { isSmallScreen ? handleTogglePage() : null}}>
                            <Button variant="contained" style={{ whiteSpace: "nowrap" }} color="inherit" startIcon={<Person />} fullWidth>
                                About Me
                            </Button>
                        </StyledLink>
                        <StyledLink to={PathConstants.EXPERIENCE} onClick={() => { isSmallScreen ? handleTogglePage() : null}}>
                            <Button variant="contained" style={{ whiteSpace: "nowrap" }} color="inherit" startIcon={<Work />} fullWidth>
                                Experience
                            </Button>
                        </StyledLink>
                        <StyledLink to={PathConstants.PROJECTS} onClick={() => { isSmallScreen ? handleTogglePage() : null}}>
                            <Button variant="contained" style={{ whiteSpace: "nowrap" }} color="inherit" startIcon={<GitHub />} fullWidth>
                                Projects
                            </Button>
                        </StyledLink>
                        <StyledLink to={PathConstants.TECHSTACK} onClick={() => { isSmallScreen ? handleTogglePage() : null}}>
                            <Button variant="contained" style={{ whiteSpace: "nowrap" }} color="inherit" startIcon={<CodeOff />} fullWidth>
                                Tech Stack
                            </Button>
                        </StyledLink>
                        <StyledLink to={PathConstants.CONTACT} onClick={() => { isSmallScreen ? handleTogglePage() : null}}>
                            <Button variant="contained" style={{ whiteSpace: "nowrap" }} color="inherit" startIcon={<ChatRounded />} fullWidth>
                                Contact Me
                            </Button>
                        </StyledLink>
                    </Box>
                    <Box className="side-bar-footer">
                        <Box>
                            <SocialLinks 
                                size="medium"
                                variant="minimal"
                            />
                        </Box>
                        <p>Made with ❤️ by Dev2th3Core</p>
                        <p>Copy Right©️Dev2th3Core</p>
                    </Box>    
                </div>
            </GridBackground>
        </Box>
    )
}

export default Sidebar;