import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loginThunk } from '../actions/auth'
import { Container, Form, Button, Segment, Grid, Header, GridColumn } from 'semantic-ui-react'
import Popup from './Popup';

function Login() {
    const dispatch = useDispatch()
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
        dispatch(loginThunk(state.username, state.password))
    }

    return (
        <Container>
            <Grid verticalAlign='middle' columns="1">
                <Grid.Row centered>
                    <GridColumn width="7">
                        <Popup />
                    </GridColumn>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column textAlign="center">
                        <Header size="large">Employee Management System</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width="7">
                        <Segment>
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
                                <Button type="submit">Login</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Login