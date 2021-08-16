import React, { useEffect } from 'react'
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyThunk } from "../../actions/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(verifyThunk(window.localStorage.getItem('jwt')))
    }, [dispatch])

    return (
        <Route {...rest} render={props => {
            if (!auth.isAuthenticated) {
                return <Redirect to="/login" />
            }

            if (!auth.role === 'admin') {
                return <Redirect to="/home" />
            }

            return <Component {...props} />
        }} />
    )
}

export default AdminRoute