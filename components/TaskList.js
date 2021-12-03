import { Paper, Box, Typography } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useState } from "react";
import crypto from "crypto";

export default function TaskList(props) {
  const genID = () => {
    return crypto.randomBytes(3).toString("hex");
  };

  const [assignments, setAssignments] = useState([
    { desc: "This is an assignments", id: genID() },
    { desc: "This is another assignments", id: genID() },
    { desc: "This is the last assignment", id: genID() },
  ]);

  function renderClone(provided, snapshot, rubric) {
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      Item id: {assignments[rubric.source.index].id}
    </div>;
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
      <Droppable droppableId={genID()}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {assignments.map((a, i) => {
              return (
                <Draggable key={a.id} draggableId={a.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Paper sx={{ m: 1 }}>{a.desc}</Paper>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
}
