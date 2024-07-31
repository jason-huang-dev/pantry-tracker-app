// src/components/TableRowComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Button } from '@mui/material';

const TableRowComponent = ({ item, columns, removeItem }) => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.id}>
          {column.format ? column.format(item[column.id]) : item[column.id]}
        </TableCell>
      ))}
      <TableCell>
        <Button
          variant="contained"
          color="error"
          onClick={() => removeItem(item.id)}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
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
