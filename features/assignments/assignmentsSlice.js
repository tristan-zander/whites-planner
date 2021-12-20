import { addError } from "@features/context/contextSlice";
import { DBContext } from "@features/database";
import {
  faunaTimeToISO,
  normalizeRef,
  undoNormalizeRef,
} from "@features/normalize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Time } from "faunadb";

export const saveNewAssignment = createAsyncThunk(
  "assignments/saveNewAssignment",
  async (req, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.context?.token;
      if (!token) {
        thunkAPI.rejectWithValue({ error: "No token exists in the state." });
      }

      // TODO: Trigger loading animation in the correct spot.
      const database = new DBContext(token);
      const res = await database.create({
        data: req,
        collection: "Assignment",
      });
      thunkAPI.dispatch(addAssignment(res));
      thunkAPI.fulfillWithValue(res.ref);
    } catch (e) {
      thunkAPI.dispatch(addError(e));
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const saveUpdateAssignment = createAsyncThunk(
  "assignments/saveNewAssignment",
  async (req, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.context?.token;
      if (!token) {
        thunkAPI.rejectWithValue({ error: "No token exists in the state." });
      }

      const { list, dueDate, ...rest } = req;

      let newData = {
        ...rest,
      };

      if (list) {
        newData.list = undoNormalizeRef(list);
      }
      if (dueDate) {
        newData.dueDate = Time(dueDate);
      }

      // TODO: Trigger loading animation in the correct spot.
      const database = new DBContext(token);
      const res = await database.update(newData);
      thunkAPI.dispatch(updateAssignment(res));
      thunkAPI.fulfillWithValue(res.ref);
    } catch (e) {
      thunkAPI.dispatch(addError(e));
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {},
  reducers: {
    addAssignment: (state, action) => {
      const { ref, list, dueDate } = action.payload;
      state[ref.id] = action.payload;
      if (list) {
        state[ref.id].list = normalizeRef(list);
      }
      if (dueDate && typeof dueDate !== "string") {
        console.debug("FIX THIS assignment due date:", dueDate);
        state[ref.id].dueDate = faunaTimeToISO(dueDate);
      }
    },
    deleteAssignment: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      delete state[ref.id];
    },
    updateAssignment: (state, action) => {
      const { ref, list, dueDate } = action.payload;
      state[ref.id] = action.payload;
      if (dueDate && typeof dueDate !== "string") {
        state[ref.id].dueDate = faunaTimeToISO(dueDate);
      }
      if (list) {
        state[ref.id].list = normalizeRef(list);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
