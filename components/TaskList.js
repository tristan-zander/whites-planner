import { Paper, Box, Typography } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function TaskList({ id }) {
  const list = useSelector((state) => state.taskLists[id]);
  const assignmentData = useSelector((state) => state.assignments);
  const [assignments, setAssignments] = useState([]);

  async function fetchAssignments() {}

  useEffect(() => {
    const assignmentsForThisList = Object.values(assignmentData).filter(
      (a) => a.board == id
    );
    setAssignments(assignmentsForThisList);
  }, [assignmentData, id, list]);

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
        {list.name}
      </Typography>
      <Droppable
        droppableId={id}
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
            {assignments.length > 0 ? null : (
              <Typography>
                Hey, you should add an assignment to this.
              </Typography>
            )}
            {assignments.map((a, i) => {
              return (
                <Draggable key={a.ref.id} draggableId={a.ref.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Paper sx={{ m: 1 }}>{a.name}</Paper>
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
