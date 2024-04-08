import FullPageLoader from "./FullPageLoader.jsx";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/todoapp/actions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Button, TextField, FormControl } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: "90%", xs: "70%" }, // Adjusted width for responsiveness
  maxWidth: 400, // Maximum width to maintain readability
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        dispatch(setUser({ id: user.uid, email: user.email }));
        //const uid = user.uid;
        // ...
      } else {
        dispatch(setUser(null));
        // User is signed out
        // ...
      }
      if (isLoading) {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    //console.log(userCredentials);
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");
    //console.log("signup");

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setError(error.message);
      // console.log(errorCode);
      //console.log(errorMessage);
      // ..
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setError(error.message);
    });
  }

  function handlePasswordReset(e) {
    const email = prompt("Please enter your email");
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Email sent! Check your inbox for password reset instructions");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;

          alert(error.message);
        });
      alert("Email sent! Check your inbox for password reset instructions");
    } else {
      alert("please fill in email");
    }
  }

  // console.log(auth);

  return (
    <>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <Box sx={style} className="container login-page">
          <Box>
            <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
              Welcome
            </Typography>
            <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
              Login or create an account to continue
            </Typography>

            <Box sx={{ textAlign: "center" }} className="login-type">
              <Button
                className={`btn ${loginType == "login" ? "selected" : ""}`}
                onClick={() => setLoginType("login")}
              >
                Login
              </Button>
              <Button
                className={`btn ${loginType == "signup" ? "selected" : ""}`}
                onClick={() => setLoginType("signup")}
              >
                Signup
              </Button>
            </Box>

            <FormControl
              sx={{
                width: { sm: "60%", xs: "90%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: "20px auto",
              }}
              component="form"
            >
              <Box className="form-control">
                {loginType == "login" ? (
                  <Box sx={{ m: 1 }} fullWidth>
                    Login Form:{" "}
                  </Box>
                ) : (
                  <Box sx={{ m: 1 }} fullWidth>
                    Sign Up Form :
                  </Box>
                )}
                <TextField
                  onChange={(e) => {
                    handleCredentials(e);
                  }}
                  type="text"
                  name="email"
                  label={`Enter your email`}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2, marginLeft: "8px" }}
                />
              </Box>
              <Box className="form-control">
                <TextField
                  onChange={(e) => {
                    handleCredentials(e);
                  }}
                  type="password"
                  name="password"
                  label={`Enter your password`}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2, marginLeft: "8px" }}
                />
              </Box>
              {loginType == "login" ? (
                <Button
                  onClick={(e) => {
                    handleLogin(e);
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    handleSignup(e);
                  }}
                >
                  Sign Up
                </Button>
              )}
              {error && <Box className="error">{error}</Box>}

              <Typography
                onClick={(e) => {
                  handlePasswordReset(e);
                }}
                variant="h6"
                gutterBottom
              >
                Forgot Password?
              </Typography>
            </FormControl>
          </Box>
        </Box>
      )}
    </>
  );
}

export default LoginPage;
