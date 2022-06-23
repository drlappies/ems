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

const generateCalendar = (currentMonth, currentYear, currentMonthlyLeave) => {
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
        currentMonthlyLeave.filter(
          (el) =>
            new Date(el.from).getDate() <= start.getDate() &&
            new Date(el.to).getDate() >= start.getDate()
        ).length
      ) {
        const [leave] = currentMonthlyLeave.filter(
          (el) =>
            new Date(el.from).getDate() <= start.getDate() &&
            new Date(el.to).getDate() >= start.getDate()
        );
        week.push({
          date: start.getDate(),
          status: leave.status,
          type: leave.type,
          duration: leave.duration,
        });
        start.setDate(start.getDate() + 1);
      } else {
        week.push({
          date: start.getDate(),
          status: null,
          type: null,
          duration: null,
        });
        start.setDate(start.getDate() + 1);
      }
    }
    month.push(week);
  }
  return month;
};

function Leave() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const years = dateUtil.getYearSelect();
  const { month, year, next, prev, jump } = useCalendar();

  const calendar = useMemo(
    () => generateCalendar(month, year, user.userLeave),
    [month, user.userLeave, year]
  );

  const renderCalendarBox = (date) => {
    if (!date) return;

    return (
      <div>
        {date.duration && date.duration === "full_day" ? (
          <div>Full Day</div>
        ) : null}
        {date.duration && date.duration === "half_day" ? (
          <div>Half Day</div>
        ) : null}
        {date.type && date.type === "sick_leave" ? (
          <div style={{ backgroundColor: "#9acd32" }}>Sick Leave</div>
        ) : null}
        {date.type && date.type === "no_pay_leave" ? (
          <div style={{ backgroundColor: "#B0E0E6" }}>No Pay Leave</div>
        ) : null}
        {date.type && date.type === "annual_leave" ? (
          <div style={{ backgroundColor: "#89CFF0" }}>Annual Leave</div>
        ) : null}
        {date.status && date.status === "rejected" ? (
          <div style={{ backgroundColor: "red" }}>Rejected</div>
        ) : null}
        {date.status && date.status === "approved" ? (
          <div style={{ backgroundColor: "green" }}>Approved</div>
        ) : null}
        {date.status && date.status === "pending" ? (
          <div style={{ backgroundColor: "yellow" }}>Pending</div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    const { mindate, maxdate } = dateUtil.getDatesByYearAndMonth(year, month);
    dispatch(userThunk.getUserLeave(mindate, maxdate));
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
            user.getUserLeaveStatus === networkStatus.FETCH_IN_PROGRESS
          }
          renderCalendarBox={renderCalendarBox}
        />
      </Grid>
    </Grid>
  );
}

export default Leave;
