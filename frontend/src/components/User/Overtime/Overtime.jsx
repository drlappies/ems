import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as userThunk from "../../../redux/thunks/user";
import useCalendar from "../../Calendar/useCalendar";
import { months } from "../../../constants/datetime";
import Calendar from "../../Calendar/Calendar";
import * as dateUtil from "../../../utils/date";
import { networkStatus } from "../../../constants/network";

const generateCalendar = (currentMonth, currentYear, currentOvertimeRecord) => {
  const start = new Date(currentYear, currentMonth, 1);
  const end = new Date(currentYear, currentMonth + 1, 0);
  let month = [];
  for (let i = 0; i < 6; i++) {
    if (start > end) break;
    let week = [];
    for (let j = 0; j < 7; j++) {
      if (j !== start.getDay() || start > end) {
        week.push(null);
      } else if (
        currentOvertimeRecord.find(
          (el) => new Date(el.date).getDate() === start.getDate()
        )
      ) {
        const ot = currentOvertimeRecord.find(
          (el) => new Date(el.date).getDate() === start.getDate()
        );
        start.setDate(start.getDate() + 1);
        week.push({
          date: new Date(ot.date).getDate(),
          from: ot.from,
          to: ot.to,
          status: ot.status,
        });
      } else {
        week.push({
          date: start.getDate(),
          from: null,
          to: null,
          status: null,
        });
        start.setDate(start.getDate() + 1);
      }
    }
    month.push(week);
  }
  return month;
};

function UserOvertime() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const years = dateUtil.getYearSelect();
  const { month, year, next, prev, jump } = useCalendar();

  const calendar = useMemo(
    () => generateCalendar(month, year, user.userOvertime),
    [month, user.userOvertime, year]
  );

  const renderCalendarBox = (date) => {
    return (
      <div>
        {date.from ? <div>IN: {date.from}</div> : null}
        {date.to ? <div>OUT: {date.to}</div> : null}
        {date.status && date.status === "pending" ? (
          <div style={{ backgroundColor: "yellow" }}>Pending</div>
        ) : null}
        {date.status && date.status === "approved" ? (
          <div style={{ backgroundColor: "green" }}>Approved</div>
        ) : null}
        {date.status && date.status === "rejected" ? (
          <div style={{ backgroundColor: "red" }}>Rejected</div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    const { mindate, maxdate } = dateUtil.getDatesByYearAndMonth(year, month);
    dispatch(userThunk.getUserOvertime(mindate, maxdate));
  }, [dispatch, month, year]);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button size="small" variant="contained" onClick={() => prev()}>
          Last Month
        </Button>
      </Grid>
      <Grid item>
        <Button size="small" variant="contained" onClick={() => next()}>
          Next Month
        </Button>
      </Grid>
      <Grid item>
        <TextField
          onChange={(e) => jump(e.target.value, year)}
          value={month}
          select
          size="small"
          margin="none"
          variant="standard"
        >
          {months.map((el, i) => (
            <MenuItem key={i} value={i}>
              {el}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          onChange={(e) => jump(month, e.target.value)}
          value={year}
          select
          size="small"
          margin="none"
          variant="standard"
        >
          {years.map((el, i) => (
            <MenuItem key={i} value={el}>
              {el}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Calendar
          year={year}
          month={month}
          calendar={calendar}
          isLoading={
            user.getUserOvertimeStatus === networkStatus.FETCH_IN_PROGRESS
          }
          renderCalendarBox={renderCalendarBox}
        />
      </Grid>
    </Grid>
  );
}

export default UserOvertime;
