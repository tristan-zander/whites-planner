import { createSlice } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
  name: "boards",
  initialState: {},
  reducers: {
    addBoard: (state, action) => {
      console.debug(action.payload);
      const { ref, ts, name, lists, owner, primaryBoard } = action.payload;
      state[ref.id] = { ts, name, lists, owner, primaryBoard };
    },
    deleteBoard: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      state[ref.id] = null;
    },
    updateBoard: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBoard, deleteBoard, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
