import { Box, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PathConstants from "../routes/pathConstants";

const Page404 = () => {
    // applying the primary and secondary theme colors
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return(
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Box sx={{ margin: "0 auto", width: "100vw"}}>
                <Typography variant="h1">
                    404
                </Typography>
                <Typography variant="h5">OOPS! Page Not Found.</Typography>
                <Link to={PathConstants.ABOUT}>Go to Home Page
                </Link>
            </Box>
        </ThemeProvider>
    )
}

export default Page404;