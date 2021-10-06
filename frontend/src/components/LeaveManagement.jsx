import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui';
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from './Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import Box from '@mui/material/Box';
import axios from 'axios'
import '../css/main.css'

function LeaveManagement() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        leaveHistory: [],
        employeeList: [],
        selectedRow: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        search: "",
        employee: "any",
        status: "any",
        date: [null, null],
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        createEmployee: "",
        createDate: [null, null],
        createStatus: "",
        createType: "",
        createSpan: "",
        createReason: "",
        updateDate: [null, null],
        updateReason: "",
        updateSpan: "",
        updateType: "",
        updateStatus: ""
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'employee_id', headerName: 'Employee ID', flex: 1 },
        { field: 'firstname', headerName: 'Firstname', flex: 1 },
        { field: 'lastname', headerName: 'Lastname', flex: 1 },
        { field: 'from', headerName: 'Date From', flex: 1 },
        { field: 'to', headerName: 'Date To', flex: 1 },
        { field: 'type', headerName: 'Leave Type', flex: 1 },
        { field: 'duration', headerName: 'Span', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchLeave = useCallback(async (offset, limit, search, employee, status, date) => {
        try {
            const res = await axios.get('/api/leave', {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    employee: employee === 'any' ? null : employee,
                    status: status === 'any' ? null : status,
                    dateFrom: date[0] ? date[0].format('YYYY-MM-DD') : null,
                    dateTo: date[1] ? date[1].format('YYYY-MM-DD') : null
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    leaveHistory: res.data.leave.map(el => {
                        return {
                            ...el,
                            from: `${new Date(el.from).getDate().toString().padStart(2, 0)}/${(new Date(el.from).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.from).getFullYear()}`,
                            to: `${new Date(el.to).getDate().toString().padStart(2, 0)}/${(new Date(el.to).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.to).getFullYear()}`,
                            duration: el.duration === 'full_day' ? "Full Day" : "Half Day",
                        }
                    }),
                    employeeList: res.data.employee,
                    rowCount: parseInt(res.data.rowCount.count),
                    isCreating: false,
                    isUpdating: false,
                    isDeleting: false,
                    createEmployee: "",
                    createDate: [null, null],
                    createStatus: "",
                    createType: "",
                    createSpan: "",
                    createReason: "",
                    updateDate: [null, null],
                    updateReason: "",
                    updateSpan: "",
                    updateType: "",
                    updateStatus: ""
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createLeave = useCallback(async () => {
        try {
            const body = {
                employeeId: state.createEmployee,
                from: state.createDate[0] ? state.createDate[0].format('YYYY-MM-DD') : null,
                to: state.createDate[1] ? state.createDate[1].format('YYYY-MM-DD') : null,
                type: state.createType,
                duration: state.createSpan,
                reason: state.createReason
            }
            const res = await axios.post('/api/leave', body)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchLeave(state.offset, state.limit, state.search, state.employee, state.status, state.date)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchLeave, state.createDate, state.createEmployee, state.createReason, state.createSpan, state.createType, state.date, state.employee, state.limit, state.offset, state.search, state.status])

    const updateLeave = useCallback(async () => {
        try {
            const body = {
                id: state.selectedRow,
                duration: state.updateSpan,
                type: state.updateType,
                status: state.updateStatus
            }
            const res = await axios.put('/api/leave', body)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchLeave(state.offset, state.limit, state.search, state.employee, state.status, state.date)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchLeave, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status, state.updateSpan, state.updateStatus, state.updateType])

    const deleteLeave = useCallback(async () => {
        try {
            const res = await axios.delete(`/api/leave/${state.selectedRow.map((el, i) => i === 0 ? `?ids=${el}` : `&ids=${el}`).join("")}`)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchLeave(state.offset, state.limit, state.search, state.employee, state.status, state.date)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchLeave, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const toggleUpdating = () => { setState(prevState => { return { ...prevState, isUpdating: !prevState.isUpdating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => { return { ...prevState, [name]: value } })
    }

    useEffect(() => {
        fetchLeave(state.offset, state.limit, state.search, state.employee, state.status, state.date)
    }, [fetchLeave, state.limit, state.offset, state.search, state.employee, state.status, state.date])

    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
                    checkboxSelection
                    paginationMode="server"
                    disableColumnFilter
                    pageSize={state.limit}
                    rowCount={state.rowCount}
                    rowsPerPageOptions={[25, 50, 100]}
                    style={{ height: '75vh', width: "100%" }}
                    rows={state.leaveHistory}
                    columns={columns}
                    onSelectionModelChange={(row) => handleSelect(row)}
                    onPageSizeChange={(size) => changePageSize(size)}
                    onPageChange={(page) => changePage(page)}
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
                                        <TextField fullWidth variant="standard" select size="small" margin="normal" label="Employee" name="employee" value={state.employee} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            {state.employeeList.map((el, i) =>
                                                <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" margin="normal" label="Status" name="status" value={state.status} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="approved">Approved</MenuItem>
                                            <MenuItem value="rejected">Rejected</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={DateAdapter}>
                                            <DesktopDateRangePicker
                                                displayStaticWrapperAs="desktop"
                                                startText="Date range from"
                                                endText="Date range to"
                                                value={state.date}
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
                />
            </Grid>
            <Modal open={state.isCreating} onClose={toggleCreating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Create Leave Record" subheader="Create specific leave record for an employee" />
                            <CardContent>
                                <TextField fullWidth select margin="normal" size="small" label="Employee" name="createEmployee" value={state.createEmployee} onChange={handleChange}>
                                    {state.employeeList.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDateRangePicker
                                        displayStaticWrapperAs="desktop"
                                        startText="Leave from"
                                        endText="Leave to"
                                        value={state.createDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createDate: newValue } }) }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField fullWidth margin="normal" size="small"{...startProps} />
                                                <Box sx={{ mx: 2 }}> - </Box>
                                                <TextField fullWidth margin="normal" size="small" {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth multiline rows={4} margin="normal" size="small" label="Reason" name="createReason" value={state.createReason} onChange={handleChange} />
                                <TextField fullWidth select margin="normal" size="small" label="Span" name="createSpan" value={state.createSpan} onChange={handleChange}>
                                    <MenuItem value="half_day">Half Day</MenuItem>
                                    <MenuItem value="full_day">Full Day</MenuItem>
                                </TextField>
                                <TextField fullWidth select margin="normal" size="small" label="Type" name="createType" value={state.createType} onChange={handleChange}>
                                    <MenuItem value="sick_leave">Sick Leave</MenuItem>
                                    <MenuItem value="no_pay_leave">No Pay Leave</MenuItem>
                                </TextField>
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="createStatus" value={state.createStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createLeave}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Update Leave Record" />
                            <CardContent>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDateRangePicker
                                        displayStaticWrapperAs="desktop"
                                        startText="Leave from"
                                        endText="Leave to"
                                        value={state.updateDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, updateDate: newValue } }) }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField fullWidth margin="normal" size="small"{...startProps} />
                                                <Box sx={{ mx: 2 }}> - </Box>
                                                <TextField fullWidth margin="normal" size="small" {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth multiline rows={4} margin="normal" size="small" label="Reason" name="updateReason" value={state.updateReason} onChange={handleChange} />
                                <TextField fullWidth select margin="normal" size="small" label="Span" name="updateSpan" value={state.updateSpan} onChange={handleChange}>
                                    <MenuItem value="half_day">Half Day</MenuItem>
                                    <MenuItem value="full_day">Full Day</MenuItem>
                                </TextField>
                                <TextField fullWidth select margin="normal" size="small" label="Type" name="updateType" value={state.updateType} onChange={handleChange}>
                                    <MenuItem value="sick_leave">Sick Leave</MenuItem>
                                    <MenuItem value="no_pay_leave">No Pay Leave</MenuItem>
                                </TextField>
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="updateStatus" value={state.updateStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateLeave}>Update</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Delete Leave Record" />
                            <CardContent>
                                Are you sure?
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteLeave}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default LeaveManagement