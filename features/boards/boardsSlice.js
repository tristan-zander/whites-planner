import { createSlice } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
  name: "boards",
  initialState: {},
  reducers: {
    addBoard: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
    deleteBoard: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      delete state[ref.id];
    },
    updateBoard: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
    addListRefToBoard: (state, action) => {
      const { ref, board } = action.payload;

      state[board.ref.id].lists.push(ref);
    },
  },
});

export const { addBoard, deleteBoard, updateBoard, addListRefToBoard } =
  boardsSlice.actions;

export default boardsSlice.reducer;
