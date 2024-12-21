import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRender = ({pathValue}) => {
    const userRole = JSON.parse(localStorage.getItem("user_role"))
    if (pathValue.roles.includes(userRole)) {
        return pathValue.component;
    }
    if(pathValue.path === "/"){
        return pathValue.component;
    }
    return <Navigate to="/" replace />; 
}

export default RoleBasedRender