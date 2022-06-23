import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

function Filter(props) {
  const {
    search,
    onSearchChange,
    employee,
    onEmployeeChange,
    employeeList,
    status,
    onStatusChange,
    dateFrom,
    dateTo,
    onDateFromChange,
    onDateToChange,
  } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          variant="standard"
          size="small"
          margin="normal"
          label="Search"
          name="search"
          value={search}
          onChange={onSearchChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          variant="standard"
          select
          size="small"
          margin="normal"
          label="Employee"
          name="searchEmployeeId"
          value={employee}
          onChange={onEmployeeChange}
        >
          <MenuItem value="any">Any</MenuItem>
          {employeeList.map((el, i) => (
            <MenuItem key={i} value={el.id}>
              ID: {el.id} {el.firstname} {el.lastname}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          variant="standard"
          select
          size="small"
          margin="normal"
          label="Status"
          name="searchStatus"
          value={status}
          onChange={onStatusChange}
        >
          <MenuItem value="any">Any</MenuItem>
          <MenuItem value="on_time">On Time</MenuItem>
          <MenuItem value="late">Late</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <DateRangePicker
          from={dateFrom}
          to={dateTo}
          onFromChange={onDateFromChange}
          onToChange={onDateToChange}
          variant="standard"
          gap="20px"
        />
      </Grid>
    </Grid>
  );
}

Filter.defaultProps = {
  employeeList: [],
};

export default Filter;
