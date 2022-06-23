import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

function Filter(props) {
  const {
    search,
    handleSearchChange,
    employeeId,
    handleEmployeeIdChange,
    employeeList,
    status,
    handleStatusChange,
    onFromChange,
    onToChange,
    from,
    to,
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
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          select
          fullWidth
          variant="standard"
          size="small"
          margin="normal"
          label="Employee"
          name="employee"
          value={employeeId}
          onChange={handleEmployeeIdChange}
        >
          <MenuItem value={"any"}>Any</MenuItem>
          {employeeList.map((el, i) => (
            <MenuItem key={i} value={el.id}>
              ID: {el.id} {el.firstname} {el.lastname}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <TextField
          select
          fullWidth
          variant="standard"
          size="small"
          margin="normal"
          label="Status"
          name="status"
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value={"any"}>Any</MenuItem>
          <MenuItem value={"pending"}>Pending</MenuItem>
          <MenuItem value={"approved"}>Approved</MenuItem>
          <MenuItem value={"rejected"}>Rejected</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <DateRangePicker
          onFromChange={onFromChange}
          onToChange={onToChange}
          from={from}
          to={to}
          variant="standard"
          gap="20px"
        />
      </Grid>
    </Grid>
  );
}

export default Filter;
