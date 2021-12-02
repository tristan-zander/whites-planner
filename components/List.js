import { Paper, Box, Typography } from "@mui/material";

export default function List(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 1 / 4,
        flexGrow: 1,
        m: 1,
      }}
    >
      <Paper
        sx={{
          flexGrow: 1,
        }}
        square
      >
        <Typography variant="h4" sx={{ m: 1, mt: 3 }}>
          {props.title}
        </Typography>
        <Paper sx={{ m: 1 }}>This is an assignment!</Paper>
        <Paper sx={{ m: 1 }}>This is an assignment!</Paper>
        <Paper sx={{ m: 1 }}>This is an assignment!</Paper>
      </Paper>
    </Box>
  );
}
