import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux'
import { loginThunk } from '../actions/auth'
import { Form, Button, Segment, Header } from 'semantic-ui-react'
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
        <div className="container">
            <Segment className="login-segment">
                <Header size="large">Employee Management System</Header>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field>
                        <label>Username</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="username"
                            value={state.username}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="password"
                            name="password"
                            value={state.password}
                        />
                    </Form.Field>
                    <Button color="primary" type="submit">Login</Button>
                </Form>
            </Segment>
        </div>
    )
}

export default Login