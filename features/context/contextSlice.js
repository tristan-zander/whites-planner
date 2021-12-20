import { createSlice } from "@reduxjs/toolkit";

export const contextSlice = createSlice({
  name: "context",
  initialState: {},
  reducers: {
    updateContext: (state, action) => {
      state = { ...state, ...action.payload };
    },
    addError: (state, action) => {
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    setAccessToken: (state, action) => {
      sessionStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    },
    addUser: (state, action) => {
      state.user = action.payload.user;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload.profile;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateContext,
  addError,
  clearErrors,
  setAccessToken,
  addUser,
  updateProfile,
} = contextSlice.actions;

export default contextSlice.reducer;
