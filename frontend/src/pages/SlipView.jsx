import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";

const SlipView = () => {
  const { poId } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchSlipData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/purchaseorders/${poId}`);
        setPurchaseOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch slip:", err);
      }
    };

    fetchSlipData();
  }, [poId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!purchaseOrder) {
    return <Typography>Loading slip...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper ref={componentRef} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Purchase Slip
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">
          <strong>Reference Number:</strong> {purchaseOrder.referenceNo}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong> {new Date(purchaseOrder.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Supplier:</strong> {purchaseOrder.supplierName}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Item Name</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Unit Price</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrder.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>Rs. {item.unitPrice}</TableCell>
                <TableCell>Rs. {item.quantity * item.unitPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 2 }} />

        <Typography align="right" sx={{ mt: 2 }}>
          <strong>Total Cost:</strong> Rs. {purchaseOrder.totalCost}
        </Typography>

        <Typography variant="body2" sx={{ mt: 4 }}>
          ___________________________
        </Typography>
        <Typography variant="body2">Authorized Signature</Typography>
      </Paper>

      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Print Slip
      </Button>
    </Container>
  );
};

export default SlipView;
