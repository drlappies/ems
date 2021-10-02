import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutThunk } from '../actions/auth';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SafetyDividerOutlinedIcon from '@mui/icons-material/SafetyDividerOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

function Navbar(props) {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const drawerWidth = 240;
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant={auth.isAuthenticated ? "permanent" : "persistent"}
                anchor="left"
                open={auth.isAuthenticated}
            >
                <List>
                    <ListItem secondaryAction={
                        <Tooltip title="Logout">
                            <IconButton onClick={() => dispatch(logoutThunk())}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    }>
                        <ListItemText
                            primary="Current user"
                            secondary={`ID: ${auth.id} ${auth.firstname} ${auth.lastname}`}
                        />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/user">
                        <ListItemIcon>
                            <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText>My Record</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/attendance/punch">
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText>Check In</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/attendance/overtime/check_in">
                        <ListItemIcon>
                            <MoreTimeIcon />
                        </ListItemIcon>
                        <ListItemText>Overtime Check In</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/leave/application">
                        <ListItemIcon>
                            <SickOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Leave Application</ListItemText>
                    </ListItem>
                </List>
                <Divider />
                {auth.role === 'admin' ?
                    <List>
                        <ListItem button component={Link} to="/attendance">
                            <ListItemIcon>
                                <TimerOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Attendance</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/overtime">
                            <ListItemIcon>
                                <AvTimerOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Overtime</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/leave/management">
                            <ListItemIcon>
                                <TimeToLeaveOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Leave</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/payroll">
                            <ListItemIcon>
                                <PaymentsOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Payroll</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/employee/record">
                            <ListItemIcon>
                                <PeopleOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>HR</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/employee/position">
                            <ListItemIcon>
                                <WorkOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Positions</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/employee/department">
                            <ListItemIcon>
                                <SafetyDividerOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Departments</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/reimbursement/management">
                            <ListItemIcon>
                                <LocalAtmOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Reimbursement</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/bonus/management">
                            <ListItemIcon>
                                <AttachMoneyOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Bonus</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/deduction/management">
                            <ListItemIcon>
                                <MoneyOffCsredOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Deduction</ListItemText>
                        </ListItem>
                    </List> : null}
            </Drawer>
            <Box>
                {props.children}
            </Box>
        </Box>
    )
}

export default Navbar