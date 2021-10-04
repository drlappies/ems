import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Calendar from './Calendar';
import UserInfo from './UserInfo';
import UserLeave from './UserLeave';
import UserPayroll from './UserPayroll';
import UserOvertime from './UserOvertime';
import UserReimbursement from './UserReimbursement';
import UserAllowance from './UserAllowance';
import UserBonus from './UserBonus';
import UserDeduction from './UserDeduction';
import '../css/main.css'

function User() {
    const [state, setState] = useState("1")

    const handleChange = (event, newValue) => {
        setState(newValue)
    };

    return (
        <div>
            <TabContext value={state}>
                <TabList onChange={handleChange}>
                    <Tab label="Employee Information" value="1" />
                    <Tab label="Attendance" value="2" />
                    <Tab label="Leave" value="3" />
                    <Tab label="Overtime" value="4" />
                    <Tab label="Payroll" value="5" />
                    <Tab label="Reimbursement" value="6" />
                    <Tab label="Allowance" value="7" />
                    <Tab label="Bonus" value="8" />
                    <Tab label="Deduction" value="9" />
                </TabList>
                <TabPanel value="1">
                    <UserInfo />
                </TabPanel>
                <TabPanel value="2">
                    <Calendar />
                </TabPanel>
                <TabPanel value="3">
                    <UserLeave />
                </TabPanel>
                <TabPanel value="4">
                    <UserOvertime />
                </TabPanel>
                <TabPanel value="5">
                    <UserPayroll />
                </TabPanel>
                <TabPanel value="6">
                    <UserReimbursement />
                </TabPanel>
                <TabPanel value="7">
                    <UserAllowance />
                </TabPanel>
                <TabPanel value="8">
                    <UserBonus />
                </TabPanel>
                <TabPanel value="9">
                    <UserDeduction />
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default User