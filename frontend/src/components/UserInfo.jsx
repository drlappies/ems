import React from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

function UserInfo() {
    const auth = useSelector(state => state.auth)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <Card>
            <CardHeader title="Employee Information" />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Employee ID" secondary={auth.id} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Firstname" secondary={auth.firstname} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Lastname" secondary={auth.lastname} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Account Role" secondary={auth.role} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Department" secondary={auth.department ? auth.department : "unassigned"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Position" secondary={auth.position ? auth.position : "unassigned"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Working Hour" secondary={`${auth.start_hour} to ${auth.end_hour}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Address" secondary={auth.address} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Phone Number" secondary={auth.phone_number} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Onboard Date" secondary={`${new Date(auth.onboard_date).getDate()} ${months[new Date(auth.onboard_date).getMonth()]} ${new Date(auth.onboard_date).getFullYear()}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Overtime Pay Entitlement" secondary={auth.ot_pay_entitled ? "Yes" : "No"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Overtime Pay (Hourly)" secondary={auth.ot_hourly_salary} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Emergency Contact Person" secondary={auth.emergency_contact_person} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Emergency Contact Number" secondary={auth.emergency_contact_number} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default UserInfo