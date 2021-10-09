import React, { useEffect } from 'react'
import { Redirect, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyThunk } from "../../actions/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(verifyThunk(history))
        if (!auth.isAuthenticated) {
            return <Redirect to="/" />
        }
        if (!auth.isAuthenticated === 'admin') {
            return <Redirect to="/user" />
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route {...rest} render={props => {
            return <Component {...props} />
        }} />
    )
}

export default AdminRoute