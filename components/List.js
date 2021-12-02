import { Paper, Box, Typography } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

export default function List(props) {
  const [assignments, setAssignments] = useState([
    { desc: "This is an assignments" },
    { desc: "This is another assignments" },
    { desc: "This is the last assignment" },
  ]);

  function handleOnDragEnd(result) {
    if (!result?.destination) return;

    const items = Array.from(assignments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAssignments(items);
  }

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
      <Typography variant="h4" sx={{ m: 1, mt: 3 }}>
        {props.title}
      </Typography>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="listItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {assignments.map((a, i) => {
                return (
                  <Draggable key={i} draggableId={i.toString()} index={i}>
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ m: 1 }}
                      >
                        {a.desc}
                      </Paper>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
