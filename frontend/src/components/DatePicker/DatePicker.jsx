import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function DatePicker(props) {
  const { onChange, value, fullWidth, error } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            fullWidth={fullWidth}
            margin="normal"
            error={error}
          />
        )}
        onChange={onChange}
        value={value}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
