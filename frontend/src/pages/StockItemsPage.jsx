import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const StockItemsPage = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    unit: "",
    unitPrice: 0,
  });
  const [error, setError] = useState(null);

  // ✅ Get token safely
  const token = localStorage.getItem("token");

  // ✅ Axios config with fallback
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  // ✅ Fetch stock items
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stocks", config);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setError("Failed to load stock items.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "unitPrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!form.name || !form.unit || form.quantity <= 0 || form.unitPrice <= 0) {
        alert("Please fill in all fields with valid values.");
        return;
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/stocks/${editingId}`,
          form,
          config
        );
      } else {
        await axios.post("http://localhost:5000/api/stocks", form, config);
      }

      fetchItems();
      handleClose();
    } catch (err) {
      console.error("Submit failed:", err);
      setError("Failed to submit item. Please check token or server.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
    });
    setEditingId(item._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stocks/${id}`, config);
      fetchItems();
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Delete failed. Check permissions or token.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    setError(null);
  };

  const resetForm = () => {
    setForm({
      name: "",
      quantity: 0,
      unit: "",
      unitPrice: 0,
    });
    setEditingId(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Stock Management
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Item
      </Button>

      {items.length === 0 ? (
        <Typography sx={{ mt: 4 }}>No stock items found.</Typography>
      ) : (
        <Table sx={{ marginTop: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>{item.quantity * item.unitPrice}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Edit Item" : "Add New Item"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Unit (e.g., kg, pcs)"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Unit Price"
            name="unitPrice"
            type="number"
            value={form.unitPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StockItemsPage;
