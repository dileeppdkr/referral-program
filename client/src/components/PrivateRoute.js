// import { Route, Navigate } from 'react-router-dom';

// function PrivateRoute({ component: Component, auth, ...rest }) {
//   return (
//     <Route {...rest} element={auth ? <Component /> : <Navigate to="/Login" />} />
//   );
// }

// export default PrivateRoute;

import React from 'react'
import { Navigate } from 'react-router-dom'
function PrivateRoute({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
export default PrivateRoute