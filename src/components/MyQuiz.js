import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  deleteQuestion,
  toggleQuizCompleted,
} from "../redux/todoapp/actions";
import {
  Button,
  TextField,
  IconButton,
  FormControl,
  FormGroup,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const styleforresponsive = {
  width: { xs: "5ch", sm: "10" },
  fontSize: { xs: "0.72rem", sm: "0.875rem", lg: "1.1rem" },
  padding: { xs: "7px", sm: "16px" },
  textAlign: "center",
};

const styleforresponsiveThead = {
  width: { xs: "5ch", sm: "10" },
  fontSize: { xs: "0.72rem", sm: "0.875rem", lg: "1.1rem" },
  padding: { xs: "7px", sm: "16px" },
  textAlign: "center",
  fontWeight: 700,
};

const styleforresponsiveIconEdit = {
  width: { xs: "5ch", sm: "10" },
  fontSize: { xs: "0.875rem", sm: "1.1rem", lg: "1.3rem" },
  padding: { xs: "7px", sm: "16px" },
  textAlign: "center",
  color: "#1976d2",
};

const styleforresponsiveIconDelete = {
  width: { xs: "5ch", sm: "10" },
  fontSize: { xs: "0.875rem", sm: "1.1rem", lg: "1.3rem" },
  padding: { xs: "7px", sm: "16px" },
  textAlign: "center",
  color: "red",
};

const MyQuiz = ({
  handleDeleteQuestion,
  handleEditClick,
  editFormVisibility,
  setEditFormVisibility,
  cancelUpdate,
  editSubmit,
  editValue,
  setEditValue,
  editDes,
  setEditDes,
  questions,
  setQuestions,
  handleQuestionChangeE,
  handleAnswerOptionChangeE,

  switchvalue,
  setswitchvalue,
  editError,
  atLeastOneCorrectAnswerEdit,
  setAtLeastOneCorrectAnswerEdit,
  errInEdit,
  setErrInEdit,
}) => {
  useEffect(() => {
    setAtLeastOneCorrectAnswerEdit(true);
  }, []);
  const dispatch = useDispatch();

  //when click on delete icon on edit form for a particular question
  //  Function to delete a question and its answer options
  const handleDeleteQuestionAndDispatch = (questionIndex, id) => {
    // Dispatch the deleteQuestion action to delete from redux store
    dispatch(deleteQuestion(questionIndex));
    // Call the handleDeleteQuestion function to delete the question locally in the component that is in Questions array
    handleDeleteQuestion(questionIndex);
  };

  //when Add Question button is clicked in edit form
  const handleAddQuestion = () => {
    setAtLeastOneCorrectAnswerEdit(false);
    //validation for selecting one correct answer
    if (!atLeastOneCorrectAnswerEdit) {
      return setErrInEdit("select atleast one correct answer");
    } else {
      //adding empty question in questions array
      setQuestions([
        ...questions,
        { question: "", answerOptions: [{ answer: "", checked: false }] },
      ]);
    }
  };

  //when we click on add answer button in edit form for a particular question
  const handleAddAnswerOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    //validation for answer option count
    const currentAnswerOptionsCount =
      updatedQuestions[questionIndex].answerOptions.length;

    // Check if the current number of answer options is less than 4
    if (currentAnswerOptionsCount < 4) {
      updatedQuestions[questionIndex].answerOptions.push({
        //passing an object when answer as empty string and checked as false
        answer: "",
        checked: false,
      });
      //updating Questions with added value
      setQuestions(updatedQuestions);
    } else {
      // Display a message to the user indicating the maximum limit is reached
      setErrInEdit("Maximum 4 answer options are allowed.");
    }
  };

  const handleToggleCompleted = (id) => {
    // Dispatch an action to toggle the completed status in the Redux store
    dispatch(toggleQuizCompleted(id));

    // Update the local storage
    const existingQuizzess = JSON.parse(localStorage.getItem("quizzes")) || [];
    const updatedQuizzess = existingQuizzess.map((quiz) => {
      if (quiz.id === id) {
        // Toggle the completed status for the matching quiz
        return {
          ...quiz,
          completed: !quiz.completed,
        };
      }
      return quiz;
    });
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzess));
  };

  //when we click on radio in edit form, it is making the clicked radio as correct answer and all other answer options in that particular question as incorrect answer
  const handleCheckboxChangeE = (questionIndex, answerIndex) => {
    // Create a copy of the questions array
    const updatedQuestions = questions.map((question, index) => {
      // If the current question matches the question index
      if (index === questionIndex) {
        // Update the answer options for this question
        return {
          ...question,
          answerOptions: question.answerOptions.map((option, i) => ({
            ...option,
            checked: i === answerIndex, // Set checked to true only for the selected option
          })),
        };
      }
      setAtLeastOneCorrectAnswerEdit(true);
      // For other questions, keep their answer options unchanged
      return question;
    });

    // Update the state with the modified questions array
    setQuestions(updatedQuestions);
  };

  const todos = useSelector((state) => state.operationsReducer);
  //console.log(todos);

  ///for modal of delete
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ////3.getting hold of the quizzes to show on table : working fine
  const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  return (
    <>
      {editFormVisibility === false ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "flex-start", md: "center" },
            alignItems: "center",
            minHeight: "85vh",
            flexDirection: "column",

            bgcolor: "background.paper",

            boxShadow: 24,
            p: 4,

            fontSize: "1rem", // Default font size
          }}
        >
          <Typography
            variant="button"
            component={Link}
            to="/new"
            display="block"
            gutterBottom
            sx={{
              textAlign: "right",
              width: { xs: "100%", md: "75%", lg: "50%" },
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Create new Quiz
          </Typography>
          <TableContainer
            sx={{
              overflow: "auto",
              border: "2px solid grey",
              width: { xs: "100%", md: "75%", lg: "50%" },
            }}
            component={Paper}
          >
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead sx={{ borderBottom: "2px solid black" }}>
                <TableRow>
                  <TableCell sx={styleforresponsiveThead}>Quiz no.</TableCell>
                  <TableCell sx={styleforresponsiveThead} align="right">
                    Title
                  </TableCell>
                  <TableCell sx={styleforresponsiveThead} align="right">
                    Status
                  </TableCell>
                  <TableCell sx={styleforresponsiveThead} align="right">
                    Created on
                  </TableCell>
                  <TableCell sx={styleforresponsiveThead} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {existingQuizzes.map((todo, index) => (
                  <TableRow
                    key={todo.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={styleforresponsive} align="right">
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={styleforresponsive}
                      align="right"
                      onClick={() => handleEditClick(todo)}
                    >
                      {todo.todo}
                    </TableCell>
                    <TableCell sx={styleforresponsive} align="right">
                      {todo.completed ? "Active" : "Inactive"}
                      <Switch
                        sx={{
                          fontSize: { xs: "0.72rem", sm: "0.875rem" },
                        }}
                        checked={todo.completed}
                        onChange={() => handleToggleCompleted(todo.id)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell sx={styleforresponsive} align="right">
                      {todo.creattime}
                    </TableCell>
                    <TableCell sx={styleforresponsive} align="right">
                      {editFormVisibility === false && (
                        <>
                          <BorderColorIcon
                            sx={styleforresponsiveIconEdit}
                            onClick={() => handleEditClick(todo)}
                          />
                          <DeleteIcon
                            sx={styleforresponsiveIconDelete}
                            onClick={handleOpen}
                          />
                          <Modal
                            open={open}
                            // onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: {
                                  xs: "70%",
                                  sm: "75%",
                                  md: "60%",
                                  lg: "50%",
                                }, // Adjust width for different screen sizes
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                                overflowY: "auto",
                                maxHeight: "90vh", // Limit the maximum height to 90% of the viewport height
                                maxWidth: "90vw", // Limit the maximum width to 90% of the viewport width
                              }}
                            >
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{
                                  mb: 2,
                                  fontSize: {
                                    xs: "1rem",
                                    sm: "1.2rem",
                                    lg: "1.5rem",
                                  }, // Adjust font size for different screen sizes
                                }}
                              >
                                Are you sure you want to delete
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{
                                  mt: "2",
                                  fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    lg: "1.2rem",
                                  }, // Adjust font size for different screen sizes
                                }}
                              >
                                deleting this will result in deleteing this file
                                permanently and will not be recoverable
                              </Typography>
                              <Button
                                onClick={() => {
                                  // Update the local storage
                                  const existingQuizzesDelete =
                                    JSON.parse(
                                      localStorage.getItem("quizzes")
                                    ) || [];
                                  const updatedQuizzesDelete =
                                    existingQuizzesDelete.filter(
                                      (quiz) => quiz.id !== todo.id
                                    );
                                  localStorage.setItem(
                                    "quizzes",
                                    JSON.stringify(updatedQuizzesDelete)
                                  );

                                  dispatch(removeTodo(todo.id));
                                  handleClose(); // Close the modal after deleting the quiz
                                }}
                                sx={{
                                  mt: 2,
                                  fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    lg: "1.2rem",
                                  }, // Adjust font size for different screen sizes
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                sx={{
                                  mt: 2,
                                  fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    lg: "1.2rem",
                                  }, // Adjust font size for different screen sizes
                                }}
                                onClick={handleClose}
                              >
                                No
                              </Button>
                            </Box>
                          </Modal>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        // this model opened when click on edit icon to edit that particular quiz, when editFormVisibility is true
        <Modal
          open={editFormVisibility}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" }, // Adjust width for different screen sizes
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: { sm: 4, xs: 2 },
              overflowY: "auto",
              maxHeight: "90vh", // Limit the maximum height to 90% of the viewport height
              maxWidth: "90vw", // Limit the maximum width to 90% of the viewport width
            }}
          >
            <FormControl
              sx={{ width: "100%" }}
              component="form"
              onSubmit={editSubmit}
            >
              <FormGroup sx={{ width: "100%" }}>
                {/* <form onSubmit={editSubmit}> */}
                {/* {editError && <Box style={{ color: "red" }}>{editError}</Box>} */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <CloseIcon onClick={cancelUpdate} />
                </Box>

                <Typography sx={{ textAlign: "center" }} component="h5">
                  Update your Quiz
                </Typography>

                <Box>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={editValue || ""}
                    onChange={(e) => setEditValue(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={editDes || ""}
                    onChange={(e) => setEditDes(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {questions.map((question, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        p: { sm: 3, xs: 1.5 },
                        border: "2px solid grey",
                      }}
                    >
                      <TextField
                        label={`Question ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChangeE(index, e.target.value)
                        }
                        sx={{ mb: 2 }}
                      />
                      {question.answerOptions.map((option, answerIndex) => (
                        <Box key={answerIndex} sx={{ mb: 2, display: "flex" }}>
                          <IconButton
                            onClick={() =>
                              handleCheckboxChangeE(index, answerIndex)
                            }
                          >
                            {/* changing the color of the radio based on wheather the option is correct or not */}
                            {option.checked ? (
                              <CheckCircleIcon sx={{ color: "#008DDA" }} />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </IconButton>
                          <TextField
                            label={`Answer Option ${answerIndex + 1}`}
                            variant="outlined"
                            fullWidth
                            value={option.answer}
                            onChange={(e) =>
                              handleAnswerOptionChangeE(
                                index,
                                answerIndex,
                                e.target.value
                              )
                            }
                          />
                        </Box>
                      ))}
                      <Button
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                        onClick={() => handleAddAnswerOption(index)}
                      >
                        Add Answer
                      </Button>
                      <br />
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleDeleteQuestionAndDispatch(index, question.id)
                        }
                      >
                        <DeleteIcon variant="contained" />
                      </Button>
                    </Box>
                  ))}

                  <Button sx={{ mb: 2 }} onClick={handleAddQuestion}>
                    Add Question
                  </Button>
                  <br />
                  {editError && <Box style={{ color: "red" }}>{editError}</Box>}
                  {!editError && errInEdit && (
                    <Box style={{ color: "red" }}>{errInEdit}</Box>
                  )}
                  <Button sx={{ mb: 2 }} variant="contained" type="submit">
                    UPDATE
                  </Button>
                  <br />
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MyQuiz;

// edit =>handleEditClick=> editform =>{setEditValue,setEditDes,handleQuestionChangeE,handleCheckboxChangeE,handleAnswerOptionChangeE,handleAddAnswerOption, handleDeleteQuestionAndDispatch , handleAddQuestion   }  => update =>editSubmit=> delete=> setOpen(formodal)=> dispatchonclick
