import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timeInThunk, timeOutThunk, fetchPunchStatusThunk } from '../actions/punch'
import { Card, Button, CardDescription } from 'semantic-ui-react'
import Clock from 'react-live-clock';

function Punch() {
    const currentTime = new Date()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const punch = useSelector(state => state.punch)

    useEffect(() => {
        dispatch(fetchPunchStatusThunk(auth.id))
    }, [auth.id, dispatch])

    return (
        <Card>
            <Card.Content>
                <Card.Header>Employee Time In Portal</Card.Header>
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
                    Today Attendance:
                </CardDescription>
                <Card.Description>
                    Time in: {punch.checkInTime}
                </Card.Description>
                <Card.Description>
                    Time Out: {punch.checkOutTime}
                </Card.Description>
                <Card.Description>
                    Status: {punch.status}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Button disabled={punch.checkInTime} primary onClick={() => dispatch(timeInThunk(auth.id))}>Time in</Button>
                <Button disabled={punch.checkOutTime} secondary onClick={() => dispatch(timeOutThunk(auth.id))}>Time out</Button>
            </Card.Content>
        </Card>
    )
}

export default Punch