import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timeInThunk, timeOutThunk, fetchPunchStatusThunk } from '../actions/punch'
import { Card, Button } from 'semantic-ui-react'
import Clock from 'react-live-clock';
import '../css/main.css'

function Punch() {
    const currentTime = new Date()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const punch = useSelector(state => state.punch)

    useEffect(() => {
        dispatch(fetchPunchStatusThunk(auth.id))
    }, [auth.id, dispatch])

    return (
        <div className="punch">
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
                        <strong>Check in:</strong> {punch.checkInTime ? punch.checkInTime : "You have not checked in yet!"}
                    </Card.Description>
                    <Card.Description>
                        <strong>Check Out:</strong> {punch.checkOutTime ? punch.checkOutTime : "You have not checked out yet!"}
                    </Card.Description>
                    <Card.Description>
                        <strong>Status:</strong> {punch.status ? punch.status : "You have not checked in/out yet!"}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button primary onClick={() => dispatch(timeInThunk(auth.id))}>Time in</Button>
                    <Button secondary onClick={() => dispatch(timeOutThunk(auth.id))}>Time out</Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Punch