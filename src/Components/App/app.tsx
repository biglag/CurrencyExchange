import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { useGetConversionRateQuery } from '../../services/currencyApi';
import { useGetSupportedCurrenciesQuery } from '../../services/listApi';
import { Input } from '../AmountInput/AmountInput';
import ExchangeRate from '../ExchangeRate';
import Header from '../Header';

import CurrencySelector from '../SelecterCurrency';
import { MyTimer } from '../Timer/UpdateTimer';

export function App() {
  const [currency1, setCurrency1] = useState<string>('USD');
  const [currency2, setCurrency2] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const { data: currencies, isLoading: isLoadingCurrencies } = useGetSupportedCurrenciesQuery({});

  const currenciesList = (currencies || []).map((currency) => ({ code: currency, name: currency }));
  const isCurrencyValid = (currency: string) => currenciesList.some((c) => c.code === currency);

  const { data: conversionRates, isLoading: isLoadingRates } = useGetConversionRateQuery(
    {
      currencies: currency2,
      base_currency: currency1
    },
    { skip: !isCurrencyValid(currency1) || !isCurrencyValid(currency2) }
  );

  useEffect(() => {
    if (conversionRates && conversionRates.data[currency2]) {
      const rate2 = parseFloat(conversionRates.data[currency2].value.toFixed(2));
      setLastUpdate(conversionRates.meta.last_updated_at);
      setConvertedAmount(rate2 * amount);
    }
  }, [conversionRates, amount, currency2, convertedAmount, currency1]);

  const handleSwap = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
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
            readOnly={false}
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleSwap}
        sx={{ mb: 2, backgroundColor: '#0d47a1', color: 'white', '&:hover': { backgroundColor: '#151e44' } }}
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
            readOnly
          />
        </Grid>
      </Grid>
      {isLoadingCurrencies && <Typography>Loading currencies...</Typography>}
      {isLoadingRates && <Typography>Loading conversion rates...</Typography>}
      <ExchangeRate
        currency1={currency1}
        currency2={currency2}
        rate={conversionRates?.data[currency2]?.value.toFixed(2)}
      />
      {lastUpdate && <MyTimer lastUpdate={lastUpdate} />}
    </Box>
  );
}
