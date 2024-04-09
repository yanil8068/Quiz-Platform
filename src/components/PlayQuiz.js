import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PlayQuiz = ({
  name,
  score,
  setScore,
  questionsplay,
  setQuestionsplay,
  title,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [currQues, setCurrQues] = useState(0);
  const [disablenext, setdisablenext] = useState(true);
  const [optionColors, setOptionColors] = useState(Array(4).fill("primary")); // Assuming there are 4 answer options
  const [answerSelected, setAnswerSelected] = useState(false); // State to track whether an answer has been selected
  const [buttonClicked, setButtonClicked] = useState(false); // State to track whether the button has been clicked
  const [optionVariant, setOptionVariant] = useState(Array(4).fill("outlined"));
  useEffect(() => {
    setScore(0);
  }, []);

  useEffect(() => {
    if (currQues === questionsplay.length) {
      navigate("/result"); // Navigate to '/result' when currQues becomes equal to questionsplay.length
    }
  }, [currQues, questionsplay, navigate]);

  const optionsLetters = ["A", "B", "C", "D"]; // Define array of letters for options

  //when clicked on answer option
  const handleOptionClick = (optionIndex, optionAnswer) => {
    const newVariant = [...optionVariant];
    const newOptionColors = [...optionColors]; // Copy the current optionColors array
    //if selected answer is correct
    if (optionAnswer) {
      //increasing score
      setScore(score + 1);
      //making color of that particular button to success
      newOptionColors[optionIndex] = "success"; // Set color to secondary for correct answer
      newVariant[optionIndex] = "contained";
    } else {
      newOptionColors[optionIndex] = "error"; // Set color to error for incorrect answer
      newVariant[optionIndex] = "contained";
    }
    setOptionColors(newOptionColors);
    setdisablenext(!disablenext); //enabling the next button
    setAnswerSelected(true); // Set answer selected to true
    setOptionVariant(newVariant); // set styling of options
  };

  //when click on next button
  const gotonextquestion = () => {
    setCurrQues(currQues + 1); //setting question number
    setdisablenext(!disablenext); //disabling the next button
    setOptionColors(Array(4).fill("primary")); // Reset option colors for the next question
    setAnswerSelected(false); // Reset answer selected state
    setButtonClicked(false); // Reset button clicked state
    setOptionVariant(Array(4).fill("outlined")); // set styling of new options
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        p: 2,
        overflowY: "auto", // Enable vertical scrolling if needed
        fontSize: "1rem", // Default font size
        "@media (max-width:600px)": {
          width: "90%", // Adjust width for small screens
        },
        "@media (max-width:400px)": {
          width: "95%", // Adjust width for extra small screens
          fontSize: "0.72rem", // Font size for extra small screens (xs)
        },
        "@media (max-width:300px)": {
          width: "100%", // Adjust width for extra small screens
          fontSize: "0.72rem", // Font size for extra small screens (xs)
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "92%", md: "75%", lg: "50%" },
        }}
      >
        {questionsplay[currQues] ? (
          <Box sx={{ border: "2px solid black", p: 2, borderRadius: "8px" }}>
            <Typography sx={{ textAlign: "right" }} variant="h5" gutterBottom>
              name: {name}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: "1.2rem",
                borderBottom: "2px solid grey",
              }}
              fullWidth
              variant="h4"
              gutterBottom
            >
              Quiz: {title}
            </Typography>
            <Typography sx={{ fontWeight: "550" }} variant="h6" gutterBottom>
              {currQues + 1}. {questionsplay[currQues].question}
            </Typography>

            {questionsplay[currQues].answerOptions.map((option, index) => (
              <Button
                key={index}
                variant={optionVariant[index]}
                sx={{
                  mt: 2,
                  pointerEvents:
                    answerSelected || buttonClicked ? "none" : "auto",
                  width: "100%",
                  color: "black",
                }}
                color={optionColors[index]} // Set button color based on optionColors state
                onClick={() => handleOptionClick(index, option.checked)}
                fullWidth
              >
                <Box sx={{ liststyleType: "none" }} key={index}>
                  {optionsLetters[index]}.{option.answer}
                </Box>
              </Button>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h7"
                sx={{ mb: "2", mt: "2", fontWeight: "500" }}
                gutterBottom
              >
                question : {currQues}/{questionsplay.length}
              </Typography>

              <Button
                sx={{ mb: 2, mt: 3, width: "40%" }}
                disabled={disablenext}
                onClick={gotonextquestion}
                variant="contained"
              >
                {currQues === questionsplay.length - 1 ? "submit" : "next"}
              </Button>
            </Box>
            <br />
          </Box>
        ) : (
          <Typography variant="h6" gutterBottom>
            <CircularProgress />
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PlayQuiz;

//option select => handleOptionClick => next => gotonextquestion => currQues === questionsplay.length => /result
