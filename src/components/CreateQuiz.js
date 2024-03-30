import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Backdrop,
  Modal,
  Fade,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addQuiz } from "../redux/todoapp/actions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted width for responsiveness
  maxWidth: 400, // Maximum width to maintain readability
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Form = ({ editFormVisibility }) => {
  const [questions, setQuestions] = useState([]);
  const [quizValue, setQuizValue] = useState("");
  const [description, setDescription] = useState("");
  const [answerOptionInputs, setAnswerOptionInputs] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleMcq, setSingleMcq] = useState(true);

  const [openn, setOpenn] = useState(false);
  const [selectedOption, setSelectedOption] = useState(); // Default value for RadioGroup
  const [titleError, setTitleError] = useState("");

  const handleClosee = () => setOpenn(false);

  const handleRadioChangee = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "MCQ(Single Correct)") {
      handleClosee();
    } else {
      setSingleMcq(false);
      handleClosee();
    }
  };

  useEffect(() => {
    setOpenn(true); // Ensure the modal is open when the component mounts
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    let time = date.getTime();

    // validation logic...

    // Validation logic for title
    if (quizValue.length < 10 || quizValue.length > 30) {
      setTitleError("Title must be between 10 and 30 characters long.");
      return; // Stop execution if validation fails
    } else {
      setTitleError(""); // Clear error message if title is valid
    }

    // Validation logic for description
    if (description.length < 10 || description.length > 300) {
      setTitleError("Description must be between 10 and 300 characters long.");
      return; // Stop execution if validation fails
    } else {
      setTitleError(""); // Clear error message if description is valid
    }

    // Validation logic for questions
    const questionLengthValid = questions.every(
      (question) =>
        question.question.length >= 10 && question.question.length <= 200
    );

    if (!questionLengthValid) {
      setTitleError("Questions must be between 10 and 200 characters long.");
      return; // Stop execution if any question validation fails
    }

    // Validation logic for answer options count
    const answerOptionsValid = questions.every(
      (question) => question.answerOptions.length >= 2
    );

    if (!answerOptionsValid) {
      setTitleError("At least two options required to save a question.");
      return; // Stop execution if any question has less than two options
    }

    // Validation logic for answer options not being empty
    const answerOptionsNotEmpty = questions.every((question) =>
      question.answerOptions.every((option) => option.answer.trim() !== "")
    );

    if (!answerOptionsNotEmpty) {
      setTitleError("Answer options cannot be empty.");
      return; // Stop execution if any answer option is empty
    }

    const allQuestions = questions.map((question) => {
      const answerOptions = question.answerOptions.map((option, index) => ({
        answer: option.answer,
        checked: question.correctAnswerIndex === index,
      }));

      return {
        question: question.question,
        answerOptions: answerOptions,
      };
    });

    let todoObj = {
      id: time,
      todo: quizValue,
      description: description,
      questions: allQuestions,
      completed: true,
    };

    setQuizValue("");
    setDescription("");
    setQuestions([]);
    setAnswerOptionInputs([]);
    dispatch(addQuiz(todoObj));
    handleClosee(); // Close the modal after submitting
    handleOpen();
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answerOptions: [] }]);
    setAnswerOptionInputs([...answerOptionInputs, ""]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAddAnswerOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    const updatedAnswerOptions = [
      ...updatedQuestions[questionIndex].answerOptions,
    ];
    updatedAnswerOptions.push({ answer: answerOptionInputs[questionIndex] });
    updatedQuestions[questionIndex].answerOptions = updatedAnswerOptions;
    setQuestions(updatedQuestions);

    // Clear the input field value for the current question index
    const updatedInputs = [...answerOptionInputs];
    updatedInputs[questionIndex] = ""; // Resetting the value to an empty string
    setAnswerOptionInputs(updatedInputs);

    // setAnswerOptionInputs([...answerOptionInputs, ""]);
  };

  const handleAnswerOptionInputChange = (index, e) => {
    const updatedInputs = [...answerOptionInputs];
    updatedInputs[index] = e.target.value;
    setAnswerOptionInputs(updatedInputs);
  };

  const handleRadioChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleDeleteAnswerOption = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answerOptions.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const close = () => {
    handleClose();
    navigate("/");
  };

  return (
    <Box>
      {titleError && <Box style={{ color: "red" }}>{titleError}</Box>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openn}
        // onClose={handleClosee}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openn}>
          <Box sx={style}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Select Question Type
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedOption}
                onChange={handleRadioChangee}
              >
                <FormControlLabel
                  value="MCQ(Single Correct)"
                  control={<Radio />}
                  label="MCQ(Single Correct)"
                />
                <FormControlLabel
                  value="MCQ(Multi Correct)"
                  control={<Radio />}
                  label="MCQ(Multi Correct)"
                />
                <FormControlLabel
                  value="ShortAnswer(with 2 words)"
                  control={<Radio />}
                  label="Short Answer (with 2 words)"
                />
                <FormControlLabel
                  value="Description(with 2 or 4 sentences)"
                  control={<Radio />}
                  label="Description (with 2 or 4 sentences)"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
      {/*  */}
      {singleMcq && (
        // <form
        //   onSubmit={handleSubmit}
        //   style={{
        //     width: "60%",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     flexDirection: "column",
        //     margin: "20px auto",
        //   }}
        // >
        <FormControl
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "20px auto",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <FormGroup sx={{ width: "100%" }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              rows={1}
              sx={{ mb: 2 }}
              value={quizValue}
              onChange={(e) => setQuizValue(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {questions.map((question, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <TextField
                  label={`Question ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  sx={{ mb: 2 }}
                />
                {question.answerOptions.map((option, answerIndex) => (
                  <Box key={answerIndex}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      {/* <input
                      type="radio"
                      name={`question-${index}`} // Use index to ensure each group is unique per question
                      checked={question.correctAnswerIndex === answerIndex}
                      onChange={() => handleRadioChange(index, answerIndex)}
                    /> */}
                      <IconButton
                        onClick={() => handleRadioChange(index, answerIndex)}
                        color={
                          question.correctAnswerIndex === answerIndex
                            ? "primary"
                            : "default"
                        }
                      >
                        {question.correctAnswerIndex === answerIndex ? (
                          <CheckCircleIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </IconButton>

                      <TextField
                        label={`Answer Option ${answerIndex + 1}`}
                        variant="outlined"
                        fullWidth
                        value={option.answer}
                        sx={{ mb: 2, marginLeft: "8px" }}
                        disabled
                      />
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleDeleteAnswerOption(index, answerIndex)
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
                <Box style={{ display: "flex", alignItems: "flex-start" }}>
                  <TextField
                    label="Add Answer Option"
                    variant="outlined"
                    fullWidth
                    value={answerOptionInputs[index]}
                    onChange={(e) => handleAnswerOptionInputChange(index, e)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => handleAddAnswerOption(index)}
                  >
                    Add Answer Option
                  </Button>
                </Box>
              </Box>
            ))}

            <Button variant="outlined" onClick={handleAddQuestion}>
              Add Question
            </Button>
            <br />
            <Button
              sx={{
                mt: "2",
                width: "10rem",
              }}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Questions created successfully
                </Typography>
                <Button onClick={() => navigate("/quizzes")}>
                  View all Questions
                </Button>
                <Button onClick={close}>Close</Button>
              </Box>
            </Modal>
            {/* </form> */}
          </FormGroup>
        </FormControl>
      )}
      {!singleMcq && <div>This function is currently not working</div>}
    </Box>
  );
};

export default Form;
