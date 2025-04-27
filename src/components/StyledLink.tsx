import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  // "&:hover": {
  //   color: theme.palette.primary.main,
  // },
}));

export default StyledLink; 