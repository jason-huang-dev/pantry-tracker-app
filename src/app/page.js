// src/pages/index.js
'use client';

// src/pages/index.js
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { HorizontalTable, VerticalTable} from './components/';
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
  const { inventory, addItem, removeItem } = useInventory();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Determine the viewport size for table orientation
  const [viewportWidth, setViewportWidth] = useState();

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      {viewportWidth < 600 ? (
        <VerticalTable
          data={inventory}
          columns={columns}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
        />
      ) : (
        <HorizontalTable
          data={inventory}
          columns={columns}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
        />
      )}
    </Box>
  );
}
