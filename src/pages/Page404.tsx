import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PathConstants from "../routes/pathConstants";

const Page404 = () => {
    return(
        <Box sx={{ margin: "0 auto"}}>
            <Typography variant="h1">
                404
            </Typography>
            <h1>OOPS! Page Not Found.</h1>
            <Link to={PathConstants.ABOUT}>Go to Home Page
            </Link>
        </Box>
    )
}

export default Page404;