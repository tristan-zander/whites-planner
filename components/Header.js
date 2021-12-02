import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export default function Header({ title }) {
  return (
    <Box sx={{ flexGrow: 1 }} position="relative"  >
      <AppBar>
        <Toolbar>
          <IconButton size="medium" sx={{ mr: 100 }}>
            <Menu fontSize="large" />
          </IconButton>
          <List>
            <ListItem>{title}</ListItem>
          </List>
        </Toolbar>
        <Drawer>
          <p>Content</p>
        </Drawer>
      </AppBar>
    </Box>
  );
}
