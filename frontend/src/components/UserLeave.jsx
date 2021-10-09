import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../css/main.css'
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const generateCalendar = (currentMonth, currentYear, currentMonthlyLeave) => {
    const start = new Date(currentYear, currentMonth, 1);
    const end = new Date(currentYear, currentMonth + 1, 0);
    let month = [];
    for (let i = 0; i < 6; i++) {
        if (start > end) break;
        let week = [];
        for (let j = 0; j < 7; j++) {
            if (j !== start.getDay() || start > end) {
                week.push(null)
            } else if (currentMonthlyLeave.filter(el => new Date(el.from).getDate() <= start.getDate() && new Date(el.to).getDate() >= start.getDate()).length) {
                const [leave] = currentMonthlyLeave.filter(el => new Date(el.from).getDate() <= start.getDate() && new Date(el.to).getDate() >= start.getDate())
                week.push({
                    date: start.getDate(),
                    status: leave.status,
                    type: leave.type,
                    duration: leave.duration
                })
                start.setDate(start.getDate() + 1)
            } else {
                week.push({
                    date: start.getDate(),
                    status: null,
                    type: null,
                    duration: null
                })
                start.setDate(start.getDate() + 1)
            }
        }
        month.push(week)
    }
    return month
}

const yearSelect = (currentYear) => {
    let years = [];
    const earliestYear = 1970;
    for (let i = currentYear; i > earliestYear; i--) {
        years.push(i)
    }
    return years
}

function UserLeave() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentMonthlyLeave: [],
        isFetching: false
    })

    const calendar = useMemo(() => generateCalendar(state.currentMonth, state.currentYear, state.currentMonthlyLeave), [state.currentMonth, state.currentYear, state.currentMonthlyLeave])
    const years = useMemo(() => yearSelect(new Date().getFullYear()), [])

    const fetchMonthlyLeave = useCallback(async (currentYear, currentMonth) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/leave/user/${auth.id}/history`, {
                params: {
                    dateFrom: `${new Date(currentYear, currentMonth, 1).getFullYear()}-${new Date(currentYear, currentMonth, 1).getMonth() + 1}-${new Date(currentYear, currentMonth, 1).getDate()}`,
                    dateTo: `${new Date(currentYear, currentMonth + 1, 0).getFullYear()}-${new Date(currentYear, currentMonth + 1, 0).getMonth() + 1}-${new Date(currentYear, currentMonth + 1, 0).getDate()}`,
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })

            setState(prevState => {
                return {
                    ...prevState,
                    currentMonthlyLeave: res.data.leave,
                    isFetching: false
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    useEffect(() => {
        fetchMonthlyLeave(state.currentYear, state.currentMonth)
    }, [fetchMonthlyLeave, state.currentMonth, state.currentYear])

    const next = () => {
        setState(prevState => {
            return {
                ...prevState,
                currentMonth: prevState.currentMonth + 1 > 11 ? 0 : prevState.currentMonth + 1,
                currentYear: prevState.currentMonth + 1 > 11 ? prevState.currentYear + 1 : prevState.currentYear,
                isFetching: true
            }
        })
    }

    const prev = () => {
        setState(prevState => {
            return {
                ...prevState,
                currentMonth: prevState.currentMonth - 1 <= 0 ? 11 : prevState.currentMonth - 1,
                currentYear: prevState.currentMonth - 1 <= 0 ? prevState.currentYear - 1 : prevState.currentYear,
                isFetching: true
            }
        })
    }

    const jump = (e) => {
        const { name, value } = e.target;
        setState(prevState => { return { ...prevState, [name]: parseInt(value), isFetching: true } })
    }

    return (
        <Grid container spacing={1}>
            <Grid item>
                <Button size="small" variant="contained" onClick={() => prev()}>Last Month</Button>
            </Grid>
            <Grid item>
                <Button size="small" variant="contained" onClick={() => next()}>Next Month</Button>
            </Grid>
            <Grid item>
                <TextField name="currentMonth" onChange={(e) => jump(e)} value={state.currentMonth} select size="small" margin="none" variant="standard">
                    {months.map((el, i) =>
                        <MenuItem key={i} value={i}>{el}</MenuItem>
                    )}
                </TextField>
            </Grid>
            <Grid item>
                <TextField name="currentYear" onChange={(e) => jump(e)} value={state.currentYear} select size="small" margin="none" variant="standard">
                    {years.map((el, i) =>
                        <MenuItem key={i} value={el}>{el}</MenuItem>
                    )}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <table className="calendar">
                    <thead>
                        <tr><th colSpan="7">{state.currentYear} {months[state.currentMonth]}</th></tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendar.map((week, i) =>
                            <tr key={i}>
                                {week.map((date, j) =>
                                    <td key={j} className="calendar-date">
                                        {date ?
                                            <div>
                                                {state.isFetching ? null :
                                                    <div>
                                                        {date.duration && date.duration === 'full_day' ? <div>Full Day</div> : null}
                                                        {date.duration && date.duration === 'half_day' ? <div>Half Day</div> : null}
                                                        {date.type && date.type === 'sick_leave' ? <div style={{ backgroundColor: '#9acd32' }}>Sick Leave</div> : null}
                                                        {date.type && date.type === 'no_pay_leave' ? <div style={{ backgroundColor: '#B0E0E6' }}>No Pay Leave</div> : null}
                                                        {date.type && date.type === 'annual_leave' ? <div style={{ backgroundColor: '#89CFF0' }}>Annual Leave</div> : null}
                                                        {date.status && date.status === 'rejected' ? <div style={{ backgroundColor: 'red' }}>Rejected</div> : null}
                                                        {date.status && date.status === 'approved' ? <div style={{ backgroundColor: 'green' }}>Approved</div> : null}
                                                        {date.status && date.status === 'pending' ? <div style={{ backgroundColor: 'yellow' }}>Pending</div> : null}
                                                    </div>}
                                                <div>{date.date}</div>
                                            </div> : null}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </Grid>

        </Grid>
    )
}

export default UserLeave