// src/components/InventoryTable.js
import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel, TablePagination } from '@mui/material';
import TableRowComponent from './TableRowComponent';


/**
 * 
 * @param {*} param0 
 * @returns a <Paper/> with a data table given the data
 */
const InventoryTable = ({
  data,
  columns,
  removeItem,
  rowsPerPage = 5,
  page = 0,
  setPage,
  order = 'asc',
  orderBy = 'name',
  setOrder,
  setOrderBy,
}) => {
  // Function to handle sorting
  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Function to handle page changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page changes
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort data based on the selected order and property
  const sortedData = React.useMemo(() => {
    return data.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, order, orderBy]);

  // Paginate sorted data
  const paginatedData = React.useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return (
    <Paper elevation={8} sx={{ width: '90%', overflowX: 'auto' }}>
      <Typography variant="h6" component="div" padding={2} sx={{bgcolor:'beige'}}> 
        Inventory
      </Typography>
      <TableContainer style={{ overflowX: 'auto' , maxHeight:'60vh'}}  >
        <Table stickyHeader id="Column-Wise-Table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRowComponent
                  key={item.id}
                  item={item}
                  columns={columns}
                  removeItem={removeItem}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Typography variant="body2" align="center">
                    No items available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

InventoryTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      format: PropTypes.func,
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
};

export default InventoryTable;
