import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export default function Header({ title }) {
  return (
    <Box sx={{ flexGrow: 1 }} position="relative">
      <AppBar position="relative">
        <Toolbar>
          <IconButton size="medium">
            <Menu fontSize="large" />
          </IconButton>
          <List>
            <ListItem>
              <Typography variant="h5" fontWeight="bold" >{title}</Typography>
            </ListItem>
          </List>
        </Toolbar>
        <Drawer open={false}>
          <p>Content</p>
        </Drawer>
      </AppBar>
    </Box>
  );
}
