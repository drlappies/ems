import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import '../css/main.css'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const generateCalendar = (currentMonth, currentYear, currentOvertimeRecord) => {
    const start = new Date(currentYear, currentMonth, 1);
    const end = new Date(currentYear, currentMonth + 1, 0);
    let month = []
    for (let i = 0; i < 6; i++) {
        if (start > end) break;
        let week = [];
        for (let j = 0; j < 7; j++) {
            if (j !== start.getDay() || start > end) {
                week.push(null)
            } else if (currentOvertimeRecord.find(el => new Date(el.date).getDate() === start.getDate())) {
                const ot = currentOvertimeRecord.find(el => new Date(el.date).getDate() === start.getDate())
                start.setDate(start.getDate() + 1)
                week.push({
                    date: new Date(ot.date).getDate(),
                    from: ot.from,
                    to: ot.to,
                    status: ot.status
                })
            } else {
                week.push({
                    date: start.getDate(),
                    from: null,
                    to: null,
                    status: null
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

function UserOvertime() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentOvertimeRecord: []
    })

    const calendar = useMemo(() => generateCalendar(state.currentMonth, state.currentYear, state.currentOvertimeRecord), [state.currentMonth, state.currentYear, state.currentOvertimeRecord])
    const years = yearSelect(new Date().getFullYear())

    const fetchOvertimeRecord = useCallback(async (currentYear, currentMonth) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/overtime/user/${auth.id}/history`, {
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
                    currentOvertimeRecord: res.data.overtime
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }

    }, [auth.id, dispatch])

    useEffect(() => {
        fetchOvertimeRecord(state.currentYear, state.currentMonth)
    }, [fetchOvertimeRecord, state.currentMonth, state.currentYear])

    const next = () => {
        setState(prevState => {
            return {
                ...prevState,
                currentMonth: prevState.currentMonth + 1 > 11 ? 0 : prevState.currentMonth + 1,
                currentYear: prevState.currentMonth + 1 > 11 ? prevState.currentYear + 1 : prevState.currentYear
            }
        })
    }

    const prev = () => {
        setState(prevState => {
            return {
                ...prevState,
                currentMonth: prevState.currentMonth - 1 <= 0 ? 11 : prevState.currentMonth - 1,
                currentYear: prevState.currentMonth - 1 <= 0 ? prevState.currentYear - 1 : prevState.currentYear
            }
        })
    }

    const jump = (e) => {
        const { name, value } = e.target
        setState(prevState => {
            return {
                ...prevState,
                [name]: parseInt(value)
            }
        })
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
                        <tr>
                            <th colSpan="7">
                                {state.currentYear} {months[state.currentMonth]}
                            </th>
                        </tr>
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
                                    <td className="calendar-date" key={j}>
                                        {date ?
                                            <div>
                                                {date.from ? <div>IN: {date.from}</div> : null}
                                                {date.to ? <div>OUT: {date.to}</div> : null}
                                                {date.status && date.status === 'pending' ? <div style={{ backgroundColor: 'yellow' }}>Pending</div> : null}
                                                {date.status && date.status === 'approved' ? <div style={{ backgroundColor: 'green' }}>Approved</div> : null}
                                                {date.status && date.status === 'rejected' ? <div style={{ backgroundColor: 'red' }}>Rejected</div> : null}
                                                <div>{date.date}</div>
                                            </div>
                                            : null}
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

export default UserOvertime