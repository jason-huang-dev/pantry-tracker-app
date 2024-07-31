import { Autocomplete, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';

const AutocompleteField = ({
  id,
  label,
  value,
  setValue,
  options,
  filterKey,
  optionKey,
}) => {
  const filterOptions = (options, { inputValue }) => 
    matchSorter(options, inputValue, { keys: [filterKey] });

  return (
    <Autocomplete
      freeSolo
      id={id}
      options={options.map(option => option[optionKey])}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      onInputChange={(e, newValue) => setValue(newValue || e.target.value)}
    />
  );
};

export default AutocompleteField;
