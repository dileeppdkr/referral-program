import * as React from 'react';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Exceptions({showError, message, messageType}) {
  const [open, setOpen] = React.useState(false);
  // const [errorMessage, setErrorMessage] = React.useState('');

  const handleClick = () => {
    setOpen(true);
  };
  useEffect(()=>{
    setOpen(showError);
  }, [message])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '20%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={messageType}>{message}</Alert>
      </Snackbar>
    </Stack>
  );
}
