import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useTimer } from 'react-timer-hook';

interface MyTimerProps {
  lastUpdate: string;
}
function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        sx={{ color: blue[900] }}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant='caption'
          component='div'
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}h`}</Typography>
      </Box>
    </Box>
  );
}

export const MyTimer: React.FC<MyTimerProps> = ({ lastUpdate }) => {
  const expiryTime = new Date(lastUpdate);
  expiryTime.setHours(expiryTime.getHours() + 24);

  const { hours } = useTimer({
    expiryTimestamp: expiryTime,
    onExpire: () => console.warn('Timer expired')
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
      <CircularProgressWithLabel value={hours} />
      <Typography
        variant='body1'
        sx={{ fontWeight: 'bold', marginLeft: '10px', color: '#0d47a1' }}
      >
        Last updated: {new Date(lastUpdate).toLocaleString('en-US', { timeZone: 'UTC' })}
      </Typography>
    </Box>
  );
};
