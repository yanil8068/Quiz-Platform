// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   TextField,
//   Backdrop,
//   Modal,
//   Fade,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormGroup,
//   FormLabel,
//   IconButton,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { addQuiz } from "../redux/todoapp/actions";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import { useNavigate } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { sm: "90%", xs: "70%" }, // Adjusted width for responsiveness
//   maxWidth: 400, // Maximum width to maintain readability
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const Form = ({ editFormVisibility }) => {
//   const [questions, setQuestions] = useState([]);
//   const [quizValue, setQuizValue] = useState("");
//   const [description, setDescription] = useState("");
//   const [answerOptionInputs, setAnswerOptionInputs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [singleMcq, setSingleMcq] = useState(true);

//   const [openn, setOpenn] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(); // Default value for RadioGroup
//   const [titleError, setTitleError] = useState("");
//   const [atLeastOneCorrectAnswer, setAtLeastOneCorrectAnswer] = useState(false);
//   const [addQuestionButtonDisabled, setAddQuestionButtonDisabled] =
//     useState(false);

//   //////////

//   const handleClosee = () => setOpenn(false);

//   // const handleRadioChangee = (event) => {
//   //   setSelectedOption(event.target.value);
//   //   if (event.target.value === "MCQ(Single Correct)") {
//   //     handleClosee();
//   //   } else {
//   //     setSingleMcq(false);
//   //     handleClosee();
//   //   }
//   // };
//   const handleButtonClick = (option) => {
//     setSelectedOption(option);
//     if (option === "MCQ(Single Correct)") {
//       handleClosee();
//     } else {
//       setSingleMcq(false);
//       handleClosee();
//     }
//   };

//   useEffect(() => {
//     setOpenn(true); // Ensure the modal is open when the component mounts
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let date = new Date();
//     let time = date.getTime();
//     // Get date components
//     let day = date.getDate();
//     let month = date.getMonth() + 1; // Month starts from 0
//     let year = date.getFullYear();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let amPM = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12; // Convert hours to 12-hour format
//     let createdTime =
//       day +
//       "/" +
//       month +
//       "/" +
//       year +
//       " " +
//       hours +
//       ":" +
//       minutes +
//       ":" +
//       " " +
//       amPM;
//     console.log(createdTime);

//     // validation logic...

//     // Validation logic for title
//     if (quizValue.length < 10 || quizValue.length > 30) {
//       setTitleError("Title must be between 10 and 30 characters long.");
//       return; // Stop execution if validation fails
//     } else {
//       setTitleError(""); // Clear error message if title is valid
//     }

//     // Validation logic for description
//     if (description.length < 10 || description.length > 300) {
//       setTitleError("Description must be between 10 and 300 characters long.");
//       return; // Stop execution if validation fails
//     } else {
//       setTitleError(""); // Clear error message if description is valid
//     }

//     // Validation logic for questions
//     const questionLengthValid = questions.every(
//       (question) =>
//         question.question.length >= 10 && question.question.length <= 200
//     );

//     if (!questionLengthValid) {
//       setTitleError("Questions must be between 10 and 200 characters long.");
//       return; // Stop execution if any question validation fails
//     }

//     // Validation logic for answer options count
//     const answerOptionsValid = questions.every(
//       (question) => question.answerOptions.length >= 2
//     );

//     if (!answerOptionsValid) {
//       setTitleError("At least two options required to save a question.");
//       return; // Stop execution if any question has less than two options
//     }

//     // Validation logic for answer options not being empty
//     const answerOptionsNotEmpty = questions.every((question) =>
//       question.answerOptions.every((option) => option.answer.trim() !== "")
//     );

//     if (!answerOptionsNotEmpty) {
//       setTitleError("Answer options cannot be empty.");
//       return; // Stop execution if any answer option is empty
//     }

//     const allQuestions = questions.map((question) => {
//       const answerOptions = question.answerOptions.map((option, index) => ({
//         answer: option.answer,
//         checked: question.correctAnswerIndex === index,
//       }));

//       return {
//         question: question.question,
//         answerOptions: answerOptions,
//       };
//     });

//     let todoObj = {
//       id: time,
//       todo: quizValue,
//       description: description,
//       questions: allQuestions,
//       completed: true,
//       creattime: createdTime,
//     };

//     setQuizValue("");
//     setDescription("");
//     setQuestions([]);
//     setAnswerOptionInputs([]);
//     dispatch(addQuiz(todoObj));
//     handleClosee(); // Close the modal after submitting
//     handleOpen();
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { question: "", answerOptions: [] }]);
//     setAnswerOptionInputs([...answerOptionInputs, ""]);
//   };

