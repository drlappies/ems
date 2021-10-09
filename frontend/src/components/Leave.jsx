import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import axios from 'axios';
import '../css/main.css'

function Leave() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        date: [null, null],
        reason: "",
        type: "",
        span: ""
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
                employeeId: auth.id,
                reason: state.reason,
                from: state.date[0] ? state.date[0].format('YYYY-MM-DD') : null,
                to: state.date[1] ? state.date[1].format('YYYY-MM-DD') : null,
                duration: state.span,
                type: state.type
            }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/leave`, body, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            });
            dispatch(popMessage(res.data.success, 'success'))
            setState({
                date: [null, null],
                reason: "",
                type: "",
                span: ""
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'));
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={6}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Card>
                        <CardHeader title="Leave Application" />
                        <CardContent>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DateRangePicker
                                    startText="Leave From"
                                    endText="Leave To"
                                    value={state.date}
                                    onChange={(newValue) => setState(prevState => { return { ...prevState, date: newValue } })}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField fullWidth size="small" margin="normal"{...startProps} />
                                            <Box sx={{ mx: 2 }}> - </Box>
                                            <TextField fullWidth size="small" margin="normal"{...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                            <TextField fullWidth multiline rows={5} size="small" margin="normal" label="Reason" type="text" name="reason" id="reason" value={state.reason} onChange={(e) => handleChange(e)} />
                            <TextField fullWidth size="small" margin="normal" select label="Type" name="type" id="type" value={state.type} onChange={(e) => handleChange(e)}>
                                <MenuItem value={'sick_leave'}>Sick Leave</MenuItem>
                                <MenuItem value={'no_pay_leave'}>No Pay Leave</MenuItem>
                            </TextField>
                            <TextField fullWidth size="small" margin="normal" select label="Span" name="span" id="span" value={state.span} onChange={(e) => handleChange(e)}>
                                <MenuItem value={'half_day'}>Half Day</MenuItem>
                                <MenuItem value={'full_day'}>Full Day</MenuItem>
                            </TextField>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="success" type="submit">Apply</Button>
                        </CardActions>
                    </Card>
                </form>
            </Grid>
        </Grid>
    )
}

export default Leave