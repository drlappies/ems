import React, { useEffect } from 'react';
import Clock from 'react-live-clock';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, CardDescription } from 'semantic-ui-react'
import { createOvertime, fetchOvertimeStatus, createOvertimeTimeout } from '../actions/overtime'

function Overtime() {
    const currentTime = new Date()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const overtime = useSelector(state => state.overtime)

    useEffect(() => {
        dispatch(fetchOvertimeStatus(auth.id))
    }, [auth.id, dispatch])

    return (
        <Card>
            <Card.Content>
                <Card.Header>Employee Overtime Time In Portal</Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    {currentTime.getFullYear()} - {currentTime.getMonth() + 1} - {currentTime.getDate()}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    <Clock format={'HH:mm:ss'} ticking={true} />
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    Current User:
                </Card.Description>
                <Card.Description>
                    Fullname: {auth.firstname} {auth.lastname}
                </Card.Description>
                <Card.Description>
                    Employee ID: {auth.id}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <CardDescription>
                    Today Overtime Attendance:
                </CardDescription>
                <Card.Description>
                    Time in: {overtime.overtimeCheckIn}
                </Card.Description>
                <Card.Description>
                    Time Out: {overtime.overtimeCheckOut}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Button primary onClick={() => dispatch(createOvertime(auth.id))}>Time in</Button>
                <Button secondary onClick={() => dispatch(createOvertimeTimeout(auth.id))}>Time out</Button>
            </Card.Content>
        </Card>
    )
}

export default Overtime