//   const handleQuestionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].question = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleAddAnswerOption = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     const updatedAnswerOptions = [
//       ...updatedQuestions[questionIndex].answerOptions,
//     ];
//     updatedAnswerOptions.push({ answer: answerOptionInputs[questionIndex] });
//     updatedQuestions[questionIndex].answerOptions = updatedAnswerOptions;
//     setQuestions(updatedQuestions);

//     // Clear the input field value for the current question index
//     const updatedInputs = [...answerOptionInputs];
//     updatedInputs[questionIndex] = ""; // Resetting the value to an empty string
//     setAnswerOptionInputs(updatedInputs);

//     // setAnswerOptionInputs([...answerOptionInputs, ""]);
//   };

//   const handleAnswerOptionInputChange = (index, e) => {
//     const updatedInputs = [...answerOptionInputs];
//     updatedInputs[index] = e.target.value;
//     setAnswerOptionInputs(updatedInputs);
//   };

//   const handleRadioChange = (questionIndex, answerIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
//     setQuestions(updatedQuestions);
//     // Check if at least one correct answer is selected for each question
//     const atLeastOneCorrectAnswerSelected = updatedQuestions.every(
//       (question) => typeof question.correctAnswerIndex !== "undefined"
//     );
//     setAtLeastOneCorrectAnswer(atLeastOneCorrectAnswerSelected);
//   };

//   const handleDeleteAnswerOption = (questionIndex, answerIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].answerOptions.splice(answerIndex, 1);
//     setQuestions(updatedQuestions);
//   };

//   const close = () => {
//     handleClose();
//     navigate("/");
//   };

