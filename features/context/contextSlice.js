import { createSlice } from "@reduxjs/toolkit";

export const contextSlice = createSlice({
  name: "context",
  initialState: {
    value: null,
  },
  reducers: {
    updateContext: (state, action) => {
      state.value = action.payload;
    },
    deleteContext: (state) => {
      // Need to use thunk here to revoke the token.
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateContext, deleteContext } = contextSlice.actions;

export default contextSlice.reducer;
