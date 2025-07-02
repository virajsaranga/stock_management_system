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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const actions = [
    { title: "Manage Stock", description: "Add, update, or remove stock items.", path: "/stockitems" },
    { title: "Purchase Orders", description: "View and manage purchase orders.", path: "/purchase-orders" },
    { title: "Slips", description: "View and generate stock-in and stock-out slips.", path: "/slip-view" },
    { title: "Reports", description: "View stock summary and reports.", path: "/reports" },
    { title: "Add Procurement", description: "Create a new procurement request.", path: "/procurements/add" },
    { title: "Register User", description: "Register a new user (Manager/Staff).", path: "/register-user" },
  ];

  return (
    <Container maxWidth="xl">
      <Box mt={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Welcome Admin! Select an action to manage the system.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            padding: 4,
            backgroundColor: "#f0f4f8",
            borderRadius: 3,
            mt: 4,
          }}
        >
          <Grid container spacing={4}>
            {actions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  elevation={6}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    '&:hover': {
                      transform: "translateY(-6px)",
                      boxShadow: theme.shadows[8],
                    },
                    background: "#ffffff",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", padding: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#1565c0",
                        color: "#fff",
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: "#0d47a1",
                        },
                        paddingY: 1,
                      }}
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