//   return (
//     <Box>
//       {/* {titleError && <Box style={{ color: "red" }}>{titleError}</Box>} */}
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={openn}
//         // onClose={handleClosee}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={openn}>
//           <Box sx={style}>
//             {/* <FormControl>
//               <FormLabel id="demo-radio-buttons-group-label">
//                 <Typography id="modal-modal-title" variant="h5" component="h2">
//                   Select Question Type
//                 </Typography>
//               </FormLabel>
//               <RadioGroup
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 value={selectedOption}
//                 onChange={handleRadioChangee}
//               >
//                 <FormControlLabel
//                   value="MCQ(Single Correct)"
//                   control={<Radio />}
//                   label="MCQ(Single Correct)"
//                 />
//                 <FormControlLabel
//                   value="MCQ(Multi Correct)"
//                   control={<Radio />}
//                   label="MCQ(Multi Correct)"
//                 />
//                 <FormControlLabel
//                   value="ShortAnswer(with 2 words)"
//                   control={<Radio />}
//                   label="Short Answer (with 2 words)"
//                 />
//                 <FormControlLabel
//                   value="Description(with 2 or 4 sentences)"
//                   control={<Radio />}
//                   label="Description (with 2 or 4 sentences)"
//                 />
//               </RadioGroup>
//             </FormControl> */}
//             <FormControl>
//               <FormLabel id="demo-radio-buttons-group-label">
//                 <Typography id="modal-modal-title" variant="h5" component="h2">
//                   Select Question Type
//                 </Typography>
//               </FormLabel>
//               <Box>
//                 <Button
//                   variant={
//                     selectedOption === "MCQ(Single Correct)"
//                       ? "contained"
//                       : "outlined"
//                   }
//                   onClick={() => handleButtonClick("MCQ(Single Correct)")}
//                 >
//                   MCQ(Single Correct)
//                 </Button>
//                 {/* had created options for other quiz type as well but will show it when those quiz type will be implemented as well */}
//                 {/* <Button
//                   variant={
//                     selectedOption === "MCQ(Multi Correct)"
//                       ? "contained"
//                       : "outlined"
//                   }
//                   onClick={() => handleButtonClick("MCQ(Multi Correct)")}
//                 >
//                   MCQ(Multi Correct)
//                 </Button>
//                 <Button
//                   variant={
//                     selectedOption === "ShortAnswer(with 2 words)"
//                       ? "contained"
//                       : "outlined"
//                   }
//                   onClick={() => handleButtonClick("ShortAnswer(with 2 words)")}
//                 >
//                   Short Answer (with 2 words)
//                 </Button>
//                 <Button
//                   variant={
//                     selectedOption === "Description(with 2 or 4 sentences)"
//                       ? "contained"
//                       : "outlined"
//                   }
//                   onClick={() =>
//                     handleButtonClick("Description(with 2 or 4 sentences)")
//                   }
//                 >
//                   Description (with 2 or 4 sentences)
//                 </Button> */}
//               </Box>
//             </FormControl>
//           </Box>
//         </Fade>
//       </Modal>
//       {/*  */}
//       {singleMcq && (
//         // <form
//         //   onSubmit={handleSubmit}
//         //   style={{
//         //     width: "60%",
//         //     display: "flex",
//         //     justifyContent: "center",
//         //     alignItems: "center",
//         //     flexDirection: "column",
//         //     margin: "20px auto",
//         //   }}
//         // >
//         <FormControl
//           sx={{
//             width: { sm: "60%", xs: "90%" },
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//             margin: "20px auto",
//             // height: "80%",
//             // fontSize: "90%",
//           }}
//           component="form"
//           onSubmit={handleSubmit}
//         >
//           <FormGroup sx={{ width: "100%" }}>
//             <TextField
//               label="Title"
//               variant="outlined"
//               fullWidth
//               rows={1}
//               sx={{ mb: 2 }}
//               value={quizValue}
//               onChange={(e) => setQuizValue(e.target.value)}
//             />
//             <TextField
//               label="Description"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//               sx={{ mb: 2 }}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             {questions.map((question, index) => (
//               <Box key={index} sx={{ width: "100%" }}>
//                 <TextField
//                   label={`Question ${index + 1}`}
//                   variant="outlined"
//                   fullWidth
//                   value={question.question}
//                   onChange={(e) => handleQuestionChange(index, e.target.value)}
//                   sx={{ mb: 2 }}
//                 />
//                 {question.answerOptions.map((option, answerIndex) => (
//                   <Box key={answerIndex}>
//                     <Box
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginBottom: "8px",

//                         // alignItems: "flex-start",
//                       }}
//                     >
//                       {/* <input
//                       type="radio"
//                       name={`question-${index}`} // Use index to ensure each group is unique per question
//                       checked={question.correctAnswerIndex === answerIndex}
//                       onChange={() => handleRadioChange(index, answerIndex)}
//                     /> */}
//                       <IconButton
//                         onClick={() => handleRadioChange(index, answerIndex)}
//                         color={
//                           question.correctAnswerIndex === answerIndex
//                             ? "primary"
//                             : "default"
//                         }
//                       >
//                         {question.correctAnswerIndex === answerIndex ? (
//                           <CheckCircleIcon />
//                         ) : (
//                           <RadioButtonUncheckedIcon />
//                         )}
//                       </IconButton>

//                       <TextField
//                         label={`Answer Option ${answerIndex + 1}`}
//                         variant="outlined"
//                         fullWidth
//                         value={option.answer}
//                         sx={{ mb: 2, marginLeft: "8px" }}
//                         disabled
//                       />
//                       <Button
//                         sx={{
//                           padding: "10px 0px",
//                           // fontSize: { sm: "100%", xs: "70%" },
//                           // fontSize: "0.74rem",
//                           // // lineHeight: "1.76",
//                           // letterSpacing: 0,
//                         }}
//                         // variant="outlined"
//                         onClick={() =>
//                           handleDeleteAnswerOption(index, answerIndex)
//                         }
//                       >
//                         <DeleteIcon />
//                       </Button>
//                     </Box>
//                   </Box>
//                 ))}
//                 <Box style={{ display: "flex", alignItems: "flex-start" }}>
//                   <TextField
//                     label="Answer Option"
//                     variant="outlined"
//                     fullWidth
//                     value={answerOptionInputs[index]}
//                     onChange={(e) => handleAnswerOptionInputChange(index, e)}
//                     sx={{ mb: 2 }}
//                   />
//                   <Button
//                     sx={{
//                       fontSize: "0.74rem",
//                       lineHeight: "1.76",
//                       letterSpacing: "0",
//                       marginLeft: "10px",
//                     }}
//                     variant="outlined"
//                     onClick={() => handleAddAnswerOption(index)}
//                   >
//                     Add Answer
//                   </Button>
//                 </Box>
//               </Box>
//             ))}

