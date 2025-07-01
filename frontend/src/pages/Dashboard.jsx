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
    { title: "Manage Stock", description: "Add, update, or remove stock items.", path: "/stockitems" },
    { title: "Purchase Orders", description: "View and manage purchase orders.", path: "/purchase-orders" },
    { title: "Slips", description: "View and generate stock-in and stock-out slips.", path: "/slip-view" },
    { title: "Reports", description: "View stock summary and reports.", path: "/reports" },
    { title: "Add Procurement", description: "Create a new procurement request.", path: "/procurements/add" },
  ];

  return (
    <Container>
      <Box mt={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Welcome Admin! Select an action to manage the system.
        </Typography>

        <Paper elevation={0} sx={{ padding: 3, backgroundColor: "#f5f7fa", borderRadius: 2, mt: 4 }}>
          <Grid container spacing={3}>
            {actions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  elevation={4}
                  sx={{
                    transition: "0.3s",
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ backgroundColor: "#1976d2", fontWeight: 600 }}
                      onClick={() => navigate(action.path)}
                    >
                      Go
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
