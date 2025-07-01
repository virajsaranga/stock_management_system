import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: "Procurements", icon: <ShoppingCartIcon />, path: "/procurements" },
    { text: "Purchase Orders", icon: <AssignmentIcon />, path: "/purchase-orders" },
    { text: "Goods Receipt", icon: <ReceiptIcon />, path: "/slip-view" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Manager Panel
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
