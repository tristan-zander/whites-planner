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
  const listsData = useSelector((state) => state.taskLists);
  const board = useSelector((state) => state.boards[props.id]);

  const dispatch = useDispatch();

  const [lists, setLists] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const lists = board.lists
      .map((l) => listsData[l.value.id])
      .filter((l) => l !== undefined);
    setLists(lists);
  }, [board, listsData]);

  useEffect(() => {
    if (lists === undefined || lists.length <= 0) return;
    let components = [];
    Object.values(lists).forEach((l, i) => {
      components.push(<TaskList key={l.ref.id} id={l.ref.id}></TaskList>);
      components.push(
        <Divider key={l.ref.id + i.toString()} orientation="vertical" />
      );
    });
    components.pop();
    setElements(components);
  }, [board, lists]);

  function handleOnDragEnd(result) {
    if (!result?.destination || !result?.reason === "DROP") return;

    console.debug(result);

    const sourceId =
      lists[result.source.droppableId].assignments[result.source.index];

    // const assignment = assignments[sourceId.id];
    // const from = lists[result.source.droppableId];
    // const to = lists[result.destination.droppableId];

    // dispatch(
    //   moveAssignment({
    //     assignment,
    //     from,
    //     to,
    //     destIndex: result.destination.index,
    //   })
    // );
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
