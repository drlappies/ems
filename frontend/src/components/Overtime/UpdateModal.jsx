import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "../DatePicker/DatePicker";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";
import Button from "@mui/material/Button";
import useInput from "../../hooks/useInput";
import useTimeRange from "../TimeRangePicker/useTimeRange";

function UpdateModal(props) {
  const { isOpen, onCancel, onConfirm } = props;
  const [status, handleStatusChange, clearStatus] = useInput("");
  const { rawTimeFrom, rawTimeTo, timeFrom, timeTo, setTimeFrom, setTimeTo } =
    useTimeRange(null, null);
  const [date, setDate] = useState(null);

  const handleSubmit = () => {
    if (onConfirm) {
      onConfirm(date, timeFrom, timeTo, status);
    }

    if (onCancel) {
      onCancel();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      clearStatus();
      setTimeFrom(null);
      setTimeTo(null);
      setDate(null);
    }
  }, [clearStatus, isOpen, setTimeFrom, setTimeTo]);

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
            <CardHeader title="Update Overtime Record" />
            <CardContent>
              <TextField
                select
                fullWidth
                size="small"
                margin="normal"
                name="updateStatus"
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

export default UpdateModal;
