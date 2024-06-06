import { useAuth } from "../../Hooks/UseAuth";
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function SecuredRoute(){
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/user-login" />;
}
export default SecuredRoute;