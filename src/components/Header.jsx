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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        display: { xs: "block", sm: "block", md: "none" },
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Button
          sx={{ m: 2, p: 2, color: "black" }}
          component={Link}
          to="/"
          fullWidth
        >
          Home
        </Button>
        <Button
          sx={{ m: 2, p: 2, color: "black" }}
          component={Link}
          to="/quizzes"
          fullWidth
        >
          My Quizzes
        </Button>
        <Button
          sx={{ m: 2, p: 2, color: "black" }}
          component={Link}
          to="/PlayQuizHome"
          fullWidth
        >
          Play Quiz
        </Button>
        <Button
          sx={{ m: 2, p: 2, color: "black" }}
          onClick={handleClickOpen}
          fullWidth
        >
          Logout
        </Button>
      </List>
      <Divider />
    </Box>
  );

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
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: "inherit",
                "&:hover": { color: "green" },
                marginRight: "10px",
                textTransform: "none",
                fontSize: { sm: "1.1rem", xs: "0.7rem" },
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
                fontSize: { sm: "1.1rem", xs: "0.7rem" },
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
                fontSize: { sm: "1.1rem", xs: "0.7rem" },
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
                fontSize: { sm: "1.1rem", xs: "0.7rem" },
                padding: { sm: 1, xs: 0 },
              }}
            >
              logout
            </Button>
          </Box>
          {/* sm downbar */}
          <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
            <div>
              {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon />
                  </Button>
                  <Drawer
                    sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </Box>

          {/* sm downbar */}
        </Toolbar>
      </AppBar>
      <Dialog
        sx={{ width: "100%" }}
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
