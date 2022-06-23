import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import useDateRange from "../../components/DateRangePicker/useDateRange";
import DatePicker from "../../components/DatePicker/DatePicker";
import useInput from "../../hooks/useInput";
import * as reimbThunk from "../../redux/thunks/reimbursement";

function Reimbursement() {
  const dispatch = useDispatch();
  const { from, setFrom, reset } = useDateRange();
  const [reason, handleReasonChange, clearReason] = useInput("");
  const [amount, handleAmountChange, clearAmount] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reimbThunk.postApplyReimb(from, reason, amount));
    clearReason();
    clearAmount();
    reset();
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Card>
          <CardHeader title="Reimbursement Application Form" />
          <CardContent>
            <DatePicker value={from} onChange={setFrom} fullWidth />
            <TextField
              fullWidth
              margin="normal"
              size="small"
              multiline
              rows={3}
              label="Reason"
              name="reason"
              type="number"
              value={reason}
              onChange={handleReasonChange}
            />
            <TextField
              fullWidth
              margin="normal"
              size="small"
              label="Amount"
              name="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Apply
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Reimbursement;
