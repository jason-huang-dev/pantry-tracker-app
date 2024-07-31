// src/pages/index.js
'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { InventoryModal, InventoryTable } from './components';
import { useInventory } from './hooks/';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'item_name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price', format: (value) => `$${value.toFixed(2)}` },
  { id: 'supplier', label: 'Supplier' },
  { id: 'category', label: 'Category' },
  { id: 'threshold', label: 'Refill Threshold' },
  { id: 'quantity', label: 'Quantity' },
];

export default function Home() {
  const {inventory, addItem, removeItem } = useInventory();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <InventoryModal inventory={inventory} open={open} handleClose={handleClose} addItem={addItem} />
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <InventoryTable
        data={inventory}
        columns={columns}
        removeItem={removeItem}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      </Box>
  );
}
