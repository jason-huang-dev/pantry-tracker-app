// src/components/InventoryModal.js
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
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemSupplier, setItemSupplier] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemThreshold, setItemThreshold] = useState('');

  const resetFields = () => {
    setItemId('');
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemSupplier('');
    setItemCategory('');
    setItemQuantity('');
    setItemThreshold('');
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
            id="description-filter"
            label="Item Description"
            value={itemDescription}
            setValue={setItemDescription}
            options={inventory}
            filterKey="description"
            optionKey="description"
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
            id="supplier-filter"
            label="Item Supplier"
            value={itemSupplier}
            setValue={setItemSupplier}
            options={inventory}
            filterKey="supplier"
            optionKey="supplier"
          />
          <AutocompleteField
            id="category-filter"
            label="Item Category"
            value={itemCategory}
            setValue={setItemCategory}
            options={inventory}
            filterKey="category"
            optionKey="category"
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
          <AutocompleteField
            id="threshold-filter"
            label="Refill Threshold"
            value={itemThreshold}
            setValue={setItemThreshold}
            options={inventory}
            filterKey="threshold"
            optionKey="threshold"
          />
          <Button
            variant="outlined"
            onClick={() => {
              addItem({
                id: itemId,
                item_name: itemName,
                description: itemDescription,
                price: parseFloat(itemPrice),
                supplier: itemSupplier,
                category: itemCategory,
                threshold: parseInt(itemThreshold),
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
