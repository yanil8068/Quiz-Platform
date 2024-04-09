import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import congratulations from "../assets/congratulations.png";
import { useEffect } from "react";

const Result = ({ score, TotalQuestion, setName }) => {
  useEffect(() => {
    setName(null);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { sm: "flex-start", md: "center" },
        minHeight: "93vh",
        m: 3,
      }}
    >
      <Card
        sx={{
          width: { xs: "85%", sm: "65%", md: "45%" },
          mb: 1,
          overflow: "visible",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={congratulations}
            alt="My Quizzes"
            sx={{ width: "90%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>
      <Typography variant="h4" gutterBottom>
        You have scored {score} out of {TotalQuestion}
      </Typography>
    </Box>
  );
};

export default Result;
