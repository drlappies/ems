import React, { useEffect, useCallback, useState } from 'react'
import Metric from './Metric'
import Chart from './Chart'
import { Grid, Container } from 'semantic-ui-react'
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
            const res = await axios.all([
                axios.get('/employee'),
                axios.get('/department'),
                axios.get('/reimbursement?status=pending'),
                axios.get('/attendance/rate'),
                axios.get('/leave/rate')
            ])
            setState(prevState => {
                return {
                    ...prevState,
                    employee: res[0].data.length,
                    departments: res[1].data.length,
                    reimbursement: res[2].data.length,
                    onTimeRate: res[3].data.rate,
                    leaveRate: res[4].data.rate
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
        <Container>
            <Grid container relaxed>
                <Grid.Row columns="3">
                    <Grid.Column>
                        <Metric
                            color="teal"
                            label="Employee Number"
                            number={state.employee}
                        />
                    </Grid.Column >
                    <Grid.Column >
                        <Metric
                            color="orange"
                            label="Department Number"
                            number={state.departments}
                        />
                    </Grid.Column >
                    <Grid.Column >
                        <Metric
                            color="olive"
                            label="Position Number"
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
                <Grid.Row columns="1">
                    <Grid.Column>
                        <Chart
                            header="Employee on-time rate"
                            subheader="past 6 months"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        </Container>
    )
}

export default Dashboard