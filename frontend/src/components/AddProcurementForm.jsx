import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../auth/AuthContext";

const AddProcurementForm = ({ onProcurementAdded }) => {
  const { user } = useContext(AuthContext);
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const validateForm = () => {
    if (!supplier.trim()) return "Supplier name is required.";
    for (const item of items) {
      if (!item.name.trim()) return "Item name is required.";
      if (item.quantity <= 0 || item.price < 0)
        return "Quantity must be > 0 and Price ≥ 0.";
    }
    return null;
  };

 const handleSubmit = async () => {
  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    setSuccess("");
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    console.log("Token: ", user?.token);
    const response = await fetch("http://localhost:5000/api/procurements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        reference: `PR-${Date.now()}`, 
        date: new Date().toISOString(),
        items: items.map((i) => ({
          stockItem: i.name, 
          quantity: i.quantity,
          price: i.price,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(errorText || "Failed to create procurement.");
    }

    const data = await response.json();
    onProcurementAdded();
    setSuccess("Procurement created successfully.");
    setSupplier("");
    setItems([{ name: "", quantity: 1, price: 0 }]);
  } catch (err) {
    setError(err.message || "Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Procurement
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        label="Supplier"
        fullWidth
        margin="normal"
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
        required
      />

      {items.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
          <TextField
            label="Item Name"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            fullWidth
            required
          />
          <TextField 
            label="Quantity"
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", parseInt(e.target.value))
            }
            required
            sx={{ width: "120px" }}
          />
          <TextField
            label="Price"
            type="number"
            value={item.price}
            onChange={(e) =>
              handleChange(index, "price", parseFloat(e.target.value))
            }
            required
            sx={{ width: "120px" }}
          />
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleRemoveItem(index)}
            disabled={items.length === 1}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box display="flex" gap={2} mb={2}>
        <Button onClick={handleAddItem} variant="outlined">
          Add Item
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Procurement"}
        </Button>
      </Box>

      <Divider />
    </Paper>
  );
};

export default AddProcurementForm;
