import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux'
import { loginThunk } from '../actions/auth'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/main.css'

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginThunk(state.username, state.password, history))
    }

    return (
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{ minHeight: '90vh' }}>
            <Grid item>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader title="Employee Management System" subheader="demo" />
                        <CardContent>
                            <TextField margin="normal" fullWidth variant="standard" label="Username" type="text" name="username" onChange={(e) => handleChange(e)} />
                            <TextField margin="normal" fullWidth variant="standard" label="Password" type="password" name="password" onChange={(e) => handleChange(e)} />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" type="submit">Login</Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login