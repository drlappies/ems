import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/thunks/user";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import TimeToLeaveOutlinedIcon from "@mui/icons-material/TimeToLeaveOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SafetyDividerOutlinedIcon from "@mui/icons-material/SafetyDividerOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List dense>
        <ListItem
          secondaryAction={
            <Tooltip title="Logout">
              <IconButton onClick={() => dispatch(logout())}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          }
        >
          <ListItemText
            primary={`id: ${user.user.id} `}
            secondary={`${user.user.firstname} ${user.user.lastname}`}
          />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        <ListItem button component={NavLink} to="/">
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText>My Record</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} to="/punch">
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText>Check In</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} to="/punch/overtime">
          <ListItemIcon>
            <MoreTimeIcon />
          </ListItemIcon>
          <ListItemText>Overtime Check In</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} to="/leave/application">
          <ListItemIcon>
            <SickOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Leave Application</ListItemText>
        </ListItem>
        <ListItem button component={NavLink} to="/reimbursement/application">
          <ListItemIcon>
            <LocalAtmOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Reimbursement Application</ListItemText>
        </ListItem>
      </List>
      <Divider />
      {user.user.role === "admin" ? (
        <List dense>
          <ListItem button component={NavLink} to="/attendance">
            <ListItemIcon>
              <TimerOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Attendance</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/overtime">
            <ListItemIcon>
              <AvTimerOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Overtime</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/leave/management">
            <ListItemIcon>
              <TimeToLeaveOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Leave</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/payroll">
            <ListItemIcon>
              <PaymentsOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Payroll</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/employee/record">
            <ListItemIcon>
              <PeopleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText>HR</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/employee/position">
            <ListItemIcon>
              <WorkOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Positions</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/employee/department">
            <ListItemIcon>
              <SafetyDividerOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Departments</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/reimbursement/management">
            <ListItemIcon>
              <LocalAtmOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Reimbursement</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/allowance">
            <ListItemIcon>
              <FoodBankOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Allowance</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/bonus/management">
            <ListItemIcon>
              <AttachMoneyOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Bonus</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/deduction/management">
            <ListItemIcon>
              <MoneyOffCsredOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Deduction</ListItemText>
          </ListItem>
        </List>
      ) : null}
    </Drawer>
  );
}

export default Navbar;
