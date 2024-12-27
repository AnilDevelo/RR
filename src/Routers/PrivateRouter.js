import React from 'react';
import { Navigate } from 'react-router-dom';
import {isAuthenticated} from "../utils";
const PrivateRouters = ({children}) => {
    let token = isAuthenticated();
    if (!token) {
      return <Navigate to="/"  />;
    }
    return children;
}

export default PrivateRouters;
