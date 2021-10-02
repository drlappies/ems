import React from 'react';
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import '../css/main.css'

function Head() {
    const auth = useSelector(state => state.auth)
    const drawerWidth = 240;
    if (!auth.isAuthenticated) return null

    return (
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
            </Toolbar>
        </AppBar>
    )
}

export default Head