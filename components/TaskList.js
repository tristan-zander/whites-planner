import { Paper, Box, Typography } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useState } from "react";
import crypto from "crypto";

export default function TaskList({ assignments, title }) {
  const genID = () => {
    return crypto.randomBytes(3).toString("hex");
  };

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
        {title}
      </Typography>
      <Droppable
        droppableId={title}
        renderClone={(provided, snapshot, rubric) => {
          // This will be an assignment object
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              Rendered
            </div>
          );
        }}
      >
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
