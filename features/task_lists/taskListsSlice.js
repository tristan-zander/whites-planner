import { saveListRefToBoard } from "@features/boards/boardsSlice";
import { addError } from "@features/context/contextSlice";
import { DBContext } from "@features/database";
import { normalizeDbObject, normalizeRef } from "@features/normalize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTaskList = createAsyncThunk(
  "taskLists/createTaskListAsync",
  async (req, thunkAPI) => {
    const token = thunkAPI.getState().context?.token;
    if (!token) {
      thunkAPI.rejectWithValue({ error: "No token exists in the state." });
    }
    const database = new DBContext(token);
    try {
      const res = await database.create({ data: req, collection: "TaskList" });
      thunkAPI.dispatch(addTaskList(res));
      thunkAPI.dispatch(
        saveListRefToBoard({
          boardRef: res.board,
          listRef: res.ref,
        })
      );
      thunkAPI.fulfillWithValue(res);
    } catch (e) {
      thunkAPI.dispatch(addError(e));
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const taskListsSlice = createSlice({
  name: "taskLists",
  initialState: {},
  reducers: {
    addTaskList: (state, action) => {
      const { ref, board } = action.payload;

      // If it exists, then don't do anything.
      if (state[ref.id]) {
        throw new Error("TaskList already exists.");
      }

      state[ref.id] = action.payload;
      if (board) {
        state[ref.id].board = normalizeRef(board);
      }
    },
    deletetaskList: (state, action) => {
      const { ref } = action.payload;
      if (!ref.id) {
        return { error: "An ID was not provided." };
      }
      delete state[ref.id];
    },
    updatetaskList: (state, action) => {
      const { ref } = action.payload;
      state[ref.id] = action.payload;
    },
    moveAssignment: (state, action) => {
      const { assignment, from, to, destIndex } = action.payload;
      const oldIndex = state[from.ref.id].assignments.indexOf({
        id: assignment.ref.id,
      });
      state[from.ref.id].assignments.splice(oldIndex, 1);

      state[to.ref.id].assignments.splice(destIndex, 0, {
        id: assignment.ref.id,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTaskList.pending, (state, action) => {});
    builder.addCase(createTaskList.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const { addTaskList, deletetaskList, updatetaskList, moveAssignment } =
  taskListsSlice.actions;

export default taskListsSlice.reducer;
