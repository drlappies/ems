import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timeInThunk, timeOutThunk, fetchPunchStatusThunk } from '../actions/punch'
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

function Punch() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const punch = useSelector(state => state.punch)

    useEffect(() => {
        dispatch(fetchPunchStatusThunk(auth.id))
    }, [auth.id, dispatch])

    return (
        <Card elevation={3} style={{ width: 400}}>
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
                            secondary={<Typography variant="body1">{punch.checkInTime ? punch.checkInTime : "You have not checked in yet!"}</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <TimerOffIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1">Check Out Time</Typography>}
                            secondary={<Typography variant="body1">{punch.checkOutTime ? punch.checkOutTime : "You have not checked out yet!"}</Typography>}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={() => dispatch(timeInThunk(auth.id))}>Check In</Button>
                <Button variant="contained" color="secondary" onClick={() => dispatch(timeOutThunk(auth.id))}>Check Out</Button>
            </CardActions>
        </Card>
    )
}

export default Punch