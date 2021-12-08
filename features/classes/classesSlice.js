import { createSlice } from "@reduxjs/toolkit";

export const classesSlice = createSlice({
  name: "classes",
  initialState: {},
  reducers: {
    addclass: (state, action) => {
      const { ref, ts, name, color } = action.payload;
      state[ref.id] = { ts, name, color };
    },
    deleteclass: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      state[ref.id] = null;
    },
    updateclass: (state, action) => {
      const { ref } = action.payload;
      const index = state.indexOf(ref);
      if (index === -1) {
        return { error: "Could not find Id in " };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addclass, deleteclass, updateclass } = classesSlice.actions;

export default classesSlice.reducer;
