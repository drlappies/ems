import React, { useEffect, useState, useCallback } from 'react';
import { popMessage } from '../actions/ui'
import Clock from 'react-live-clock';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import axios from 'axios'
import '../css/main.css'

function Overtime() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        checkInTime: "",
        checkOutTime: "",
    })

    const fetchOvertimeStatus = useCallback(async () => {
        try {
            const res = await axios.get(`/api/overtime/user/${auth.id}/status`)
            setState({
                checkInTime: res.data.from,
                checkOutTime: res.data.to
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    const handleCheckIn = useCallback(async () => {
        try {
            const body = { employee_id: auth.id, }
            const res = await axios.post('/api/overtime/timein', body)
            dispatch(popMessage(res.data.success, 'success'))
            setState(prevState => { return { ...prevState, checkInTime: res.data.timein } })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    const handleCheckOut = useCallback(async () => {
        try {
            const body = { employee_id: auth.id }
            const res = await axios.post('/api/overtime/timeout', body)
            dispatch(popMessage(res.data.success, 'success'))
            setState(prevState => { return { ...prevState, checkOutTime: res.data.timeout } })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    useEffect(() => {
        fetchOvertimeStatus()
    }, [fetchOvertimeStatus])

    return (
        <Card elevation={3} style={{ width: 400 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" textAlign="center" style={{ fontWeight: 600 }}>Employee Overtime Check In Portal</Typography>
                <Typography gutterBottom variant="h5" textAlign="center" style={{ fontWeight: 600 }}><Clock format={'HH:mm:ss'} ticking={true} /></Typography>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <TimerIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1">Check In Time</Typography>}
                            secondary={<Typography variant="body1">{state.checkInTime ? state.checkInTime : "You have not checked in yet!"}</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <TimerOffIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1">Check Out Time</Typography>}
                            secondary={<Typography variant="body1">{state.checkOutTime ? state.checkOutTime : "You have not checked out yet!"}</Typography>}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={handleCheckIn}>Check In</Button>
                <Button variant="contained" color="secondary" onClick={handleCheckOut}>Check Out</Button>
            </CardActions>
        </Card>
    )
}

export default Overtime