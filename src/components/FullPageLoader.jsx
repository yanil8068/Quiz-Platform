import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Box from "@mui/material/Box";

function Loader({ bg }) {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <HourglassEmptyIcon />
        </Box>
      </Box>
    </>
  );
}

export default Loader;
