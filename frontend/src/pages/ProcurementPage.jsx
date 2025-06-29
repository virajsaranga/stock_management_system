import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
} from "@mui/material";

const ProcurementPage = () => {
  const { user } = useContext(AuthContext);
  const [procurements, setProcurements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcurements = async () => {
      try {
        const response = await axios.get("/procurements", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setProcurements(response.data);
      } catch (err) {
        setError("Failed to fetch procurement data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProcurements();
  }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar />
        <Typography variant="h4" gutterBottom>
          Procurement Details
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : procurements.length === 0 ? (
          <Alert severity="info">No procurement records found.</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Item Name</strong></TableCell>
                  <TableCell><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {procurements.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ProcurementPage;
