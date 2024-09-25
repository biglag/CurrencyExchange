import { Autocomplete, Box, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (currency: string) => void;
  options: string[];
}

export function CurrencySelector({ currency, setCurrency, options }: CurrencySelectorProps) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Autocomplete
        value={currency}
        onChange={(_event, newValue) => {
          setCurrency(newValue || '');
        }}
        inputValue={currency}
        onInputChange={(_event, newInputValue) => {
          setCurrency(newInputValue);
        }}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Currency'
            variant='outlined'
            sx={{
              backgroundColor: '#f0f0f0',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '& label': {
                color: grey[500]
              },
              '&.Mui-focused label': {
                color: '#4c4efd'
              }
            }}
          />
        )}
        autoHighlight
        fullWidth
      />
    </Box>
  );
}
