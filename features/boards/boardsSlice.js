import { createSlice } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    value: {},
  },
  reducers: {
    addBoard: (state, action) => {
      const { ref, ts, name, listRefs } = action.payload;
      state.value[ref.id] = { ts, name, listRefs };
    },
    deleteBoard: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      state.value[ref.id] = null;
    },
    updateBoard: (state, action) => {
      const { ref } = action.payload;
      state.value[ref.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBoard, deleteBoard, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
