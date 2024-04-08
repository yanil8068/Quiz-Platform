import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Backdrop,
  Modal,
  Fade,
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
import DeleteIcon from "@mui/icons-material/Delete";

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

const CreateQuiz = ({ editFormVisibility }) => {
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
  const [atLeastOneCorrectAnswer, setAtLeastOneCorrectAnswer] = useState(false);

  const handleClosee = () => setOpenn(false);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    if (option === "MCQ(Single Correct)") {
      handleClosee();
    } else {
      setSingleMcq(false);
      handleClosee();
    }
  };

  useEffect(() => {
    setOpenn(true); // Ensure the modal is open when the component mounts

    setAtLeastOneCorrectAnswer(true);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation for correct answer selected
    if (!atLeastOneCorrectAnswer) {
      return alert("select atleast one correct answer");
    }
    //to create data and time of creation
    let date = new Date();
    let time = date.getTime();
    // Get date components
    let day = date.getDate();
    let month = date.getMonth() + 1; // Month starts from 0
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    let createdTime =
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      " " +
      amPM;

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

    //For each question in the questions array, a new object representing the question is created.
    const allQuestions = questions.map((question) => {
      //allQuestions is array of opjects. objects are each question that have question as key amd answerOptions as key. question have string value of question, answerOptions is array of answer options of particular question, answerOptions is array of objects. in this object have answer as key which have string value and cheked as key which have boolean value to store wheather this particular answer option is correct or not.
      // mapping in all answer options

      const answerOptions = question.answerOptions.map((option, index) => ({
        //Each answer option is transformed into an object containing:
        //answer: The text of the answer option.
        //checked: A boolean indicating whether the answer option is the correct answer.
        //This information is determined by comparing the index of the answer option with the correctAnswerIndex stored in the question object.
        answer: option.answer,
        checked: question.correctAnswerIndex === index,
      }));

      // The outer map function returns an array of question objects.
      // Each question object contains :
      // question: The text of the question.
      // answerOptions: An array of objects representing the answer options, as described above.
      return {
        question: question.question,
        answerOptions: answerOptions,
      };
    });

    console.log("allquestions", allQuestions);
    let todoObj = {
      id: time,
      todo: quizValue,
      description: description,
      questions: allQuestions,
      completed: true,
      creattime: createdTime,
    };

    setQuizValue("");
    setDescription("");
    setQuestions([]);
    setAnswerOptionInputs([]);
    dispatch(addQuiz(todoObj));

    ////// //1. Save data to local storage
    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const updatedQuizzes = [...existingQuizzes, todoObj];
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

    handleClosee(); // Close the modal after submitting
    handleOpen();
  };
  console.log(atLeastOneCorrectAnswer);
  //console.log("answeroptionsinput", answerOptionInputs); on load of page answerOptionInputs is empty then when we write anything in it , it gets that value and when we click on add answer options it again become empty with an empty string.
  //on click of Add question
  const handleAddQuestion = () => {
    //to make the add question button disable and get enable only when we select one correct answer
    setAtLeastOneCorrectAnswer(false);
    if (!atLeastOneCorrectAnswer) {
      return alert("select atleast one correct answer");
    } else {
      // a new question object is added to the questions array.  spreading the existing questions array and appending the new question object.
      setQuestions([...questions, { question: "", answerOptions: [] }]);
      // an empty string is added to the added in answerOptionsInputs.
      //This array maintains the input values for answer options corresponding to each question.
      setAnswerOptionInputs([...answerOptionInputs, ""]);
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAddAnswerOption = (questionIndex) => {
    // a copy of the current questions array is created using the spread operator ([...]).
    const updatedQuestions = [...questions];
    //Then, a copy of the answer options array for the specified question is created.
    const updatedAnswerOptions = [
      ...updatedQuestions[questionIndex].answerOptions,
    ];
    //A new answer option object is pushed into the copied array. The content of this new answer option object typically comes from the answerOptionInputs array at the specified questionIndex.
    updatedAnswerOptions.push({ answer: answerOptionInputs[questionIndex] });
    //The updated answer options array is assigned back to the corresponding question in the copied questions array.
    updatedQuestions[questionIndex].answerOptions = updatedAnswerOptions;
    //the copied questions array, with the newly added answer option, is set back into state using setQuestions.
    setQuestions(updatedQuestions);
    // Reset the value of the input field for the answer option
    const updatedInputs = [...answerOptionInputs];
    updatedInputs[questionIndex] = ""; // Resetting the value to an empty string
    setAnswerOptionInputs(updatedInputs);
  };

  const handleAnswerOptionInputChange = (index, e) => {
    const updatedInputs = [...answerOptionInputs];
    updatedInputs[index] = e.target.value;
    setAnswerOptionInputs(updatedInputs);
  };

  const handleRadioChange = (questionIndex, answerIndex) => {
    // a copy of the current questions array is created using the spread operator
    const updatedQuestions = [...questions];
    //The correctAnswerIndex property of the question at the specified questionIndex is updated with the answerIndex. This indicates which answer option is the correct one for that question.
    updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
    //The updated questions array is then set back into state using setQuestions.
    setQuestions(updatedQuestions);
    setAtLeastOneCorrectAnswer(true);
  };

  const handleDeleteAnswerOption = (questionIndex, answerIndex) => {
    //a copy of the current questions array is created using the spread operator
    const updatedQuestions = [...questions];
    // The answer option at the specified answerIndex is removed from the answer options array for the question at the specified questionIndex using the splice method.
    updatedQuestions[questionIndex].answerOptions.splice(answerIndex, 1); //1 as to remove 1 option
    //The updated questions array is then set back into state using setQuestions.
    setQuestions(updatedQuestions);
  };

  const close = () => {
    handleClose();
    navigate("/");
  };
  console.log(atLeastOneCorrectAnswer);
  return (
    <Box>
      {/* modal opens up to choose type of question */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openn}
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
              <Box>
                <Button
                  variant={
                    selectedOption === "MCQ(Single Correct)"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleButtonClick("MCQ(Single Correct)")}
                >
                  MCQ(Single Correct)
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
      {/* if choose singleMcq in modal then this form renders */}
      {singleMcq && (
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "20px auto",
            minHeight: "90vh",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <FormGroup
            sx={{
              p: 2,
              border: "2px solid #000",
              width: { xs: "92%", md: "75%", lg: "50%" },
            }}
          >
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
            {/* Mapping on questions array to pass question and answer options of individual questions */}
            {questions.map((question, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                {/* question */}
                <TextField
                  label={`Question ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  sx={{ mb: 2 }}
                />
                {/* answer options */}
                {question.answerOptions.map((option, answerIndex) => (
                  <Box key={answerIndex}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
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
                      {/* to delete single answer option */}
                      <Button
                        sx={{
                          padding: "10px 0px",
                          marginLeft: "10px",
                        }}
                        variant="outlined"
                        onClick={() =>
                          handleDeleteAnswerOption(index, answerIndex)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </Box>
                ))}
                {/* to add answer option */}
                <Box style={{ display: "flex", alignItems: "flex-start" }}>
                  <TextField
                    label="Answer Option"
                    variant="outlined"
                    fullWidth
                    value={answerOptionInputs[index]}
                    onChange={(e) => handleAnswerOptionInputChange(index, e)}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    sx={{
                      fontSize: "0.74rem",
                      lineHeight: "1.76",
                      letterSpacing: "0",
                      marginLeft: "10px",
                    }}
                    variant="outlined"
                    onClick={() => handleAddAnswerOption(index)}
                  >
                    Add Answer
                  </Button>
                </Box>
              </Box>
            ))}
            {/* to add Question */}
            <Button
              variant="outlined"
              sx={{
                width: { sm: "10rem", xs: "100%" },
              }}
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
            <br />
            {titleError && <Box style={{ color: "red" }}>{titleError}</Box>}
            {/* to save the created quiz */}
            <Button
              sx={{
                mt: "2",
                width: { sm: "10rem", xs: "100%" },
              }}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
            {/* after quiz created this modal shows up */}
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
          </FormGroup>
        </FormControl>
      )}
      {!singleMcq && <Box>This function is currently not working</Box>}
    </Box>
  );
};

export default CreateQuiz;
//complete cycle understanding:
// addQuestion=> handleAddQuestion=>Add answer => handleAddAnswerOption => IconButton => handleRadioChange => save => handleSubmit
