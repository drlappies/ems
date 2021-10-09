import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Clock from 'react-live-clock';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import axios from 'axios'

function Punch() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        checkInTime: null,
        checkOutTime: null,
        status: null
    })

    const fetchStatus = useCallback(async (employeeId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/attendance/user/${employeeId}/status`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            if (res.data.hasOwnProperty('id')) {
                setState({
                    checkInTime: res.data.check_in,
                    checkOutTime: res.data.check_out,
                    status: res.data.status
                })
            }
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const checkIn = useCallback(async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/attendance/checkin`, {
                employeeId: auth.id
            })
            dispatch(popMessage(res.data.success, 'success'))
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    const checkOut = useCallback(async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/attendance/checkout`, {
                employeeId: auth.id
            })
            dispatch(popMessage(res.data.success, 'success'))
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    useEffect(() => {
        fetchStatus(auth.id)
    }, [auth.id, fetchStatus])

    return (
        <Card elevation={3} style={{ width: 400 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" textAlign="center" style={{ fontWeight: 600 }}>Employee Check In Portal</Typography>
                <Typography gutterBottom variant="h5" textAlign="center" style={{ fontWeight: 600 }}><Clock format={'HH:mm:ss'} ticking={true} /></Typography>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <TimerIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1">Check In Time</Typography>}
                            secondary={<Typography variant="body1">{state.checkInTime}</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <TimerOffIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1">Check Out Time</Typography>}
                            secondary={<Typography variant="body1">{state.checkOutTime}</Typography>}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={checkIn}>Check In</Button>
                <Button variant="contained" color="secondary" onClick={checkOut}>Check Out</Button>
            </CardActions>
        </Card>
    )
}

export default Punch