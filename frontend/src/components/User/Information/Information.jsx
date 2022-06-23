import React from "react";
import { useSelector } from "react-redux";
import { months } from "../../../constants/datetime";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function Information() {
  const user = useSelector((state) => state.user);

  return (
    <Card>
      <CardHeader title="Employee Information" />
      <CardContent>
        <List dense>
          <ListItem>
            <ListItemText primary="Employee ID" secondary={user.user.id} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Firstname" secondary={user.user.firstname} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lastname" secondary={user.user.lastname} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Account Role" secondary={user.user.role} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Department"
              secondary={
                user.user.department ? user.user.department : "unassigned"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Position"
              secondary={user.user.position ? user.user.position : "unassigned"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Working Hour"
              secondary={`${user.user.start_hour} to ${user.user.end_hour}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Address" secondary={user.user.address} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Phone Number"
              secondary={user.user.phone_number}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Onboard Date"
              secondary={`${new Date(user.user.onboard_date).getDate()} ${
                months[new Date(user.user.onboard_date).getMonth()]
              } ${new Date(user.user.onboard_date).getFullYear()}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Overtime Pay Entitlement"
              secondary={user.user.ot_pay_entitled ? "Yes" : "No"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Overtime Pay (Hourly)"
              secondary={user.user.ot_hourly_salary}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Emergency Contact Person"
              secondary={user.user.emergency_contact_person}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Emergency Contact Number"
              secondary={user.user.emergency_contact_number}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default Information;
