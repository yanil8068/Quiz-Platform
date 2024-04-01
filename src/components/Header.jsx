import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} alt="Logo" style={{ height: "60px" }} />
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            "&:hover": { color: "green" },
            marginRight: "10px",
            textTransform: "none",
            fontSize: { sm: "1.1rem", xs: "0.9rem" },
            padding: { sm: 1, xs: 0 },
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/quizzes"
          sx={{
            color: "inherit",
            "&:hover": { color: "green" },
            marginRight: "10px",
            textTransform: "none",
            fontSize: { sm: "1.1rem", xs: "0.9rem" },
            padding: { sm: 1, xs: 0 },
          }}
        >
          My Quizzes
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/PlayQuizHome"
          sx={{
            color: "inherit",
            "&:hover": { color: "green" },
            // marginRight: "10px",
            textTransform: "none",
            fontSize: { sm: "1.1rem", xs: "0.9rem" },
            padding: { sm: 1, xs: 0 },
          }}
        >
          playquiz
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
