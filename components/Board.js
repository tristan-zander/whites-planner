import { Box, Paper, Typography, Divider } from "@mui/material";
import List from "./List";

export default function Board(props) {
  let lists = [];

  props.lists.forEach((l) => {
    lists.push(
      <>
        <List title={l.title}></List>
      </>
    );
    lists.push(<Divider orientation="vertical" />);
  });

  lists.pop();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        px: 2,
        py: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          height: "100%",
          py: 3,
          px: 2,
          borderRadius: 5,
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
        variant="outlined"
      >
        <Typography variant="h3" sx={{ alignSelf: "flex-start" }}>
          {props.title}
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            flexGrow: 1,
            gap: 3,
          }}
        >
          {lists}
        </Box>
      </Paper>
    </Box>
  );
}
