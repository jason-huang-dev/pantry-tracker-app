'use client'
import { useState } from 'react';
import { Box, Typography, Modal, Button, Stack } from '@mui/material';
import AutocompleteField from './AutocompleteField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const InventoryModal = ({ inventory, open, handleClose, addItem }) => {
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const resetFields = () => {
    setItemId('');
    setItemName('');
    setItemPrice('');
    setItemQuantity('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={'column'} spacing={1}>
          <AutocompleteField
            id="id-filter"
            label="Item ID"
            value={itemId}
            setValue={setItemId}
            options={inventory}
            filterKey="id"
            optionKey="id"
          />
          <AutocompleteField
            id="name-filter"
            label="Item Name"
            value={itemName}
            setValue={setItemName}
            options={inventory}
            filterKey="item_name"
            optionKey="item_name"
          />
          <AutocompleteField
            id="price-filter"
            label="Item Price (5.95)"
            value={itemPrice}
            setValue={setItemPrice}
            options={inventory}
            filterKey="price"
            optionKey="price"
          />
          <AutocompleteField
            id="quantity-filter"
            label="Item Quantity"
            value={itemQuantity}
            setValue={setItemQuantity}
            options={inventory}
            filterKey="quantity"
            optionKey="quantity"
          />
          <Button
            variant="outlined"
            onClick={() => {
              addItem({
                id: itemId,
                item_name: itemName,
                price: parseFloat(itemPrice),
                quantity: parseInt(itemQuantity),
              });
              resetFields();
              handleClose();
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default InventoryModal;
