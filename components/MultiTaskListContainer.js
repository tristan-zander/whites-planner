import { Box, Divider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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
import {
  moveAssignment,
  updatetaskList,
} from "@features/task_lists/taskListsSlice";

// Drag and drop list container
export default function MultiTaskListContainer(props) {
  const lists = useSelector((state) => state.taskLists.value);
  const assignments = useSelector((state) => state.assignments.value);

  const dispatch = useDispatch();

  let elements = [];

  useEffect(() => {
    if (lists === undefined) return;
    elements = [];
    Object.values(lists).forEach((l, i) => {
      elements.push(
        <TaskList
          key={l.ref.id + l.title + i.toString()}
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
  }, [elements, lists]);

  function handleOnDragEnd(result) {
    if (!result?.destination || !result?.reason === "DROP") return;

    console.debug(result);

    const sourceId =
      lists[result.source.droppableId].assignments[result.source.index];

    const assignment = assignments[sourceId.id];
    const from = lists[result.source.droppableId];
    const to = lists[result.destination.droppableId];

    dispatch(
      moveAssignment({
        assignment,
        from,
        to,
        destIndex: result.destination.index,
      })
    );
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
