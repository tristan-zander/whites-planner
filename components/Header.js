import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  MenuList,
  Dialog,
  ClickAwayListener,
} from "@mui/material";
import { Menu as MenuIcon, Add as AddIcon } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardCreatorPanel from "./BoardCreatorPrompt";

export default function Header({ title }) {
  const context = useSelector((state) => state.context);
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const [panel, setPanel] = useState(null);

  function handleClose() {
    setOpenMenu(false);
    setAnchorElement(null);
    setPanel(null);
  }

  function openBoardCreationPanel() {
    setOpenMenu(false);
    setPanel(<BoardCreatorPanel open={true} onClose={() => setPanel(null)} />);
  }

  return (
    <Box sx={{ flexGrow: 1 }} position="relative">
      <AppBar position="relative">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton size="medium" onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ mx: 2 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            variant="contained"
            color="info"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: 1,
            }}
            onClick={(e) => {
              setAnchorElement(e.currentTarget);
              setOpenMenu(!openMenu);
            }}
          >
            <AddIcon color="primary.dark" />
            <Typography color="white">New</Typography>
          </Button>
          <IconButton>
            <Avatar alt="user" src={context.profile?.imageUrl} />
          </IconButton>
          <Menu open={openMenu} anchorEl={anchorElement} onClose={handleClose}>
            <MenuList>
              <MenuItem
                onClick={() => {
                  openBoardCreationPanel();
                }}
              >
                Create Board
              </MenuItem>
              <MenuItem onClick={handleClose}>Add New List</MenuItem>
              <MenuItem onClick={handleClose}>New Assignment</MenuItem>
            </MenuList>
          </Menu>
        </Toolbar>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <p>Content</p>
        </Drawer>
      </AppBar>
      {panel}
    </Box>
  );
}
