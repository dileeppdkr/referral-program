import { useState, useContext, createContext, useEffect } from 'react';

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const userData = JSON.parse(localStorage.getItem('user-data'));
    return userData && userData.id ? true : false;
  });
 
  // setIsLoggedIn(userData && userData.id ? true : false);
  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem('user-data'));
  //   setIsLoggedIn(userData && userData.id ? true : false);
  // }, [])
  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    handleLogin,
    handleLogout
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
}

export { LoginProvider, useLogin };