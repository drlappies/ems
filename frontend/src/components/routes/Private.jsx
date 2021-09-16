import React, { useEffect } from 'react'
import { Redirect, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyThunk } from "../../actions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(verifyThunk(window.localStorage.getItem('jwt'), history))
        if (!auth.isAuthenticated) {
            return <Redirect to="/" />
        }

    }, [auth.isAuthenticated, dispatch, history])

    return (
        <Route {...rest} render={props => {
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute