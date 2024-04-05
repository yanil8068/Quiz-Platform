import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/todoapp/actions";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  // function handleSignOut() {
  //   // if (confirm("Are you sure you want to log out?")) {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("sign is called");
  //       dispatch(setUser(null));
  //     })

  //     .catch((error) => {
  //       // An error happened.
  //       console.log(error);
  //     });
  // }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    handleClose();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUser(null));
        // Clear local storage
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <>
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
          <Button
            color="inherit"
            onClick={handleClickOpen}
            sx={{
              color: "inherit",
              "&:hover": { color: "green" },
              // marginRight: "10px",
              textTransform: "none",
              fontSize: { sm: "1.1rem", xs: "0.9rem" },
              padding: { sm: 1, xs: 0 },
            }}
          >
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignOut} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
