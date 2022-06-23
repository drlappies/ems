import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function DateRangePicker(props) {
    const { onFromChange, onToChange, from, to, justifyContent, variant, gap, alignItems } = props;

    return (
        <Stack direction="row" alignItems={alignItems} gap={gap} justifyContent={justifyContent}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    renderInput={(params) => <TextField {...params} size="small" variant={variant} />}
                    onChange={onFromChange}
                    value={from}
                />
                <span> - </span>
                <DatePicker
                    renderInput={(params) => <TextField {...params} size="small" variant={variant} />}
                    onChange={onToChange}
                    value={to}
                />
            </LocalizationProvider>
        </Stack>
    )
}

DateRangePicker.defaultProps = {
    justifyContent: "start",
    alignItems: "center",
    variant: "outlined",
    gap: "5px",
    from: null,
    to: null,
}

export default DateRangePicker
