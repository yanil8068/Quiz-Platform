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

// import { useDispatch } from 'react-redux';
const styleforresponsive = {
  width: { xs: "5ch", sm: "10ch" },
  fontSize: { xs: "0.72rem", sm: "0.875rem", lg: "1.1rem" },
  padding: { xs: "2px", sm: "16px" },
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
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.operationsReducer);
  console.log("quiz", quiz);
  // Filter the quizzes where completed is true
  const completedQuizzes = quiz.filter((todo) => todo.completed);
  console.log("completedQuizzes", completedQuizzes[0].todo);
  // console.log(quiz)
  // Initialize state variable to store the selected value
  // Create an array to store all the questions

  // const [editTodoplay, setEditTodoplay] = useState('');
  // const [questionsplay, setQuestionsplay] = useState([]);
  // console.log(editTodoplay,questionsplay)

  const handleEditClickplay = (todo, event) => {
    if (isNameValid) {
      setTitle(todo.todo);
      setEditQuizplay(todo);
      setQuestionsplay(todo.questions);
      navigate("/Quiz");
    } else {
      alert("Please input a correct name.");
    }

    // event.preventDefault(); // Prevent default form submission
    // setEditTodoplay(todo);
    // setQuestionsplay(todo.questions);
    // navigate("/Quiz");
  };
  ////
  const [isNameValid, setIsNameValid] = useState(false);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(newName.length >= 5 && newName.length <= 50);
  };

  return (
    <Box
      component="form"
      onSubmit={(event) => event.preventDefault()} // Prevent form submission on Enter key press
      sx={{
        mt: 2,
        position: "absolute",
        // top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        width: { xs: "92%", md: "70%", lg: "60%" }, // Adjust width for different screen sizes
        bgcolor: "background.paper",
        p: 4,
        overflowY: "auto", // Enable vertical scrolling if needed
        fontSize: "1rem", // Default font size
        "@media (max-width:600px)": {
          width: "90%", // Adjust width for small screens
        },
        "@media (max-width:400px)": {
          width: "100%", // Adjust width for extra small screens
          fontSize: "0.72rem", // Font size for extra small screens (xs)
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
        fullWidth
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={styleforresponsive} align="center">
                Quiz no.
              </TableCell>
              <TableCell sx={styleforresponsive} align="center">
                Title
              </TableCell>
              <TableCell sx={styleforresponsive} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedQuizzes.map((todo) => (
              <TableRow
                key={todo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={styleforresponsive} align="center">
                  {todo.id}
                </TableCell>
                <TableCell sx={styleforresponsive} align="center">
                  {todo.todo}
                </TableCell>
                <TableCell sx={styleforresponsive} align="center">
                  <Button
                    variant="contained"
                    onClick={(event) => handleEditClickplay(todo, event)}
                  >
                    Play
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
