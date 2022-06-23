import "./leave.app.css";
import React from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import useDateRange from "../../components/DateRangePicker/useDateRange";
import useInput from "../../hooks/useInput";
import * as leaveThunk from "../../redux/thunks/leave";

function LeaveAppPage() {
  const dispatch = useDispatch();
  const { from, to, setFrom, setTo, reset } = useDateRange();
  const [reason, handleReasonChange, clearReason] = useInput("");
  const [duration, handleDurationChange, clearType] = useInput("");
  const [type, handleTypeChange, clearSpan] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(leaveThunk.postApplyLeave(from, to, reason, type, duration));
    clearReason();
    clearType();
    clearSpan();
    reset();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader title="Leave Application" />
            <CardContent>
              <DateRangePicker
                onFromChange={setFrom}
                onToChange={setTo}
                from={from}
                to={to}
              />
              <TextField
                fullWidth
                multiline
                rows={5}
                size="small"
                margin="normal"
                label="Reason"
                type="text"
                name="reason"
                id="reason"
                value={reason}
                onChange={handleReasonChange}
              />
              <TextField
                fullWidth
                size="small"
                margin="normal"
                select
                label="Type"
                name="type"
                id="type"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value={"sick_leave"}>Sick Leave</MenuItem>
                <MenuItem value={"no_pay_leave"}>No Pay Leave</MenuItem>
              </TextField>
              <TextField
                fullWidth
                size="small"
                margin="normal"
                select
                label="Span"
                name="span"
                id="span"
                value={duration}
                onChange={handleDurationChange}
              >
                <MenuItem value={"half_day"}>Half Day</MenuItem>
                <MenuItem value={"full_day"}>Full Day</MenuItem>
              </TextField>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="success" type="submit">
                Apply
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
}

export default LeaveAppPage;
