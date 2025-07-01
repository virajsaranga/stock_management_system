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

const PurchaseOrderPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get("/purchase-orders", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch purchase order data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar />
        <Typography variant="h4" gutterBottom>
          Purchase Orders
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : orders.length === 0 ? (
          <Alert severity="info">No purchase orders found.</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Order ID</strong></TableCell>
                  <TableCell><strong>Item</strong></TableCell>
                  <TableCell><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.itemName}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
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

export default PurchaseOrderPage;
