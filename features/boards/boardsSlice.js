import { addError } from "@features/context/contextSlice";
import { DBContext } from "@features/database";
import {
  normalizeRef,
  undoNormalizeDbObject,
  undoNormalizeRef,
} from "@features/normalize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const saveListRefToBoard = createAsyncThunk(
  "boards/saveListRefToBoard",
  async (req, thunkAPI) => {
    try {
      const { boardRef, listRef } = req;
      if (!boardRef) {
        thunkAPI.rejectWithValue({ error: "Board Reference not provided." });
      }

      if (!listRef) {
        thunkAPI.rejectWithValue({ error: "List Reference not provided." });
      }

      const state = thunkAPI.getState();
      const token = state.context?.token;
      if (!token) {
        thunkAPI.rejectWithValue({ error: "No token exists in the state." });
      }

      // TODO: Make this generic and control it within the slice
      const board = state.boards[boardRef.id];
      if (!board) {
        thunkAPI.rejectWithValue({
          error: "Invalid board ID provided.",
          data: req.boardRef,
        });
      }

      // TODO: Generate skeleton and enable loading animation.

      const newList = [
        ...board.lists.map(undoNormalizeRef),
        undoNormalizeRef(listRef),
      ];

      const database = new DBContext(token);
      const res = await database.update({ ...board, lists: newList });
      thunkAPI.dispatch(updateBoard(res));
      thunkAPI.fulfillWithValue(res);
    } catch (e) {
      thunkAPI.dispatch(addError(e));
      thunkAPI.rejectWithValue(e);
    }
  }
);

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
    // Make sure these values are normalized
    addListRefToBoard: (state, action) => {
      const { ref, boardRef } = action.payload;

      state[boardRef.id].lists.push(ref);
    },
  },
});

export const { addBoard, deleteBoard, updateBoard, addListRefToBoard } =
  boardsSlice.actions;

export default boardsSlice.reducer;
