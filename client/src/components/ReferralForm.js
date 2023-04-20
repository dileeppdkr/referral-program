import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Link, useNavigate} from 'react-router-dom'; 
import SportsOutlinedIcon from '@mui/icons-material/SportsOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Exceptions from '../handlers/Exceptions';
const API_URL = "http://127.0.0.1:3001/api/v1";

const theme = createTheme();

export default function SignIn() {
  // const navigate = useNavigate();
  const [showError, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageType, setMessageType] = useState("success");

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const userData = JSON.parse(localStorage.getItem('user-data'));
      const body = JSON.stringify({ email: data.get('email'), id: userData ? userData.id : null });
      const customConfig = {
          headers: {
          'Content-Type': 'application/json'
          }
      };
      await axios.post(`${API_URL}/referrals`, body, customConfig);
      
      // localStorage.setItem('user-data', JSON.stringify(result.data.user));

      setMessageType('success');
      setError(true);
      setMessage(`Referral request sent to ${data.get('email')}`);
      // navigate('/')
    } catch (error) {
      console.log('result: ', error.response.data.error);
      setMessageType('error');
      setError(true);
      setMessage(error.response.data.error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SportsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Refer a Friend
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Refer
            </Button>
            
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <Exceptions showError={showError} message={message} messageType={messageType} />
    </ThemeProvider>
  );
}