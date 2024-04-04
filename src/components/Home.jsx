import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  // Backdrop,
  // Modal,
  // Fade,
  // Radio,
  // RadioGroup,
  // FormControlLabel,
  // FormControl,
  // FormLabel,
} from "@mui/material";
import newQuizImg from "../assets/createquiz.png";
import myQuizzesImg from "../assets/myquizzes.png";
import playquiz from "../assets/PlayQuiz.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: "10vh",
        p: 2,
        pt: "1vh",
        minHeight: "100vh",
        // backgroundColor: "pink",
      }}
    >
      <Card sx={{ width: { xs: "90%", md: "45%" }, overflow: "visible" }}>
        <CardActionArea component={Link} to="/new">
          <CardMedia
            component="img"
            image={newQuizImg}
            alt="New Quiz"
            sx={{ width: "100%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>

      <Card sx={{ width: { xs: "90%", md: "45%" }, overflow: "visible" }}>
        <CardActionArea component={Link} to="/quizzes">
          <CardMedia
            component="img"
            image={myQuizzesImg}
            alt="My Quizzes"
            sx={{ width: "100%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>

      <Card sx={{ width: { xs: "90%", md: "45%" }, overflow: "visible" }}>
        <CardActionArea component={Link} to="/PlayQuizHome">
          <CardMedia
            component="img"
            image={playquiz}
            alt="My Quizzes"
            sx={{ width: "100%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Home;
