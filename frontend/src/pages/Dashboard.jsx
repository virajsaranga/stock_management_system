import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Manage Stock",
      description: "Add, update, or remove stock items.",
      path: "/stockitems",
    },
    {
      title: "Purchase Orders",
      description: "View and manage purchase orders.",
      path: "/purchase-orders",
    },
    {
      title: "Slips",
      description: "View and generate stock-in and stock-out slips.",
      path: "/slip-view",
    },
    {
      title: "Reports",
      description: "View stock summary and reports.",
      path: "/reports",
    },
    // Add more as needed
  ];

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Welcome Admin! Select an action to manage the system.
        </Typography>

        <Grid container spacing={3} mt={2}>
          {actions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{action.title}</Typography>
                  <Typography variant="body2">{action.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(action.path)}
                  >
                    Go
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
