import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import * as attdThunk from "../../redux/thunks/attendance";
import { networkStatus } from "../../constants/network";

function DeleteModal(props) {
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
  const attd = useSelector((state) => state.attendance);

  const handleConfirm = async () => {
    if (id.length < 2) {
      dispatch(attdThunk.deleteAttendanceById(id));
    } else {
      dispatch(attdThunk.deleteManyByIds(id));
    }

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
            <CardHeader title="Delete Attendance Record" />
            <CardContent>
              <Typography>Are you sure?</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
              <LoadingButton
                loading={
                  attd.deleteAttdStatus === networkStatus.FETCH_IN_PROGRESS
                }
                variant="contained"
                color="error"
                onClick={handleConfirm}
              >
                Delete
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default DeleteModal;
