import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Result from "./Result";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Quiz = ({ name, score, setScore, questionsplay, setQuestionsplay }) => {
  const [currQues, setCurrQues] = useState(0);
  const [disablenext, setdisablenext] = useState(true);
  const [optionColors, setOptionColors] = useState(Array(4).fill("primary")); // Assuming there are 4 answer options

  useEffect(() => {
    setScore(0);
  }, []);

  const handleOptionClick = (optionIndex, optionAnswer) => {
    const newOptionColors = [...optionColors]; // Copy the current optionColors array
    if (optionAnswer) {
      setScore(score + 1);
      newOptionColors[optionIndex] = "secondary"; // Set color to secondary for correct answer
      // setCurrQues(currQues + 1)
    } else {
      newOptionColors[optionIndex] = "error"; // Set color to error for incorrect answer
    }
    setOptionColors(newOptionColors);
    setdisablenext(!disablenext);
  };
  const gotonextquestion = () => {
    setCurrQues(currQues + 1);
    setdisablenext(!disablenext);
    setOptionColors(Array(4).fill("primary")); // Reset option colors for the next question
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
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
    >
      {currQues < questionsplay.length ? (
        <>
          {questionsplay[currQues] ? (
            <>
              <Typography variant="h3" gutterBottom>
                score : {score}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {currQues + 1}. {questionsplay[currQues].question}
              </Typography>
              <ul>
                {questionsplay[currQues].answerOptions.map((option, index) => (
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    color={optionColors[index]} // Set button color based on optionColors state
                    onClick={() => handleOptionClick(index, option.checked)}
                    fullWidth
                  >
                    <li key={index}>{option.answer}</li>
                  </Button>
                ))}
              </ul>
              <Typography variant="h7" sx={{ mb: "2", mt: "2" }} gutterBottom>
                question no : {currQues}/{questionsplay.length}
              </Typography>
              <br />
              <Button
                sx={{ mb: "2", mt: "2" }}
                disabled={disablenext}
                onClick={gotonextquestion}
                variant="contained"
              >
                {currQues === questionsplay.length - 1 ? "submit" : "next"}
              </Button>
              <br />
            </>
          ) : (
            <Typography variant="h6" gutterBottom>
              <CircularProgress />
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h8" gutterBottom>
          <Result score={score} />
        </Typography>
      )}
    </Box>
  );
};

export default Quiz;
