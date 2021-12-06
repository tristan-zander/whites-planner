import { Box, Divider } from "@mui/material";
import { useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssignment,
  addAssignment,
} from "@features/assignments/assignmentsSlice";
import { updatetaskList } from "@features/task_lists/taskListsSlice";

// Drag and drop list container
export default function MultiTaskListContainer(props) {
  const lists = useSelector((state) => state.taskLists.value);

  const dispatch = useDispatch();

  let elements = [];

  Object.values(lists).forEach((l, i) => {
    elements.push(
      <TaskList
        key={l.ref.id}
        title={l.title}
        ids={[1 + 3 * i, 2 + 3 * i, 3 + 3 * i]}
        assignmentIds={l.assignments}
        droppableId={l.ref.id}
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

    const oldId = result.source.droppableId;
    const newId = result.destination.droppableId;

    const source =
      lists[result.source.droppableId].assignments[result.source.index];

    dispatch();
    // Update the old list.
    // moveAssignmentFromTo ({
    //  assignment: "id",
    //  from: "taskListId"
    //  to: "taskListId"
    // })
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
