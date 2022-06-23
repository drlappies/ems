import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function TimeRangePicker(props) {
  const {
    onFromChange,
    onToChange,
    from,
    to,
    justifyContent,
    variant,
    gap,
    alignItems,
    error,
  } = props;

  return (
    <Stack
      direction="row"
      alignItems={alignItems}
      gap={gap}
      justifyContent={justifyContent}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          ampm={false}
          value={from}
          onChange={onFromChange}
          label="From"
          inputFormat="HH:mm:ss"
          openTo="hours"
          views={["hours", "minutes", "seconds"]}
          mask="__:__:__"
          renderInput={(params) => (
            <TextField
              {...params}
              variant={variant}
              size="small"
              error={error}
            />
          )}
        />
        <span> - </span>
        <TimePicker
          ampm={false}
          value={to}
          onChange={onToChange}
          label="To"
          placeholder="To"
          inputFormat="HH:mm:ss"
          openTo="hours"
          views={["hours", "minutes", "seconds"]}
          mask="__:__:__"
          renderInput={(params) => (
            <TextField
              {...params}
              variant={variant}
              size="small"
              error={error}
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
}

TimeRangePicker.defaultProps = {
  justifyContent: "start",
  alignItems: "center",
  variant: "outlined",
  gap: "5px",
  from: null,
  to: null,
};

export default TimeRangePicker;
