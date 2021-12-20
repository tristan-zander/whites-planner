import { createTaskList } from "@features/task_lists/taskListsSlice";
import {
  saveUpdateAssignment,
  updateAssignment,
} from "@features/assignments/assignmentsSlice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Divider,
  ButtonGroup,
  Button,
  Stack,
} from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "@components/TaskList";
import { undoNormalizeRef } from "@features/normalize";

export default function Board({ id, ...rest }) {
  const boardData = useSelector((state) => state.boards);
  const listsData = useSelector((state) => state.taskLists);
  const assignmentsData = useSelector((state) => state.assignments);
  const board = useSelector((state) => state.boards[id]);
  const user = useSelector((state) => state.context.user);

  if (!board) {
    console.warn("Board is not defined.", id);
  }
  const dispatch = useDispatch();

  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!board.lists) return;
    console.debug(board);
    const lists = board.lists
      .map((l) => listsData[l.id])
      .filter((l) => l !== undefined);
    setLists(lists);
  }, [board, listsData]);

  function handleOnDragEnd(result) {
    if (!result?.destination || !result?.reason === "DROP") return;

    const assignment = assignmentsData[result.draggableId];
    const updated = {
      ...assignment,
      list: { id: result.destination.droppableId, collection: "Assignment" },
    };

    // TODO: enforce ordering
    dispatch(saveUpdateAssignment(updated));
  }

  function handleAddList() {
    const data = {
      name: "New List",
      owner: undoNormalizeRef(user.ref),
      board: undoNormalizeRef(board.ref),
    };

    const res = dispatch(createTaskList(data));
  }

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ alignSelf: "flex-start", flexGrow: 1 }}
          >
            {board?.name}
          </Typography>
          <ButtonGroup>
            <Button onClick={handleAddList}>Add List</Button>
            <Button>Settings</Button>
          </ButtonGroup>
        </Box>
        <Divider />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              flexGrow: 1,
              gap: 3,
            }}
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {lists.map((l) => {
              return <TaskList key={l.ref.id} id={l.ref.id} />;
            })}
          </Stack>
        </DragDropContext>
      </Paper>
    </Box>
  );
}
