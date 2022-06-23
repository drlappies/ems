import "./calendar.css";
import React, { useMemo, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Calendar from "../../Calendar/Calendar";
import useCalendar from "../../Calendar/useCalendar";
import { months } from "../../../constants/datetime";
import { networkStatus } from "../../../constants/network";
import * as userThunk from "../../../redux/thunks/user";
import * as dateUtil from "../../../utils/date";

const generateCalendar = (currentYear, currentMonth, monthlyAttendance) => {
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
        monthlyAttendance.find(
          (el) => new Date(el.date).getDate() === start.getDate()
        )
      ) {
        const attendance = monthlyAttendance.find(
          (el) => new Date(el.date).getDate() === start.getDate()
        );
        start.setDate(start.getDate() + 1);
        week.push({
          date: new Date(attendance.date).getDate(),
          status: attendance.status,
          checkIn: attendance.check_in,
          checkOut: attendance.check_out,
        });
      } else {
        week.push({
          date: start.getDate(),
          status: null,
          checkIn: null,
          checkOut: null,
        });
        start.setDate(start.getDate() + 1);
      }
    }
    month.push(week);
  }
  return month;
};

function Attendance() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const years = dateUtil.getYearSelect();
  const { month, year, next, prev, jump } = useCalendar();

  const calendar = useMemo(
    () => generateCalendar(year, month, user.userAttd),
    [month, user.userAttd, year]
  );

  const renderCalendarBox = (date) => {
    if (!date) return;

    return (
      <div>
        {date.checkIn ? <div>in: {date.checkIn}</div> : null}
        {date.checkOut ? (
          <div>
            <span>out: </span>
            <span> {date.checkOut ? date.checkOut : "NO CHECKOUT"}</span>
          </div>
        ) : null}

        {date.status ? (
          <div className={`calendar-date-status ${date.status}`}>
            {date.status === "on_time" ? "On Time" : "Late"}
          </div>
        ) : null}
      </div>
    );
  };

  useLayoutEffect(() => {
    const { mindate, maxdate } = dateUtil.getDatesByYearAndMonth(year, month);
    dispatch(userThunk.getUserAttendance(mindate, maxdate));
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
          isLoading={user.getUserAttdStatus === networkStatus.FETCH_IN_PROGRESS}
          renderCalendarBox={renderCalendarBox}
        />
      </Grid>
    </Grid>
  );
}

export default Attendance;
