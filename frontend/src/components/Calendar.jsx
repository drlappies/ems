import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import '../css/main.css'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const generateCalendar = (currentYear, currentMonth, monthlyAttendance) => {
    const start = new Date(currentYear, currentMonth, 1);
    const end = new Date(currentYear, currentMonth + 1, 0);
    let month = [];
    for (let i = 0; i < 6; i++) {
        if (start > end) break;
        let week = [];
        for (let j = 0; j < 7; j++) {
            if (j !== start.getDay() || start > end) {
                week.push(null)
            } else if (monthlyAttendance.find(el => new Date(el.date).getDate() === start.getDate())) {
                const attendance = monthlyAttendance.find(el => new Date(el.date).getDate() === start.getDate())
                start.setDate(start.getDate() + 1)
                week.push({
                    date: new Date(attendance.date).getDate(),
                    status: attendance.status,
                    checkIn: attendance.check_in,
                    checkOut: attendance.check_out,
                })
            } else {
                week.push({
                    date: start.getDate(),
                    status: null,
                    checkIn: null,
                    checkOut: null
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

function Calendar(props) {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentMonthlyAttendance: [],
    })

    const calendar = useMemo(() => generateCalendar(state.currentYear, state.currentMonth, state.currentMonthlyAttendance), [state.currentMonth, state.currentYear, state.currentMonthlyAttendance])
    const years = yearSelect(new Date().getFullYear())

    const fetchMonthlyAttendance = useCallback(async () => {
        const res = await axios.get('/api/attendance', {
            params: {
                limit: 31,
                employee_id: auth.id,
                dateFrom: `${new Date(state.currentYear, state.currentMonth, 1).getFullYear()}-${new Date(state.currentYear, state.currentMonth, 1).getMonth() + 1}-${new Date(state.currentYear, state.currentMonth, 1).getDate()}`,
                dateTo: `${new Date(state.currentYear, state.currentMonth + 1, 0).getFullYear()}-${new Date(state.currentYear, state.currentMonth + 1, 0).getMonth() + 1}-${new Date(state.currentYear, state.currentMonth + 1, 0).getDate()}`
            }
        })
        setState(prevState => {
            return {
                ...prevState,
                currentMonthlyAttendance: res.data.attendance,
            }
        })

    }, [auth.id, state.currentMonth, state.currentYear])

    useEffect(() => {
        fetchMonthlyAttendance()
    }, [fetchMonthlyAttendance, state.currentMonth, state.currentYear])

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
        const { name, value } = e.target;
        setState(prevState => {
            return {
                ...prevState,
                [name]: parseInt(value)
            }
        })
    }

    return (
        <div >
            <Button size="tiny" onClick={() => prev()}>Last Month</Button>
            <Button size="tiny" onClick={() => next()}>Next Month</Button>
            <span>Jump To:
                <select name="currentMonth" onChange={(e) => jump(e)} defaultValue={state.currentMonth}>{months.map((el, i) =>
                    <option key={i} value={i}>{el}</option>)}
                </select>
                <select name="currentYear" onChange={(e) => jump(e)} defaultValue={state.currentYear}>
                    {years.map((el, i) =>
                        <option key={i} value={el}>{el}</option>
                    )}
                </select>
            </span>
            <table className="calendar">
                <thead>
                    <tr>
                        <th colSpan="7">{state.currentYear} {months[state.currentMonth]}</th>
                    </tr>
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
                                <td className="calendar-date" key={j}>
                                    {date ?
                                        <div>
                                            {date.checkIn ? <div>In: {date.checkIn}</div> : null}
                                            {date.checkOut ? <div>Out: {date.checkOut}</div> : null}
                                            {date.status ? <div style={{ backgroundColor: date.status === 'on_time' ? 'green' : 'red' }}>{date.status}</div> : null}
                                            <div>{date.date}</div>
                                        </div>
                                        : null}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar