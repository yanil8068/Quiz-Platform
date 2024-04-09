import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import newQuizImg from "../assets/createquiz.png";
import myQuizzesImg from "../assets/myquizzes.png";
import playquiz from "../assets/PlayQuiz.png";

const Home = () => {
  useEffect(() => {
    // Check if quiz data exists in local storage
    const existingQuizData = localStorage.getItem("quizzes");
    if (!existingQuizData) {
      // If no quiz data exists, initialize with default data
      const defaultQuizData = [
        {
          id: 1,
          todo: "Buy Laptop",
          completed: true,
          description: "Need to buy a new laptop for work.",
          creattime: "1/4/2024 3:35: PM",
          questions: [
            {
              question: "Which brand are you considering?",
              answerOptions: [
                { answer: "Brand A", checked: true },
                { answer: "Brand B", checked: false },
                { answer: "Brand C", checked: false },
              ],
            },
            {
              question: "What is your budget range?",
              answerOptions: [
                { answer: "Under $500", checked: false },
                { answer: "$500 - $1000", checked: true },
                { answer: "Over $1000", checked: false },
              ],
            },
            {
              question: "Why is your something?",
              answerOptions: [
                { answer: "Under $50", checked: false },
                { answer: "$500 - $100", checked: false },
                { answer: "Over $100", checked: true },
              ],
            },
            {
              question: " is your something?",
              answerOptions: [
                { answer: "Under $50", checked: false },
                { answer: "$500 - $100", checked: false },
                { answer: "Over $100", checked: true },
              ],
            },
            {
              question: "your is your something?",
              answerOptions: [
                { answer: "Under $50", checked: false },
                { answer: "$500 - $100", checked: false },
                { answer: "Over $100", checked: true },
              ],
            },
            {
              question: "something is your something?",
              answerOptions: [
                { answer: "Under $50", checked: false },
                { answer: "$500 - $100", checked: false },
                { answer: "Over $100", checked: true },
              ],
            },
          ],
        },
        {
          id: 2,
          todo: "Master Redux",
          completed: false,
          description: "Learn Redux for state management.",
          creattime: "1/4/2024 3:35: PM",
          questions: [
            {
              question: "What is Redux?",
              answerOptions: [
                {
                  answer:
                    "A state management library for JavaScript applications.",
                  checked: true,
                },
                { answer: "A database management system.", checked: false },
                { answer: "A programming language.", checked: false },
              ],
            },
            {
              question: "What is your budget range?",
              answerOptions: [
                { answer: "Under $500", checked: false },
                { answer: "$500 - $1000", checked: true },
                { answer: "Over $1000", checked: false },
              ],
            },
          ],
        },
        {
          id: 3,
          todo: "Watering here",
          completed: true,
          description: "Water the plants in the garden.",
          creattime: "1/4/2024 3:35: PM",
          questions: [
            {
              question: "How often do you water the plants?",
              answerOptions: [
                { answer: "Once a day", checked: false },
                { answer: "Twice a day", checked: false },
                { answer: "Every other day", checked: true },
              ],
            },
          ],
        },
      ];
      // Save default quiz data to local storage
      localStorage.setItem("quizzes", JSON.stringify(defaultQuizData));
    }
  }, []);

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
      }}
    >
      {/* card for create quiz */}
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

      {/* card for My quizzes */}
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

      {/* card for Play quiz */}
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
