import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios'

function Reimbursement() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        amount: null,
        reason: "",
        date: null
    })

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'amount') {
            if (value > 99999.99) {
                value = 99999.99
            } else if (value < 0) {
                value = 0
            }
        }
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        try {
            const body = {
                amount: state.amount,
                reason: state.reason,
                date: state.date.format('YYYY-MM-DD'),
                employeeId: auth.id
            }
            const res = await axios.post('/api/reimbursement', body)
            dispatch(popMessage(res.data.success, 'success'))
            setState({
                amount: null,
                date: null,
                reason: ""
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
            console.log(err)
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={5}>
                <Card>
                    <CardHeader title="Reimbursement Application Form" />
                    <CardContent>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DesktopDatePicker
                                label="Date"
                                value={state.date}
                                onChange={(newValue) => { setState(prevState => { return { ...prevState, date: newValue } }) }}
                                renderInput={(params) => <TextField fullWidth margin="normal" size="small"{...params} />}
                            />
                        </LocalizationProvider>
                        <TextField fullWidth margin="normal" size="small" multiline rows={3} label="Reason" name="reason" type="number" value={state.reason} onChange={handleChange} />
                        <TextField fullWidth margin="normal" size="small" label="Amount" name="amount" type="number" value={state.amount} onChange={handleChange} />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="success" onClick={handleSubmit}>Apply</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Reimbursement