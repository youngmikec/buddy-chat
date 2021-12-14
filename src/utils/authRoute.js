import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';


const AuthRoute = ({ element: Element, authenticated, ...rest}) => {
    // return (<Route 
    //     {...rest}
    //     render={(props) => authenticated === true ? <Navigate to="/" /> : <Element {...props} />}
    // />)
    return authenticated === true ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute;
