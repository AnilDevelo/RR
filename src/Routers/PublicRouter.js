

import React from 'react';
import { Navigate } from 'react-router-dom';
import {isAuthenticated} from "../utils";

const PublicRouters = ({ isAuth, children }) => {
    let token = isAuthenticated();
    if (token) {
        return <Navigate to={'/dashboard'} />;
    }
    return children;
}
export default PublicRouters;
