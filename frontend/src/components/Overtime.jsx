import React, { useEffect } from 'react';
import Clock from 'react-live-clock';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'semantic-ui-react'
import { createOvertime, fetchOvertimeStatus, createOvertimeTimeout } from '../actions/overtime'
import '../css/main.css'

function Overtime() {
    const currentTime = new Date()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const overtime = useSelector(state => state.overtime)

    useEffect(() => {
        console.log(auth.id)
        dispatch(fetchOvertimeStatus(auth.id))
    }, [auth.id, dispatch])

    return (
        <div className="punch">
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
                <Card.Content className="punch-status">
                    <Card.Description>
                        <strong>Employee ID:</strong> {auth.id}
                    </Card.Description>
                    <Card.Description>
                        <strong>Fullname:</strong> {auth.firstname} {auth.lastname}
                    </Card.Description>
                </Card.Content>
                <Card.Content className="punch-status">
                    <Card.Description>
                        <strong>Time in:</strong> {overtime.overtimeCheckIn ? overtime.overtimeCheckIn : "You have not checked in yet!"}
                    </Card.Description>
                    <Card.Description>
                        <strong>Time Out:</strong> {overtime.overtimeCheckOut ? overtime.overtimeCheckOut : "You have not checked out yet!"}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button primary onClick={() => dispatch(createOvertime(auth.id))}>Time in</Button>
                    <Button secondary onClick={() => dispatch(createOvertimeTimeout(auth.id))}>Time out</Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Overtime