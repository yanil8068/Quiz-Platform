import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import congratulations from "../assets/congratulations.png";

const Result = ({ score }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        result {score}
      </Typography>
      <Card sx={{ width: { xs: "90%", md: "45%" }, overflow: "visible" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={congratulations}
            alt="My Quizzes"
            sx={{ width: "90%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Result;
