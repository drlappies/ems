import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react'
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
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentOvertimeRecord: []
    })

    const calendar = useMemo(() => generateCalendar(state.currentMonth, state.currentYear, state.currentOvertimeRecord), [state.currentMonth, state.currentYear, state.currentOvertimeRecord])
    const years = yearSelect(new Date().getFullYear())

    const fetchOvertimeRecord = useCallback(async () => {
        const res = await axios.get('/overtime', {
            params: {
                employeeId: auth.id,
                dateFrom: `${new Date(state.currentYear, state.currentMonth, 1).getFullYear()}-${new Date(state.currentYear, state.currentMonth, 1).getMonth() + 1}-${new Date(state.currentYear, state.currentMonth, 1).getDate()}`,
                dateTo: `${new Date(state.currentYear, state.currentMonth + 1, 0).getFullYear()}-${new Date(state.currentYear, state.currentMonth + 1, 0).getMonth() + 1}-${new Date(state.currentYear, state.currentMonth + 1, 0).getDate()}`,
                limit: 31
            }
        })

        setState(prevState => {
            return {
                ...prevState,
                currentOvertimeRecord: res.data.overtimeRecord
            }
        })
    }, [auth.id, state.currentMonth, state.currentYear])

    useEffect(() => {
        fetchOvertimeRecord()
    }, [fetchOvertimeRecord])

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
        <div className="calendar-container">
            <Button size="tiny" onClick={() => prev()}>Last Month</Button>
            <Button size="tiny" onClick={() => next()}>Next Month</Button>
            <span>Jump To:
                <select name="currentMonth" defaultValue={state.currentMonth} onChange={(e) => jump(e)}>
                    {months.map((el, i) =>
                        <option value={i} key={i}>{el}</option>
                    )}
                </select>
                <select name="currentYear" defaultValue={state.currentYear} onChange={(e) => jump(e)} >
                    {years.map((el, i) =>
                        <option value={el} key={i}>{el}</option>
                    )}
                </select>
            </span>
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
        </div >
    )
}

export default UserOvertime