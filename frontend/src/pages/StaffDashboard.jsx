import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "staff") {
      navigate("/unauthorized");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const actions = [
    {
      title: "Add Procurement",
      description: "Create a new procurement entry.",
      path: "/procurements/add",
    },
    {
      title: "Stock Items",
      description: "View all current stock items.",
      path: "/stockitems",
    },
    {
      title: "Procurement Records",
      description: "Review all your procurements.",
      path: "/procurements",
    },
  ];

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Staff Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Welcome {user.name || user.username}! Select an action to perform your tasks.
        </Typography>

        <Grid container spacing={3} mt={2}>
          {actions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{action.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
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

export default StaffDashboard;
