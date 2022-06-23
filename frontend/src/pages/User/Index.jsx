import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Information from "../../components/User/Information/Information";
import Attendance from "../../components/User/Attendance/Attendance";
import Leave from "../../components/User/Leave/Leave";
import Overtime from "../../components/User/Overtime/Overtime";
import Payroll from "../../components/User/Payroll/Payroll";
import Reimbursement from "../../components/User/Reimbursement/Reimbursement";
import Allowance from "../../components/User/Allowance/Allowance";
import Bonus from "../../components/User/Bonus/Bonus";
import Deduction from "../../components/User/Deduction/Deduction";

function UserPage() {
  const [tab, setTab] = useState("1");

  return (
    <div>
      <TabContext value={tab}>
        <TabList onChange={(_event, newValue) => setTab(newValue)}>
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
          <Information />
        </TabPanel>
        <TabPanel value="2">
          <Attendance />
        </TabPanel>
        <TabPanel value="3">
          <Leave />
        </TabPanel>
        <TabPanel value="4">
          <Overtime />
        </TabPanel>
        <TabPanel value="5">
          <Payroll />
        </TabPanel>
        <TabPanel value="6">
          <Reimbursement />
        </TabPanel>
        <TabPanel value="7">
          <Allowance />
        </TabPanel>
        <TabPanel value="8">
          <Bonus />
        </TabPanel>
        <TabPanel value="9">
          <Deduction />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default UserPage;
