import { createSlice } from "@reduxjs/toolkit";

export const contextSlice = createSlice({
  name: "context",
  initialState: {},
  reducers: {
    updateContext: (state, action) => {
      state = { ...state, ...action.payload };
    },
    addError: (state, action) => {
      state.erorr = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateContext, addError, setAccessToken } = contextSlice.actions;

export default contextSlice.reducer;
