import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../actions/ui'
import { logoutThunk } from '../actions/auth';
import { Menu } from 'semantic-ui-react'

function Head() {
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    return (
        <Menu inverted size="large" attached="top">
            <Menu.Item onClick={() => dispatch(toggleSidebar())}>
                Menu
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                    Current User: {auth.firstname} {auth.lastname}
                </Menu.Item>
                <Menu.Item>
                    Role: {auth.role}
                </Menu.Item>
                <Menu.Item onClick={() => dispatch(logoutThunk(history))}>
                    Logout
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Head