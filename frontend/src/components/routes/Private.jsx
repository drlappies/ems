import React, { useEffect } from 'react'
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyThunk } from "../../actions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
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

            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute