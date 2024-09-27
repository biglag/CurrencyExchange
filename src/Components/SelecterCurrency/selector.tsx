import { Autocomplete, Box, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useState } from 'react';

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (currency: string) => void;
  options: string[];
}

export const CurrencySelector: FC<CurrencySelectorProps> = ({ currency, setCurrency, options }) => {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Box sx={{ minWidth: 200 }}>
      <Autocomplete
        value={currency}
        onChange={(_event, newValue) => {
          if (newValue) {
            setCurrency(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        disableClearable
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
                color: '#0d47a1'
              }
            }}
          />
        )}
        autoHighlight
        fullWidth
      />
    </Box>
  );
};
