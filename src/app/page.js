// src/pages/index.js
'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { InventoryModal, InventoryList } from './components';
import { useInventory } from './hooks/';

export default function Home() {
  const { inventory, addItem, removeItem } = useInventory();
  const [open, setOpen] = useState(false);

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
      <InventoryModal open={open} handleClose={handleClose} addItem={addItem} />
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <InventoryList inventory={inventory} removeItem={removeItem} />
    </Box>
  );
}
