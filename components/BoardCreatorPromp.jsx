import { useState } from "react";

import {
  ClickAwayListener,
  Button,
  Dialog,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Client as FaunaClient,
  Collection,
  Collections,
  Count,
  Create,
  Documents,
} from "faunadb";
import { addBoard } from "@features/boards/boardsSlice";

export default function BoardCreatorPanel(props) {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.taskLists);
  const user = useSelector((state) => state.context.user);
  const token = useSelector((state) => state.context.token);

  const [close, setClose] = useState(false);

  const [boardName, setBoardName] = useState("Homework");
  const [listsToAdd, setListsToAdd] = useState([]);

  function closeBoardCreationPanel() {
    setClose(true);
    if (props.onClose) props.onClose();
  }

  function handleBoardNameChanged(e) {
    setBoardName(e.target.value);
  }

  function handleSelectChange(e) {
    const {
      target: { value },
    } = e;
    setListsToAdd((prevLists) => {
      // Set to the name of the list
      return [...prevLists, value];
    });
  }

  function submitBoard() {
    if (boardName.length <= 0) {
      console.error("Board name is empty.");
    }

    if (user?.ref == null) {
      throw new Error("User reference cannot be found.");
    }

    const fauna = new FaunaClient({
      secret: token,
    });

    const board = fauna
      .query(
        Create(Collection("Board"), {
          data: {
            owner: user.ref,
            name: boardName,
            lists: [
              // TODO: Get the references of the selected lists.
            ],
            primaryBoard: Count(Documents(Collection("Board"))) == 0,
          },
        })
      )
      .catch(console.error);

    if (board === undefined) {
      console.error("Could not create the board.");
      return;
    }

    console.debug(board);

    dispatch(
      addBoard({
        board: {
          ...board.data,
          ref: board.ref,
          ts: board.ts,
        },
      })
    );

    closeBoardCreationPanel();
  }

  return (
    <Dialog open={!close && props.open}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Create a new board
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl sx={{ m: 2, flexGrow: 1 }}>
            <TextField
              id="board-name"
              label="Board name"
              variant="filled"
              required={true}
              defaultValue="Homework"
              value={boardName}
              onChange={handleBoardNameChanged}
              error={boardName.length <= 0}
            />
          </FormControl>
          <FormControl sx={{ m: 2, flexGrow: 1 }}>
            <InputLabel
              id="board-list-select-label"
              disabled={lists === undefined || Object.keys(lists).length <= 0}
            >
              Add lists
            </InputLabel>
            <Select
              id="board-list-select"
              labelId="board-list-select-label"
              label="Add lists"
              multiple
              disabled={lists === undefined || Object.keys(lists).length <= 0}
              value={listsToAdd}
              onChange={handleSelectChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {lists !== undefined
                ? Object.entries(lists).map(([listId, listData]) => {
                    return (
                      <MenuItem key={listId} value={listData.name}>
                        {listData.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" onClick={submitBoard}>
            Confirm
          </Button>
          <Button onClick={closeBoardCreationPanel}>Close</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
