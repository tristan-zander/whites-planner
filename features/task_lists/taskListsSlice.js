import { createSlice } from "@reduxjs/toolkit";

export const taskListsSlice = createSlice({
  name: "taskLists",
  initialState: {},
  reducers: {
    addtaskList: (state, action) => {
      const { ref, ts, title, assignments } = action.payload;
      state[ref.id] = { ref, ts, title, assignments };
    },
    deletetaskList: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      delete state[ref.id];
    },
    updatetaskList: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
    moveAssignment: (state, action) => {
      const { assignment, from, to, destIndex } = action.payload;
      const oldIndex = state[from.ref.id].assignments.indexOf({
        id: assignment.ref.id,
      });
      state[from.ref.id].assignments.splice(oldIndex, 1);

      state[to.ref.id].assignments.splice(destIndex, 0, {
        id: assignment.ref.id,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtaskList, deletetaskList, updatetaskList, moveAssignment } =
  taskListsSlice.actions;

export default taskListsSlice.reducer;