//             <Button
//               variant="outlined"
//               disabled={!atLeastOneCorrectAnswer && questions.length === 0}
//               sx={{
//                 width: { sm: "10rem", xs: "100%" },
//               }}
//               onClick={handleAddQuestion}
//             >
//               Add Question
//             </Button>
//             <br />
//             {titleError && <Box style={{ color: "red" }}>{titleError}</Box>}
//             <Button
//               sx={{
//                 mt: "2",
//                 width: { sm: "10rem", xs: "100%" },
//               }}
//               type="submit"
//               variant="contained"
//             >
//               Save
//             </Button>
//             <Modal
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <Box sx={style}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                   Questions created successfully
//                 </Typography>
//                 <Button onClick={() => navigate("/quizzes")}>
//                   View all Questions
//                 </Button>
//                 <Button onClick={close}>Close</Button>
//               </Box>
//             </Modal>
//             {/* </form> */}
//           </FormGroup>
//         </FormControl>
//       )}
//       {!singleMcq && <div>This function is currently not working</div>}
//     </Box>
//   );
// };

// export default Form;

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
  const [addQuestionButtonDisabled, setAddQuestionButtonDisabled] =
    useState(false);
  // const [msgForCorrectAnswer, setMsgForCorrectAnswer] = useState(true);

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
    setAddQuestionButtonDisabled(false);
    setAtLeastOneCorrectAnswer(true);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!atLeastOneCorrectAnswer) {
      return alert("select atleast one correct answer");
    }

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
  const handleAddQuestion = () => {
    setAtLeastOneCorrectAnswer(false);
    if (!atLeastOneCorrectAnswer) {
      return alert("select atleast one correct answer");
    } else {
      setQuestions([...questions, { question: "", answerOptions: [] }]);
      setAnswerOptionInputs([...answerOptionInputs, ""]);
      // setAddQuestionButtonDisabled(true);
    }
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
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
    setQuestions(updatedQuestions);
    // const atLeastOneCorrectAnswerSelected = updatedQuestions.every(
    //   (question) => typeof question.correctAnswerIndex !== "undefined"
    // );

    setAtLeastOneCorrectAnswer(true);
    // setAddQuestionButtonDisabled(false);

    // setMsgForCorrectAnswer(false);
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

  // useEffect(() => {
  //   // Enable the "Add Question" button initially
  //   setAddQuestionButtonDisabled(false);
  // }, []);

  // useEffect(() => {
  //   // Update the disabled state of the "Add Question" button based on conditions
  //   setAddQuestionButtonDisabled(
  //     // !atLeastOneCorrectAnswer && questions.length === 0
  //     false
  //   );
  // }, [atLeastOneCorrectAnswer, questions]);
  console.log(atLeastOneCorrectAnswer);
  // if (atLeastOneCorrectAnswer) {
  //   setAddQuestionButtonDisabled(false);
  // }

  return (
    <Box>
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

      {singleMcq && (
        <FormControl
          sx={{
            //width: { sm: "60%", xs: "90%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "20px auto",
            // bgcolor: "#D862BC",
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
                {/* {msgForCorrectAnswer ? (
                  <Box>Please select correct answer</Box>
                ) : (
                  ""
                )} */}
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

            <Button
              variant="outlined"
              // disabled={addQuestionButtonDisabled}
              sx={{
                width: { sm: "10rem", xs: "100%" },
              }}
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
            <br />
            {titleError && <Box style={{ color: "red" }}>{titleError}</Box>}
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
      {!singleMcq && <div>This function is currently not working</div>}
    </Box>
  );
};

export default CreateQuiz;
