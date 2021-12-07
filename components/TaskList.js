import { Paper, Box, Typography } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function TaskList({ assignmentIds, title, droppableId }) {
  const assignmentSelector = useSelector((state) => state.assignments.value);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // This shouldn't be using assignment ids at all. It should take it directly from the state.
    const assignments = assignmentIds.map((ref) => {
      return assignmentSelector[ref.id];
    });
    setAssignments(assignments);
  }, [assignmentSelector, assignmentIds]);

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
        droppableId={droppableId}
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
                <Draggable
                  key={a.ref.id + a.title + i.toString()}
                  draggableId={a.ref.id}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Paper sx={{ m: 1 }}>{a.title}</Paper>
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
