import { configureStore } from "@reduxjs/toolkit";
import contextReducer from "@features/context/contextSlice";
import assignmentReducer from "@features/assignments/assignmentsSlice";
import boardReducer from "@features/boards/boardsSlice";
import classReducer from "@features/classes/classesSlice";
import taskListReducer from "@features/task_lists/taskListsSlice";

export default configureStore({
  reducer: {
    context: contextReducer,
    assignments: assignmentReducer,
    boards: boardReducer,
    classes: classReducer,
    taskLists: taskListReducer,
  },
});
