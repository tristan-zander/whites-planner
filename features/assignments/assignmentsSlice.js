import { createSlice } from "@reduxjs/toolkit";

export const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {},
  reducers: {
    addAssignment: (state, action) => {
      const { ref, ts, title, desc, dueDate, classId } = action.payload;
      state[ref.id] = { ref, ts, title, desc, dueDate, classId };
    },
    deleteAssignment: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      state[ref.id] = null;
    },
    updateAssignment: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
