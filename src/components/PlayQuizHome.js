import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const styleforresponsive = {
  width: { xs: "5ch", sm: "10ch" },
  fontSize: { xs: "0.72rem", sm: "0.875rem", lg: "1.1rem" },
  padding: { xs: "2px", sm: "16px" },
};

const styleforresponsiveThead = {
  width: { xs: "5ch", sm: "10ch" },
  fontSize: { xs: "0.72rem", sm: "0.875rem", lg: "1.1rem" },
  padding: { xs: "2px", sm: "16px" },
  fontWeight: "700",
};

const PlayQuizHome = ({
  name,
  setName,
  editQuizplay,
  setEditQuizplay,
  questionsplay,
  setQuestionsplay,
  setTitle,
}) => {
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.operationsReducer);
  //console.log("quiz", quiz);
  // Filter the quizzes where completed is true
  const completedQuizzes = quiz.filter((todo) => todo.completed);
  // console.log("completedQuizzes", completedQuizzes[0].todo);
  // console.log(quiz)
  // Initialize state variable to store the selected value
  // Create an array to store all the questions
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameError, setNameError] = useState("");

  //when click on Start quiz
  const handleEditClickplay = (todo, event) => {
    if (isNameValid) {
      setTitle(todo.todo);
      setEditQuizplay(todo);
      setQuestionsplay(todo.questions);
      navigate("/Quiz");
    } else {
      setNameError("Please input a correct name.");
    }
  };

  //for textfield of Name
  const handleNameChange = (e) => {
    const newName = e.target.value;
    //setting new name value
    setName(newName);
    //Validation for name
    setIsNameValid(newName.length >= 5 && newName.length <= 50);
  };
  ////4.to get data from local storage and show here so it also do not get vanished when refreshed
  const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const existingCompletedQuizzes = existingQuizzes.filter(
    (todo) => todo.completed
  );
  ////////4.end

  return (
    <Box
      component="form"
      onSubmit={(event) => event.preventDefault()} // Prevent form submission on Enter key press
      sx={{
        display: "flex",
        justifyContent: { sm: "flex-start", md: "center" },
        alignItems: "center",
        minHeight: "90vh",
        flexDirection: "column",

        boxShadow: 24,

        bgcolor: "background.paper",

        p: 4,
        overflowY: "auto", // Enable vertical scrolling if needed
        fontSize: "1rem", // Default font size
        "@media (max-width:600px)": {
          //width: "90%", // Adjust width for small screens
        },
        "@media (max-width:400px)": {
          //width: "80%", // Adjust width for extra small screens
          fontSize: "0.73rem", // Font size for extra small screens (xs)
        },
        "@media (max-width:350px)": {
          // width: "100%", // Adjust width for extra small screens
          fontSize: "0.73rem", // Font size for extra small screens (xs)
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={handleNameChange}
        sx={{
          mb: 2,
          width: { xs: "92%", md: "75%", lg: "50%" },
        }}
      />
      {nameError ? <Box sx={{ color: "red" }}>{nameError}</Box> : ""}
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          alignContent: "center",
          minWidth: 300,
          width: { xs: "92%", md: "75%", lg: "50%" },
        }}
        component={Paper}
      >
        <Table aria-label="simple table" sx={{ border: "2px solid black" }}>
          <TableHead sx={{ border: "2px solid black" }}>
            <TableRow>
              <TableCell sx={styleforresponsiveThead} align="center">
                Quiz no.
              </TableCell>
              <TableCell sx={styleforresponsiveThead} align="center">
                Title
              </TableCell>
              <TableCell sx={styleforresponsiveThead} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* mapping on quiz that is stored in local storage */}
            {existingCompletedQuizzes.map((todo, index) => (
              <TableRow
                key={todo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={styleforresponsive} align="center">
                  {index + 1}
                </TableCell>
                <TableCell sx={styleforresponsive} align="center">
                  {todo.todo}
                </TableCell>
                <TableCell sx={styleforresponsive} align="center">
                  <Button
                    sx={{
                      textTransform: "none",
                      padding: { sm: "1px", md: "16px" },
                    }}
                    variant="contained"
                    onClick={(event) => handleEditClickplay(todo, event)}
                  >
                    Start Quiz
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayQuizHome;

// name=> handleNameChange => startquiz => handleEditClickplay => navigate to PlayQuiz i.e. /Quiz
