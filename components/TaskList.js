import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import TemplateAssignment from "./TemplateAssignment";
import { Client as FaunaClient, Collection, Create, Ref } from "faunadb";
import {
  addAssignment,
  saveNewAssignment,
} from "@features/assignments/assignmentsSlice";
import Assignment from "@components/Assignment";

export default function TaskList({ id }) {
  const list = useSelector((state) => state.taskLists[id]);
  const assignmentData = useSelector((state) => state.assignments);
  const token = useSelector((state) => state.context.token);
  const user = useSelector((state) => state.context.user);
  const [assignments, setAssignments] = useState([]);

  const [tempAssignment, setTempAssignment] = useState(null);

  const dispatch = useDispatch();

  async function fetchAssignments() {}

  useEffect(() => {
    const assignmentsForThisList = Object.values(assignmentData).filter((a) => {
      return a.list.id == id;
    });
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
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4" sx={{ m: 1, mt: 3, flexGrow: 5 }}>
          {list.name}
        </Typography>
        <IconButton
          onClick={() => {
            if (tempAssignment === null) {
              // Create a template assignment for editing.
              setTempAssignment(
                <TemplateAssignment
                  onClose={() => {
                    setTempAssignment(null);
                  }}
                  onSubmit={async (res) => {
                    // Convert due date to database friendly version.
                    const dueDate = res.dueDate?.toISO();

                    if (!token) {
                      throw new Error(
                        "Cannot connect to the database. Please log in again."
                      );
                    }

                    if (!user.ref) {
                      throw new Error(
                        "Data for the current user ref is not in the state."
                      );
                    }

                    dispatch(
                      saveNewAssignment({
                        name: res.name,
                        desc: res.description,
                        dueDate: dueDate,
                        owner: Ref(
                          Collection(user.ref.collection),
                          user.ref.id
                        ),
                        list: list.ref,
                      })
                    );

                    setTempAssignment(null);
                  }}
                ></TemplateAssignment>
              );
            }
          }}
        >
          <Add />
        </IconButton>
      </Box>
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
              <Assignment id={rubric.draggableId} />
            </div>
          );
        }}
      >
        {(provided) => (
          <Stack
            spacing={2}
            sx={{ h: "100%" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tempAssignment ??
              (assignments.length > 0 ? null : (
                <Typography>
                  Click the + button to add an assignment.
                </Typography>
              ))}
            {assignments.map((a, i) => {
              return (
                <Draggable key={a.ref.id} draggableId={a.ref.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Assignment id={a.ref.id} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Box>
  );
}
