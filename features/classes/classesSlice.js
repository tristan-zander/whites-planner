import { createSlice } from "@reduxjs/toolkit";

export const classesSlice = createSlice({
  name: "classes",
  initialState: {},
  reducers: {
    addclass: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
    deleteclass: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      delete state[ref.id];
    },
    updateclass: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addclass, deleteclass, updateclass } = classesSlice.actions;

export default classesSlice.reducer;
