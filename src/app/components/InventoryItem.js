// src/components/InventoryItem.jsx
import { Box, Typography, Button } from '@mui/material';

const InventoryItem = ({ name, quantity, removeItem }) => {
  return (
    <Box
      width="100%"
      minHeight="150px"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgcolor={'#f0f0f0'}
      paddingX={5}
    >
      <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
      <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
        Quantity: {quantity}
      </Typography>
      <Button variant="contained" onClick={() => removeItem(name)}>
        Remove
      </Button>
    </Box>
  );
};

export default InventoryItem;
