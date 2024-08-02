// src/components/RemoveQuantityModal.js
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const RemoveQuantityModal = ({ open, handleClose, quantity, setQuantity, handleRemove }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, mx: 'auto', my: '20vh', maxWidth: 400 }}>
        <Typography variant="h6" component="h2">
          Remove Quantity
        </Typography>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          margin="normal"
          fullWidth
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleRemove}>
            Remove
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

RemoveQuantityModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default RemoveQuantityModal;
