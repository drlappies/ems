import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useInput from "../../hooks/useInput";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";
import useTimeRange from "../TimeRangePicker/useTimeRange";
import * as attdThunk from "../../redux/thunks/attendance";

function UpdateModal(props) {
  const {
    isOpen,
    onClose,
    onCancel,
    id,
    offset,
    limit,
    employee,
    status,
    search,
    queryFrom,
    queryTo,
  } = props;
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [value, handleStatusChange, clearInput, setInput] = useInput();
  const { timeFrom, timeTo, setTimeFrom, setTimeTo } = useTimeRange();

  useEffect(() => {
    if (!isOpen) {
      setInput("");
      setTimeFrom(null);
      setTimeTo(null);
    }
  }, [isOpen, setInput, setTimeFrom, setTimeTo]);

  const handleConfirm = () => {
    if (id.length < 2) {
      dispatch(attdThunk.putAttendanceById(id, timeFrom, timeTo, value)).then(
        () => {
          dispatch(
            attdThunk.getAttendance(
              offset,
              limit,
              employee,
              status,
              search,
              queryFrom,
              queryTo
            )
          );
        }
      );
    } else {
      dispatch(attdThunk.updateManyByIds(id, timeFrom, timeTo, value)).then(
        () => {
          dispatch(
            attdThunk.getAttendance(
              offset,
              limit,
              employee,
              status,
              search,
              queryFrom,
              queryTo
            )
          );
        }
      );
    }

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
            <CardHeader title="Update Attendance Record" />
            <CardContent>
              <TimeRangePicker
                from={timeFrom}
                to={timeTo}
                onFromChange={setTimeFrom}
                onToChange={setTimeTo}
                justifyContent="space-between"
              />
              <TextField
                fullWidth
                select
                margin="normal"
                size="small"
                label="Status"
                placeholder="Status"
                value={value}
                onChange={handleStatusChange}
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
                onClick={handleConfirm}
              >
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default UpdateModal;
