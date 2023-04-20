import * as React from 'react';
import { useNavigate} from 'react-router-dom'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Copyright from './Copyrights';
import axios from 'axios';
import Exceptions from '../handlers/Exceptions';
// import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import { useLogin } from '../LoginProvider'
const API_URL = "http://127.0.0.1:3001/api/v1";

const theme = createTheme();
  

export default function SignIn() {
  const { handleLogin } = useLogin();
  const navigate = useNavigate();
  // console.log('props: ', props);
  const [showError, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageType, setMessageType] = useState("success");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const body = JSON.stringify({ email: data.get('email'), password: data.get('password') });
      const customConfig = {
          headers: {
          'Content-Type': 'application/json'
          }
      };
      const result = await axios.post(`${API_URL}/users/sign_in`, body, customConfig);
      
      localStorage.setItem('user-data', JSON.stringify(result.data.user));

      setMessageType('success');
      setError(true);
      setMessage("Login Success!");
      handleLogin();
      navigate('/')
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Exceptions showError={showError} message={message} messageType={messageType} />
    </ThemeProvider>
  );
}