import { Box, Divider } from "@mui/material";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import TaskList from "./TaskList";

// Drag and drop list container
export default function DndListContainer(props) {
  const propLists = props.lists;

  let [lists, setLists] = useState(Array.from(propLists));

  console.debug(lists);

  let elements = [];

  propLists.forEach((l, i) => {
    elements.push(
      <TaskList
        key={i.toString()}
        title={l.title}
        ids={[1 + 3 * i, 2 + 3 * i, 3 + 3 * i]}
        assignments={l.assignments}
      ></TaskList>
    );
    elements.push(
      <Divider key={l.title.toString() + i.toString()} orientation="vertical" />
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
