import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { popMessage } from '../actions/ui'
import Toolbar from './Toolbar';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import DateAdapter from '@mui/lab/AdapterMoment';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../css/main.css'

function OvertimeHistory() {
    const dispatch = useDispatch()
    const [overtime, setOvertime] = useState([])
    const [state, setState] = useState({
        overtimeHistory: [],
        employeeList: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        selectedRow: [],
        search: "",
        employee: "any",
        status: "any",
        date: [null, null],
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        createEmployee: "",
        createDate: null,
        createCheckIn: null,
        createCheckOut: null,
        createStatus: "",
        updateDate: null,
        updateCheckIn: null,
        updateCheckOut: null,
        updateStatus: "",
        isLoading: true,
        isFetching: true
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'employee_id', headerName: 'Employee ID', flex: 1 },
        { field: 'firstname', headerName: 'firstname', flex: 1 },
        { field: 'lastname', headerName: 'lastname', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'from', headerName: 'Check In', flex: 1 },
        { field: 'to', headerName: 'Check Out', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchOvertime = useCallback(async (offset, limit, search, date, employee, status) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/overtime`, {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    dateFrom: date[0] ? date[0].format('YYYY-MM-DD') : null,
                    dateTo: date[1] ? date[1].format('YYYY-MM-DD') : null,
                    status: status === "any" ? null : status,
                    employee: employee === "any" ? null : employee
                }
            })
            setOvertime(res.data.overtime.map(el => {
                return { ...el, date: `${new Date(el.date).getDate()}/${new Date(el.date).getMonth() + 1}/${new Date(el.date).getFullYear()}` }
            }))
            setState(prevState => {
                return {
                    ...prevState,
                    employeeList: res.data.employee,
                    rowCount: parseInt(res.data.count.count),
                    isCreating: false,
                    isUpdating: false,
                    isDeleting: false,
                    createEmployee: "",
                    createDate: null,
                    createCheckIn: null,
                    createCheckOut: null,
                    createStatus: "",
                    updateDate: null,
                    updateCheckIn: null,
                    updateCheckOut: null,
                    updateStatus: "",
                    isLoading: false,
                    isFetching: false
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createOvertime = useCallback(async () => {
        try {
            const body = {
                employee_id: state.createEmployee,
                from: state.createCheckIn.format('HH:mm:ss'),
                to: state.createCheckOut.format('HH:mm:ss'),
                date: state.createDate.format('YYYY-MM-DD'),
                status: state.createStatus
            }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/overtime`, body)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchOvertime(state.offset, state.limit, state.search, state.date, state.employee, state.status)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchOvertime, state.createCheckIn, state.createCheckOut, state.createDate, state.createEmployee, state.createStatus, state.date, state.employee, state.limit, state.offset, state.search, state.status])

    const deleteOvertime = useCallback(async () => {
        try {
            if (state.selectedRow.length > 1) {
                const res = await axios.delete(`${process.env.REACT_APP_API}/api/overtime/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
                dispatch(popMessage(res.data.success, 'success'))
            } else {
                const res = await axios.delete(`${process.env.REACT_APP_API}/api/overtime/${[state.selectedRow]}`)
                dispatch(popMessage(res.data.success, 'success'))
            }
            return fetchOvertime(state.offset, state.limit, state.search, state.date, state.employee, state.status)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchOvertime, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status])

    const updateOvertime = useCallback(async () => {
        try {
            if (state.selectedRow.length > 1) {
                const body = {
                    id: state.selectedRow,
                    from: state.updateCheckIn ? state.updateCheckIn.format('HH:mm:ss') : null,
                    to: state.updateCheckOut ? state.updateCheckOut.format('HH:mm:ss') : null,
                    status: state.updateStatus
                }
                const res = await axios.put(`${process.env.REACT_APP_API}/api/overtime`, body)
                dispatch(popMessage(res.data.success, 'success'))
            } else {
                const body = {
                    id: [state.selectedRow],
                    from: state.updateCheckIn ? state.updateCheckIn.format('HH:mm:ss') : null,
                    to: state.updateCheckOut ? state.updateCheckOut.format('HH:mm:ss') : null,
                    status: state.updateStatus
                }
                const res = await axios.put(`${process.env.REACT_APP_API}/api/overtime`, body)
                dispatch(popMessage(res.data.success, 'success'))
            }
            return fetchOvertime(state.offset, state.limit, state.search, state.date, state.employee, state.status)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchOvertime, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status, state.updateCheckIn, state.updateCheckOut, state.updateStatus])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit, isLoading: true } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset, isLoading: true } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row } }) }
    const toggleUpdating = () => { setState(prevState => { return { ...prevState, isUpdating: !prevState.isUpdating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => { return { ...prevState, [name]: value } })
    }

    useEffect(() => {
        fetchOvertime(state.offset, state.limit, state.search, state.date, state.employee, state.status)
    }, [fetchOvertime, state.limit, state.offset, state.search, state.date, state.employee, state.status])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <div style={{ height: '75vh', width: "100%" }}>
                    <DataGrid
                        loading={state.isLoading}
                        components={{ Toolbar: Toolbar }}
                        componentsProps={{
                            toolbar: {
                                create: toggleCreating,
                                update: toggleUpdating,
                                destroy: toggleDeleting,
                                isUpdateDisabled: state.selectedRow.length < 1,
                                isDestroyDisabled: state.selectedRow.length < 1,
                                filterOption: (
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <TextField fullWidth variant="standard" size="small" margin="normal" label="Search" name="search" value={state.search} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField select fullWidth variant="standard" size="small" margin="normal" label="Employee" name="employee" value={state.employee} onChange={handleChange}>
                                                <MenuItem value={"any"}>Any</MenuItem>
                                                {state.employeeList.map((el, i) =>
                                                    <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                                )}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField select fullWidth variant="standard" size="small" margin="normal" label="Status" name="status" value={state.status} onChange={handleChange}>
                                                <MenuItem value={"any"}>Any</MenuItem>
                                                <MenuItem value={"pending"}>Pending</MenuItem>
                                                <MenuItem value={"approved"}>Approved</MenuItem>
                                                <MenuItem value={"rejected"}>Rejected</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <LocalizationProvider dateAdapter={DateAdapter}>
                                                <DesktopDateRangePicker
                                                    displayStaticWrapperAs="desktop"
                                                    startText="Date range from"
                                                    endText="Date range to"
                                                    value={state.date}
                                                    name="time"
                                                    onChange={(newValue) => { setState(prevState => { return { ...prevState, date: newValue } }) }}
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
                        rows={overtime}
                        columns={columns}
                        checkboxSelection
                        disableColumnFilter
                        pageSize={state.limit}
                        rowCount={state.rowCount}
                        rowsPerPageOptions={[25, 50, 100]}
                        paginationMode="server"
                        onPageSizeChange={(size) => changePageSize(size)}
                        onPageChange={(page) => changePage(page)}
                        onSelectionModelChange={(row) => handleSelect(row)}
                    />
                </div>
            </Grid>
            <Modal open={state.isCreating} onClose={toggleCreating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Create Overtime Record" subheader="Insert an overtime record for specific employee" />
                            <CardContent>
                                <TextField fullWidth select size="small" margin="normal" name="createEmployee" label="Employee" value={state.createEmployee} onChange={handleChange}>
                                    {state.employeeList.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDatePicker
                                        label="Date"
                                        value={state.createDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createDate: newValue } }) }}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" margin="normal" />}
                                    />
                                    <TimePicker
                                        ampm={false}
                                        openTo={'hours'}
                                        views={['hours', 'minutes', 'seconds']}
                                        mask="__:__:__"
                                        inputFormat="HH:mm:ss"
                                        label="Check In"
                                        value={state.createCheckIn}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createCheckIn: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth size="small" margin="normal" {...params} />}
                                    />
                                    <TimePicker
                                        ampm={false}
                                        views={['hours', 'minutes', 'seconds']}
                                        mask="__:__:__"
                                        inputFormat="HH:mm:ss"
                                        label="Check Out"
                                        value={state.createCheckOut}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createCheckOut: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth size="small" margin="normal" {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField select fullWidth size="small" margin="normal" name="createStatus" label="Status" value={state.createStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createOvertime}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Delete Overtime Record" />
                            <CardContent>
                                Are you sure?
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteOvertime}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Update Overtime Record" />
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
                                <TextField select fullWidth size="small" margin="normal" name="updateStatus" label="Status" value={state.updateStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateOvertime}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default OvertimeHistory