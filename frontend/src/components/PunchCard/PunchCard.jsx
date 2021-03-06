import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Clock from "react-live-clock";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

function PunchCard(props) {
  const {
    title,
    checkIn,
    checkOut,
    hasCheckedIn,
    hasCheckedOut,
    checkInTime,
    checkOutTime,
  } = props;

  return (
    <Card elevation={3} style={{ width: 400 }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          textAlign="center"
          style={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          textAlign="center"
          style={{ fontWeight: 600 }}
        >
          <Clock format={"HH:mm:ss"} ticking={true} />
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemAvatar>
              <TimerIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body1">Check In Time</Typography>}
              secondary={
                <Typography variant="body1">
                  {hasCheckedIn ? checkInTime : "You have not checked in yet!"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <TimerOffIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body1">Check Out Time</Typography>}
              secondary={
                <Typography variant="body1">
                  {hasCheckedOut
                    ? checkOutTime
                    : "You have not checked out yet!"}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={checkIn}>
          Check In
        </Button>
        <Button variant="contained" color="secondary" onClick={checkOut}>
          Check Out
        </Button>
      </CardActions>
    </Card>
  );
}

export default PunchCard;
