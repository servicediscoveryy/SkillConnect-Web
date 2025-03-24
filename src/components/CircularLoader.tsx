import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularLoader() {
  return (
    <Box
      sx={{ display: "flex" }}
      className="h-screen w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-between">
        <CircularProgress size={30} />
        <p className="text">Hang Tight....</p>
      </div>
    </Box>
  );
}
