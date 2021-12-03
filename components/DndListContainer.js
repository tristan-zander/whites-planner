import { Box, Divider } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import TaskList from "./TaskList";

export default function DndListContainer({ lists }) {
  let elements = [];

  lists.forEach((l, i) => {
    elements.push(
      <TaskList
        key={i.toString()}
        title={l.title}
        ids={[1 + 3 * i, 2 + 3 * i, 3 + 3 * i]}
      ></TaskList>
    );
    elements.push(
      <Divider key={l.title.toString() + i.toString()} orientation="vertical" />
    );
  });
  elements.pop();

  function handleOnDragEnd(result) {
    if (!result?.destination) return;

    console.debug(result);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={console.debug}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          flexGrow: 1,
          gap: 3,
        }}
      >
        {elements}{" "}
      </Box>
    </DragDropContext>
  );
}
