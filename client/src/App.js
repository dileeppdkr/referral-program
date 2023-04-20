// import logo from './logo.svg';
import './App.css';
// import Navbar from './components/Navbar';

import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'; 
import { useState } from 'react'
import SignUp from './components/SignUp';
import Login from './components/Login';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import ReferralForm from './components/ReferralForm';
// const value: string = window.localStorage.getItem('gridGrid');
import Home from './components/Home';
import { useLogin } from './LoginProvider'
// import PrivateRoute from './components/PrivateRoute';




function App(props) {
  const { isLoggedIn, handleLogout } = useLogin();
  console.log('isLoggedIn:sss ', isLoggedIn);
  // const userAuth = JSON.parse(localStorage.getItem('user-data'));
  const handelLogout = ()=>{
    localStorage.clear();
    handleLogout();
    props.navigation.push('Login')
  }
  const PrivateRoute = (Component) => {
    // const userAuth = JSON.parse(localStorage.getItem('user-data'));
    return isLoggedIn ? <Outlet /> : <Navigate to="/Login" />;
  }
  return (
    <div style={{marginTop: '10%'}}>
      <AppBar component="nav">
        <Toolbar>
          <List>
            <ListItem>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText>
                <Link to="/" style={{color: '#FFF'}}>Home</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          
          { !isLoggedIn && 
            <>
              <List>
                <ListItem>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText>
                    <Link to="/Login" style={{color: '#FFF'}}>Login</Link>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText>
                    <Link to="/SignUp" style={{color: '#FFF'}}>Signup</Link>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </>
            
          }
            
        { isLoggedIn && 
          <>
            <List>
              <ListItem>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText>
                  <Link to="/" style={{color: '#FFF'}} onClick={handelLogout}>Logout</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </>
        }
          
        </Toolbar>
      </AppBar>
      <Routes>
        {/* <Route path="/" element={<PrivateRoute/>} /> */}
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/SignUp" element={<SignUp />} />
        {/* <Route path="/" element={<PrivateRoute Component={Home} />} /> */}
        {/* <Route path="/" element={<Home />}/> */}
        {/* <Route exact path='/' element={<PrivateRoute/>}>

        </Route> */}
        
      </Routes>
    {/* <Navbar aboutText="Menu" /> */}
    {/* <Home aboutText="Home" /> */}
    
  </div>
  );
}

export default App;
