import { Box, Paper, Typography, Divider } from "@mui/material";
import MultiTaskListContainer from "@components/MultiTaskListContainer";
import { useSelector } from "react-redux";
import {
  Collection,
  Create,
  Documents,
  Map,
  Paginate,
  Lambda,
  Var,
} from "faunadb";
import { addBoard } from "@features/boards/boardsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Board(props) {
  const boardData = useSelector((state) => state.boards);

  const dispatch = useDispatch();

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
        {Object.keys(boardData).length > 0 ? (
          <>
            <Typography variant="h3" sx={{ alignSelf: "flex-start" }}>
              {props.title}
            </Typography>
            <Divider />
            <MultiTaskListContainer
              id={
                // Return the first ID that is the primary board.
                Object.keys(boardData).filter(
                  (id) => boardData[id].primaryBoard
                )[0]
              }
            ></MultiTaskListContainer>
          </>
        ) : (
          <div>
            There arent any boards associated with your account. Start by
            creating one.
          </div>
        )}
      </Paper>
    </Box>
  );
}
