import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";
import DatePicker from "../DatePicker/DatePicker";
import useTimeRange from "../TimeRangePicker/useTimeRange";
import useInput from "../../hooks/useInput";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

function CreateModal(props) {
  const { isOpen, onCancel, onConfirm } = props;
  const employeeList = useSelector((state) => state.employee.employeeList);

  const [employeeId, handleEmployeeIdChange, clearEmpId] = useInput("");
  const [status, handleStatusChange, clearStatus] = useInput("");
  const { rawTimeFrom, rawTimeTo, timeFrom, timeTo, setTimeFrom, setTimeTo } =
    useTimeRange(null, null);
  const [date, setDate] = useState(null);

  const handleSubmit = () => {
    if (onConfirm) {
      onConfirm(employeeId, date, timeFrom, timeTo, status);
    }

    if (onCancel) {
      onCancel();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      clearEmpId();
      clearStatus();
      setTimeFrom(null);
      setTimeTo(null);
      setDate(null);
    }
  }, [clearEmpId, clearStatus, isOpen, setDate, setTimeFrom, setTimeTo]);

  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={5}>
          <Card>
            <CardHeader
              title="Create Overtime Record"
              subheader="Insert an overtime record for specific employee"
            />
            <CardContent>
              <TextField
                fullWidth
                select
                size="small"
                margin="normal"
                name="createEmployee"
                label="Employee"
                value={employeeId}
                onChange={handleEmployeeIdChange}
              >
                {employeeList.map((el, i) => (
                  <MenuItem key={i} value={el.id}>
                    ID: {el.id} {el.firstname} {el.lastname}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker value={date} onChange={setDate} fullWidth />
              <TimeRangePicker
                from={rawTimeFrom}
                to={rawTimeTo}
                onFromChange={setTimeFrom}
                onToChange={setTimeTo}
                justifyContent="space-between"
              />

              <TextField
                select
                fullWidth
                size="small"
                margin="normal"
                name="createStatus"
                label="Status"
                value={status}
                onChange={handleStatusChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </TextField>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
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
