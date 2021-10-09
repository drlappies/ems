import React, { useEffect, useState, useCallback } from 'react';
import { popMessage } from '../actions/ui';
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Toolbar from './Toolbar'
import axios from 'axios'
import '../css/main.css'
import { Typography } from '@mui/material';

function AttendanceHistory() {
    const dispatch = useDispatch()
    const [attendance, setAttendance] = useState([])
    const [state, setState] = useState({
        limit: 25,
        offset: 0,
        rowCount: 0,
        search: "",
        attendance: [],
        selectedAttendance: [],
        employee: [],
        id: "",
        employeeId: "",
        firstname: "",
        lastname: "",
        checkIn: null,
        checkOut: null,
        status: "",
        date: "",
        isUpdating: false,
        isCreating: false,
        isBatchUpdating: false,
        searchEmployeeId: "any",
        searchTime: [null, null],
        searchStatus: "any",
        isDeleting: false,
        updateStatus: "",
        updateCheckIn: null,
        updateCheckOut: null,
        isLoading: true
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'employee_id', headerName: 'Employee ID', flex: 1 },
        { field: 'firstname', headerName: 'Firstname', flex: 1 },
        { field: 'lastname', headerName: 'Lastname', flex: 1 },
        { field: 'date', headerName: 'Date', type: 'date', flex: 1 },
        { field: 'check_in', headerName: 'Check In', type: 'time', flex: 1 },
        { field: 'check_out', headerName: 'Check Out', type: 'time', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
    ]

    const fetchAttendance = useCallback(async (limit, offset, search, employeeId, status, time) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/attendance`, {
                params: {
                    limit: limit,
                    offset: offset,
                    search: search,
                    employeeId: employeeId === 'any' ? null : employeeId,
                    status: status === 'any' ? null : status,
                    dateFrom: time[0] ? time[0].format('YYYY-MM-DD') : null,
                    dateTo: time[1] ? time[1].format('YYYY-MM-DD') : null
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                },
            });
            setAttendance(res.data.attendance.map(el => {
                return {
                    ...el,
                    date: `${new Date(el.date).getDate()}/${(new Date(el.date).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.date).getFullYear().toString().padStart(2, 0)}`,
                    status: el.status === 'on_time' ? "On-Time" : "Late"
                }
            }))
            setState(prevState => {
                return {
                    ...prevState,
                    updateStatus: "",
                    updateCheckIn: null,
                    updateCheckOut: null,
                    employee: res.data.employee,
                    rowCount: parseInt(res.data.rowCount.count),
                    isUpdating: false,
                    isCreating: false,
                    isBatchUpdating: false,
                    isDeleting: false,
                    id: "",
                    employeeId: "",
                    firstname: "",
                    lastname: "",
                    checkIn: null,
                    checkOut: null,
                    status: "",
                    date: null,
                    isLoading: false
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error), 'error')
        }
    }, [dispatch])

    const createAttendance = useCallback(async () => {
        try {
            const body = {
                employee_id: state.employeeId,
                date: state.date ? state.date.format('YYYY-MM-DD') : null,
                check_in: state.date ? state.checkIn.format('HH:mm:ss') : null,
                check_out: state.date ? state.checkOut.format('HH:mm:ss') : null,
                status: state.status
            }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/attendance`, body, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchAttendance(state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchAttendance, state.checkIn, state.checkOut, state.date, state.employeeId, state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime, state.status])

    const deleteAttendance = useCallback(async () => {
        try {
            if (state.selectedAttendance.length > 1) {
                const res = await axios.delete(`${process.env.REACT_APP_API}/api/attendance/${state.selectedAttendance.map((el, i) => i === 0 ? `?id=${el}&` : `id=${el}&`).join("")}`, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                dispatch(popMessage(res.data.success), 'success')
            } else {
                const res = await axios.delete(`${process.env.REACT_APP_API}/api/attendance/${[state.selectedAttendance]}`, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                dispatch(popMessage(res.data.success), 'success')
            }
            return fetchAttendance(state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchAttendance, state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime, state.selectedAttendance])

    const updateAttendance = useCallback(async () => {
        try {
            if (state.selectedAttendance.length > 1) {
                const body = {
                    id: state.selectedAttendance,
                    status: state.updateStatus,
                    check_in: state.updateCheckIn ? state.updateCheckIn.format('HH:mm:ss') : null,
                    check_out: state.updateCheckOut ? state.updateCheckOut.format('HH:mm:ss') : null
                }
                const res = await axios.put(`${process.env.REACT_APP_API}/api/attendance`, body, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                dispatch(popMessage(res.data.success), 'success')
            } else {
                const body = {
                    status: state.updateStatus,
                    check_in: state.updateCheckIn ? state.updateCheckIn.format('HH:mm:ss') : null,
                    check_out: state.updateCheckOut ? state.updateCheckOut.format('HH:mm:ss') : null
                }
                const res = await axios.put(`${process.env.REACT_APP_API}/api/attendance/${[state.selectedAttendance]}`, body)
                dispatch(popMessage(res.data.success), 'success')
            }
            return fetchAttendance(state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchAttendance, state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime, state.selectedAttendance, state.updateCheckIn, state.updateCheckOut, state.updateStatus])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit, isLoading: true } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset, isLoading: true } }) }
    const toggleUpdating = () => { setState(prevState => { return { ...prevState, isUpdating: !prevState.isUpdating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const handleSelect = (e) => { setState(prevState => { return { ...prevState, selectedAttendance: e, } }) }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    useEffect(() => {
        fetchAttendance(state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime)
    }, [fetchAttendance, state.limit, state.offset, state.search, state.searchEmployeeId, state.searchStatus, state.searchTime])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <div style={{ width: "100%", height: '75vh' }}>
                    <DataGrid
                        loading={state.isLoading}
                        components={{ Toolbar: Toolbar }}
                        componentsProps={{
                            toolbar: {
                                create: toggleCreating,
                                update: toggleUpdating,
                                destroy: toggleDeleting,
                                isUpdateDisabled: state.selectedAttendance.length < 1,
                                isDestroyDisabled: state.selectedAttendance.length < 1,
                                filterOption: (
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <TextField fullWidth variant="standard" size="small" margin="normal" label="Search" name="search" value={state.search} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField fullWidth variant="standard" select size="small" margin="normal" label="Employee" name="searchEmployeeId" value={state.searchEmployeeId} onChange={handleChange}>
                                                <MenuItem value="any">Any</MenuItem>
                                                {state.employee.map((el, i) =>
                                                    <MenuItem key={i} value={el.id}>
                                                        ID: {el.id} {el.firstname} {el.lastname}
                                                    </MenuItem>
                                                )}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField fullWidth variant="standard" select size="small" margin="normal" label="Status" name="searchStatus" value={state.searchStatus} onChange={handleChange}>
                                                <MenuItem value="any">Any</MenuItem>
                                                <MenuItem value="on_time">On Time</MenuItem>
                                                <MenuItem value="late">Late</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <LocalizationProvider dateAdapter={DateAdapter}>
                                                <DesktopDateRangePicker
                                                    displayStaticWrapperAs="desktop"
                                                    startText="Date range from"
                                                    endText="Date range to"
                                                    value={state.searchTime}
                                                    name="searchTime"
                                                    onChange={(newValue) => {
                                                        setState(prevState => {
                                                            return {
                                                                ...prevState,
                                                                searchTime: newValue
                                                            }
                                                        })
                                                    }}
                                                    renderInput={(startProps, endProps) => (
                                                        <React.Fragment>
                                                            <TextField fullWidth variant="standard" margin="normal" size="small"{...startProps} />
                                                            <Box sx={{ mx: 2 }}> - </Box>
                                                            <TextField fullWidth variant="standard" margin="normal" size="small" {...endProps} />
                                                        </React.Fragment>
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        }}
                        checkboxSelection
                        paginationMode="server"
                        disableColumnFilter
                        rows={attendance}
                        columns={columns}
                        pageSize={state.limit}
                        rowCount={state.rowCount}
                        rowsPerPageOptions={[25, 50, 100]}
                        onSelectionModelChange={(row) => handleSelect(row)}
                        onPageSizeChange={(size) => changePageSize(size)}
                        onPageChange={(page) => changePage(page)}
                    />
                </div>
            </Grid>
            <Modal open={state.isCreating} onClose={toggleCreating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Create Attendance Record" subheader="Create specific attendance record for an employee" />
                            <CardContent>
                                <TextField fullWidth select margin="normal" size="small" label="Employee" name="employeeId" value={state.employeeId} onChange={handleChange}>
                                    {state.employee.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDatePicker
                                        label="Date"
                                        value={state.date}
                                        name="date"
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, date: newValue } }) }}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" margin="normal" />}
                                    />
                                    <TimePicker
                                        ampm={false}
                                        openTo={'hours'}
                                        views={['hours', 'minutes', 'seconds']}
                                        mask="__:__:__"
                                        inputFormat="HH:mm:ss"
                                        label="Check In"
                                        value={state.checkIn}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, checkIn: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth size="small" margin="normal" {...params} />}
                                    />
                                    <TimePicker
                                        ampm={false}
                                        views={['hours', 'minutes', 'seconds']}
                                        mask="__:__:__"
                                        inputFormat="HH:mm:ss"
                                        label="Check Out"
                                        value={state.checkOut}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, checkOut: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth size="small" margin="normal" {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="status" value={state.status} onChange={handleChange}>
                                    <MenuItem value="on_time">On Time</MenuItem>
                                    <MenuItem value="late">Late</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createAttendance}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Update Attendance Record" />
                            <CardContent>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <TimePicker
                                        ampm={false}
                                        openTo={'hours'}
                                        views={['hours', 'minutes', 'seconds']}
                                        mask="__:__:__"
                                        inputFormat="HH:mm:ss"
                                        label="Check In"
                                        value={state.updateCheckIn}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, updateCheckIn: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth size="small" margin="normal" {...params} />}
                                    />
                                    <TimePicker
                                        ampm={false}
                                        views={['hours', 'minutes', 'seconds']}
                                        mask="__:__:__"
                                        inputFormat="HH:mm:ss"
                                        label="Check Out"
                                        value={state.updateCheckOut}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, updateCheckOut: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth size="small" margin="normal" {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="updateStatus" value={state.updateStatus} onChange={handleChange}>
                                    <MenuItem value="on_time">On Time</MenuItem>
                                    <MenuItem value="late">Late</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateAttendance}>Update</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Delete Attendance Record" />
                            <CardContent>
                                <Typography>Are you sure?</Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteAttendance}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid >
    )
}

export default AttendanceHistory