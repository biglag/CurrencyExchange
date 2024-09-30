import { Autocomplete, Box, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useState } from 'react';

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (currency: string) => void;
  options: Array<{ code: string; name: string }>;
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
        options={options.map((option) => option.code)}
        disableClearable
        renderOption={(props, option) => {
          const countryCode = option.slice(0, 2).toLowerCase();

          return (
            <Box
              component='li'
              sx={{ display: 'flex', alignItems: 'center' }}
              {...props}
            >
              <img
                loading='lazy'
                width='20'
                src={`https://flagcdn.com/w20/${countryCode}.png`}
                srcSet={`https://flagcdn.com/w40/${countryCode}.png 2x`}
                alt=''
                style={{ marginRight: '10px' }}
              />
              {`${options.find((opt) => opt.code === option)?.name} (${option})`}
            </Box>
          );
        }}
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
