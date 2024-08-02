'use client'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Button } from '@mui/material';
import RemoveQuantityModal from './RemoveQuantityModal';

const TableRowComponent = ({ item, columns, removeItem }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setQuantity(0);
    setOpen(false);
  };

  const handleRemove = () => {
    removeItem(item.id, quantity);
    handleClose();
  };

  return (
    <>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id}>
            {column.format ? column.format(item[column.id]) : item[column.id]}
          </TableCell>
        ))}
        <TableCell>
          <Button variant="contained" color="error" onClick={handleOpen}>
            Remove
          </Button>
        </TableCell>
      </TableRow>
      <RemoveQuantityModal
        open={open}
        handleClose={handleClose}
        quantity={quantity}
        setQuantity={setQuantity}
        handleRemove={handleRemove}
      />
    </>
  );
};

TableRowComponent.propTypes = {
  item: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      format: PropTypes.func,
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default TableRowComponent;
