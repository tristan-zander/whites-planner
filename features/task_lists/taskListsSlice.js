import { createSlice } from "@reduxjs/toolkit";

export const taskListsSlice = createSlice({
  name: "taskLists",
  initialState: {
    value: {},
  },
  reducers: {
    addtaskList: (state, action) => {
      const { ref, ts, name, assignmentRefs } = action.payload;
      state.value[ref.id] = { ts, name, assignmentRefs };
    },
    deletetaskList: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      state.value[ref.id] = null;
    },
    updatetaskList: (state, action) => {
      const { ref } = action.payload;
      state.value[ref.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtaskList, deletetaskList, updatetaskList } =
  taskListsSlice.actions;

export default taskListsSlice.reducer;
