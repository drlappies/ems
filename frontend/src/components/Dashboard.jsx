import React, { useEffect, useCallback, useState } from 'react'
import Metric from './Metric'
import { Grid } from 'semantic-ui-react'
import axios from 'axios'

function Dashboard() {
    const [state, setState] = useState({
        employee: 0,
        departments: 0,
        positions: 0,
        reimbursement: 0,
        onTimeRate: 0,
        leaveRate: 0,
    })

    const fetchMetrics = useCallback(async () => {
        try {
            const res = await axios.get('/api/dashboard')
            setState(prevState => {
                return {
                    ...prevState,
                    employee: res.data.metric[0].employee_count,
                    positions: res.data.metric[0].positions_count,
                    departments: res.data.metric[0].departments_count,
                    reimbursement: res.data.metric[0].pending_reimbursement_count,
                    onTimeRate: Math.round(res.data.metric[0].on_time_attendance_count / res.data.metric[0].attendance_count * 100 * 100) / 100,
                    leaveRate: Math.round(res.data.metric[0].approved_leave_count / res.data.metric[0].attendance_count * 100 * 100) / 100,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        fetchMetrics()
    }, [fetchMetrics])

    return (
        <Grid container relaxed>
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
            <Grid.Row columns="3">
                <Grid.Column>
                    <Metric
                        color="teal"
                        label="Employees"
                        number={state.employee}
                    />
                </Grid.Column >
                <Grid.Column >
                    <Metric
                        color="orange"
                        label="Departments"
                        number={state.departments}
                    />
                </Grid.Column >
                <Grid.Column >
                    <Metric
                        color="olive"
                        label="Positions"
                        number={state.positions}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="3">
                <Grid.Column >
                    <Metric
                        color="pink"
                        label="Pending Reimbursements"
                        number={state.reimbursement}
                    />
                </Grid.Column>
                <Grid.Column >
                    <Metric
                        color="green"
                        label="Employee on-time rate"
                        number={`${state.onTimeRate}%`}
                    />
                </Grid.Column>
                <Grid.Column >
                    <Metric
                        color="red"
                        label="Employee leave rate"
                        number={`${state.leaveRate}%`}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid >
    )
}

export default Dashboard