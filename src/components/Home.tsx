import { Box } from "@mui/material"
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface HomeProps {
    showSidebar: boolean;
    toggleDarkTheme: () => void;
    handleTogglePage: () => void;
}
  

const Home = ({ showSidebar, toggleDarkTheme, handleTogglePage }: HomeProps) => {

    return(
        <Box className={ showSidebar ? "home-mini" : "home-full"} sx={{ overflow: 'hidden' }}>
            <Navbar showSidebar={showSidebar} toggleDarkTheme={toggleDarkTheme} handleTogglePage={handleTogglePage} />
            <Outlet/>
        </Box>
    )
}

export default Home;