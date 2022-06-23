import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as attdThunk from "../../redux/thunks/attendance";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";
import DatePicker from "../DatePicker/DatePicker";
import useTimeRange from "../TimeRangePicker/useTimeRange";
import useInput from "../../hooks/useInput";

function CreateModal(props) {
  const dispatch = useDispatch();
  const emp = useSelector((state) => state.employee);
  const { isOpen, onClose, onCancel } = props;

  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [employeeIdError, setEmployeeIdError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [status, setStatus, clearStatus] = useInput("");
  const [employeeId, setEmployeeId, clearEmployeeId] = useInput("");
  const { timeFrom, timeTo, rawTimeFrom, rawTimeTo, setTimeFrom, setTimeTo } =
    useTimeRange(null, null);

  const handleCreate = async () => {
    if (!employeeId) {
      setEmployeeIdError(true);
      return;
    }

    if (!date) {
      setDateError(true);
      return;
    }

    if (!timeFrom || !timeTo) {
      setTimeError(true);
      return;
    }

    if (!status) {
      setStatusError(true);
      return;
    }

    dispatch(
      attdThunk.postAttendance(employeeId, date, timeFrom, timeTo, status)
    );

    clearStatus();
    clearEmployeeId();
    setTimeFrom(null);
    setTimeTo(null);
    setDate(null);
    setEmployeeIdError(false);
    setDateError(false);
    setStatusError(false);
    setTimeError(false);

    if (onCancel) onCancel();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={5}>
          <Card>
            <CardHeader
              title="Create Attendance Record"
              subheader="Create specific attendance record for an employee"
            />
            <CardContent>
              <TextField
                fullWidth
                select
                margin="normal"
                size="small"
                label="Employee"
                name="employeeId"
                value={employeeId}
                onChange={setEmployeeId}
                error={employeeIdError}
              >
                {emp.employeeList.map((el, i) => (
                  <MenuItem key={i} value={el.id}>
                    ID: {el.id} {el.firstname} {el.lastname}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                fullWidth
                value={date}
                onChange={setDate}
                error={dateError}
              />
              <TimeRangePicker
                from={rawTimeFrom}
                to={rawTimeTo}
                onFromChange={setTimeFrom}
                onToChange={setTimeTo}
                justifyContent="space-between"
                error={timeError}
              />
              <TextField
                fullWidth
                select
                margin="normal"
                size="small"
                label="Status"
                name="status"
                value={status}
                onChange={setStatus}
                error={statusError}
              >
                <MenuItem value="on_time">On Time</MenuItem>
                <MenuItem value="late">Late</MenuItem>
              </TextField>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleCreate()}
              >
                Create
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default CreateModal;
