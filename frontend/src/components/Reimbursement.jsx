import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popErrorMessage, popSuccessMessage } from '../actions/ui';
import { Grid, Form, Header } from 'semantic-ui-react'
import axios from 'axios'

function Reimbursement() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        amount: 0,
        reason: "",
        date: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const body = {
                amount: state.amount,
                reason: state.reason,
                date: state.date,
                employeeId: auth.id
            }
            const res = await axios.post('/reimbursement', body)
            dispatch(popSuccessMessage(res.data.success))
            setState({
                amount: 0,
                date: "",
                reason: ""
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
            console.log(err)
        }
    }

    return (
        <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header>Reimbursement Application Portal</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Field>
                            <label htmlFor="amount">Reimubursement Amount:</label>
                            <input id="amount" name="amount" type="number" value={state.amount} onChange={(e) => handleChange(e)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="reason">Reason:</label>
                            <input id="reason" name="reason" type="text" value={state.reason} onChange={(e) => handleChange(e)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="date">Date</label>
                            <input id="date" name="date" type="date" value={state.date} onChange={(e) => handleChange(e)} />
                        </Form.Field>
                        <Form.Button color="green">Apply</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Reimbursement