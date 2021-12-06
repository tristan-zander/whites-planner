import { Box, Divider } from "@mui/material";
import { useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";

// Drag and drop list container
export default function DndListContainer(props) {
  const assignments = useSelector((state) => state.assignments.value);
  const lists = useSelector((state) => state.taskLists.value);

  let elements = [];

  Object.values(lists).forEach((l, i) => {
    console.debug("Inserting: ", l);
    elements.push(
      <TaskList
        key={i.toString()}
        title={l.title}
        ids={[1 + 3 * i, 2 + 3 * i, 3 + 3 * i]}
        assignments={l.assignments}
      ></TaskList>
    );
    elements.push(
      <Divider key={l.title + i.toString()} orientation="vertical" />
    );
  });
  elements.pop();

  function handleOnDragEnd(result) {
    if (!result?.destination || !result?.reason === "DROP") return;

    console.debug(result);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          flexGrow: 1,
          gap: 3,
        }}
      >
        {elements}
      </Box>
    </DragDropContext>
  );
}
