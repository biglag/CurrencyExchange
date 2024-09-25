import { Box, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
interface InputProps {
  amount: number;
  setAmount: (value: number) => void;
}
export function Input({ amount, setAmount }: InputProps) {
  const [value, setValue] = useState<number | ''>('');
  const [error, setError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === '') {
      setValue('');
      setError(false);
      setAmount(0);
      return;
    }

    const numberValue = Number(inputValue);
    if (isNaN(numberValue) || numberValue < 0) {
      setError(true);
    } else {
      setError(false);
      setValue(numberValue);
      setAmount(numberValue);
    }
  };

  useEffect(() => {
    setValue(amount);
  }, [amount]);

  return (
    <Box>
      <TextField
        variant='outlined'
        type='number'
        value={value === '' ? '' : value}
        onChange={handleChange}
        error={error}
        helperText={error ? 'Please enter a valid number' : ''}
        size='small'
        sx={{
          width: '150px',
          backgroundColor: grey[200],
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '& .MuiInputBase-root': {
            backgroundColor: grey[300]
          }
        }}
        InputProps={{ style: { border: 'none' } }}
      />
    </Box>
  );
}
