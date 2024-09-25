import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useGetConversionRateQuery } from '../../services/currencyApi';
import { useGetSupportedCurrenciesQuery } from '../../services/listApi';
import Input from '../AmountInput/index';
import Header from '../Header/index';
import { CurrencySelector } from '../SelecterCurrency/selector';

export function App() {
  const [currency1, setCurrency1] = useState<string>('USD');
  const [currency2, setCurrency2] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const { data: currencies, isLoading: isLoadingCurrencies } = useGetSupportedCurrenciesQuery({});
  const currenciesList = currencies || [];

  const currenciesString = `${currency1},${currency2}`;
  const { data: conversionRates, isLoading: isLoadingRates } = useGetConversionRateQuery({
    currencies: currenciesString
  });

  const handleSwap = () => {
    if (conversionRates && conversionRates[currency2]) {
      const rate = conversionRates[currency2].value;
      setConvertedAmount(amount * rate);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '450px',
        margin: '0 auto'
      }}
    >
      <Header />
      <Grid
        container
        spacing={2}
        alignItems='center'
        sx={{ mb: 3 }}
      >
        <Grid size={{ xs: 6 }}>
          <CurrencySelector
            currency={currency1}
            setCurrency={setCurrency1}
            options={currenciesList}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Input
            amount={amount}
            setAmount={setAmount}
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleSwap}
        sx={{ mb: 2, backgroundColor: '#1f2766', color: 'white', '&:hover': { backgroundColor: '#151e44' } }}
        startIcon={<SyncAltIcon />}
      >
        <Typography
          variant='button'
          sx={{ fontWeight: 'bold' }}
        >
          Swap
        </Typography>
      </Button>
      <Grid
        container
        spacing={2}
        alignItems='center'
      >
        <Grid size={{ xs: 6 }}>
          <CurrencySelector
            currency={currency2}
            setCurrency={setCurrency2}
            options={currenciesList}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Input
            amount={convertedAmount || 0}
            setAmount={setConvertedAmount}
          />
        </Grid>
      </Grid>
      {isLoadingCurrencies && <Typography>Loading currencies...</Typography>}
      {isLoadingRates && <Typography>Loading conversion rates...</Typography>}
      {convertedAmount !== null && (
        <Typography
          variant='h6'
          sx={{ marginTop: '10px' }}
        >
          Converted Amount: {convertedAmount.toFixed(2)} {currency2}
        </Typography>
      )}
    </Box>
  );
}
