'use client'
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { InventoryModal, InventoryTable} from './components';
import { useInventory } from './hooks';
import { matchSorter } from 'match-sorter';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'item_name', label: 'Name' },
  { id: 'price', label: 'Price', format: (value) => `$${parseFloat(value).toFixed(2)}` },
  { id: 'quantity', label: 'Quantity' , format: (value) => `$${parseInt(value)}`},
];

export default function Home() {
  const { inventory, addItem, removeItem } = useInventory();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          result.data.forEach(row => {
            const item = columns.reduce((acc, column) => {
              let value = row[column.label];
              // Convert values to appropriate types (e.g., number for price and quantity)
              if (column.id === 'price') {
                value = parseFloat(value);
              } else if (column.id === 'quantity') {
                value = parseInt(value, 10);
              }
              acc[column.id] = value || '';
              return acc;
            }, {});
            addItem(item); // Add item to inventory
          });
        },
        error: (error) => console.error(error),
      });
    }
  };

  const filteredInventory = searchQuery
    ? matchSorter(inventory, searchQuery, { keys: columns.map(column => column.id) })
    : inventory;

  // Convert inventory data to CSV-compatible format
  const csvData = filteredInventory.map(item =>
    columns.reduce((acc, column) => {
      acc[column.label] = column.format ? column.format(item[column.id]) : item[column.id];
      return acc;
    }, {})
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      sx={{ bgcolor: 'whitesmoke' }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        margin="dense"
        sx={{ width: '75%' }}
      />
      <Box>
        <InventoryModal inventory={inventory} open={open} handleClose={handleClose} addItem={addItem} />
        <Button variant="contained" onClick={handleOpen} sx={{ marginRight: '1vw' }}>
          Add New Item
        </Button>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button variant="contained" color="primary" component="span">
            Import CSV
          </Button>
        </label>
      </Box>
      <InventoryTable
        data={filteredInventory}
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
      <CSVLink
        data={csvData}
        filename={`inventory_${new Date().toISOString()}.csv`}
        className="csv-link"
      >
        <Button variant="contained" color="secondary">
          Export CSV
        </Button>
      </CSVLink>
    </Box>
  );
}
