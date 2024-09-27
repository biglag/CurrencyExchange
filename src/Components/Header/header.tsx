import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export function Header() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', color: '#0d47a1' }}
      >
        Currency Converter
      </Typography>
      <Typography
        variant='subtitle1'
        sx={{ color: grey[500] }}
      >
        Check live rates and convert
      </Typography>
    </Box>
  );
}
