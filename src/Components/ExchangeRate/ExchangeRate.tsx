import { Box, Typography } from '@mui/material';

interface ExchangeRateProps {
  rate: number | undefined | string;
  currency1: string;
  currency2: string;
}
export function ExchangeRate({ rate, currency1, currency2 }: ExchangeRateProps) {
  return (
    <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 'bold', color: '#0d47a1' }}
      >
        1 {currency1} = {rate} {currency2}
      </Typography>
    </Box>
  );
}
