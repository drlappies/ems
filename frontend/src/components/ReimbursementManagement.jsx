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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import moment from 'moment'
import Box from '@mui/material/Box';
import axios from 'axios'


function ReimbursementManagement() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        reimbursement: [],
        selectedRow: [],
        employeeList: [],
        isUpdating: false,
        isCreating: false,
        isDeleting: false,
        offset: 0,
        limit: 25,
        rowCount: 0,
        search: "",
        employee: "any",
        status: "any",
        date: [null, null],
        amountFrom: null,
        amountTo: null,
        employeeId: "",
        reason: "",
        applyDate: null,
        amount: null,
        applyStatus: "pending"
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'employee_id', headerName: 'Employee ID', flex: 1 },
        { field: 'firstname', headerName: 'Firstname', flex: 1 },
        { field: 'lastname', headerName: 'Lastname', flex: 1 },
        { field: 'reason', headerName: 'Reason', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchReimbursement = useCallback(async (offset, limit, search, employee, status, date, amountFrom, amountTo) => {
        try {
            const res = await axios.get('/api/reimbursement', {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    employee: employee === 'any' ? null : employee,
                    status: status === 'any' ? null : status,
                    dateFrom: date[0] ? date[0].format('YYYY-MM-DD') : null,
                    dateTo: date[1] ? date[1].format('YYYY-MM-DD') : null,
                    amountFrom: amountFrom,
                    amountTo: amountTo
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    reimbursement: res.data.reimbursement.map((el) => {
                        return {
                            ...el,
                            date: `${new Date(el.date).getDate().toString().padStart(2, 0)}/${(new Date(el.date).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.date).getFullYear()}`
                        }
                    }),
                    rowCount: res.data.rowCount.count,
                    employeeList: res.data.employee,
                    isUpdating: false,
                    isCreating: false,
                    isDeleting: false,
                    employeeId: "",
                    reason: "",
                    applyDate: null,
                    amount: null
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createReimbursement = useCallback(async () => {
        try {
            const res = await axios.post('/api/reimbursement', {
                employeeId: state.employeeId,
                date: state.applyDate ? state.applyDate.format('YYYY-MM-DD') : null,
                amount: state.amount,
                reason: state.reason
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchReimbursement(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchReimbursement, state.amount, state.amountFrom, state.amountTo, state.applyDate, state.date, state.employee, state.employeeId, state.limit, state.offset, state.reason, state.search, state.status])

    const updateReimbursement = useCallback(async () => {
        try {
            const res = await axios.put('/api/reimbursement', {
                id: state.selectedRow,
                status: state.applyStatus,
                reason: state.reason,
                date: state.applyDate,
                amount: state.amount
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchReimbursement(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchReimbursement, state.amount, state.amountFrom, state.amountTo, state.applyDate, state.applyStatus, state.date, state.employee, state.limit, state.offset, state.reason, state.search, state.selectedRow, state.status])

    const deleteReimbursement = useCallback(async () => {
        try {
            const res = await axios.delete(`/api/reimbursement/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchReimbursement(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchReimbursement, state.amountFrom, state.amountTo, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status])

    const toggleUpdating = useCallback(async () => {
        try {
            if (state.isUpdating) {
                return setState(prevState => { return { ...prevState, isUpdating: false } })
            }

            if (state.selectedRow.length > 1) {
                setState(prevState => {
                    return {
                        ...prevState,
                        isUpdating: true,
                        employeeId: "",
                        reason: "",
                        applyDate: null,
                        amount: null
                    }
                })
            } else {
                const res = await axios.get(`/api/reimbursement/${[state.selectedRow]}`)
                setState(prevState => {
                    return {
                        ...prevState,
                        isUpdating: true,
                        employeeId: res.data.reimbursement.employee_id,
                        reason: res.data.reimbursement.reason,
                        applyDate: moment(res.data.reimbursement.date),
                        amount: res.data.reimbursement.amount,
                        applyStatus: res.data.reimbursement.status
                    }
                })
            }
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, state.isUpdating, state.selectedRow])

    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'amount') {
            if (value > 99999.99) {
                value = 99999.99
            } else if (value < 0) {
                value = 0
            }
        }
        setState(prevState => { return { ...prevState, [name]: value } })
    }

    useEffect(() => {
        fetchReimbursement(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
    }, [fetchReimbursement, state.limit, state.offset, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo])

    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
                    paginationMode="server"
                    checkboxSelection
                    disableColumnFilter
                    rows={state.reimbursement}
                    columns={columns}
                    pageSize={state.limit}
                    rowCount={state.rowCount}
                    rowsPerPageOptions={[25, 50, 100]}
                    style={{ height: '75vh', width: "100%" }}
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
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField fullWidth variant="standard" size="small" label="Search" name="search" value={state.search} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" label="Employee" name="employee" value={state.employee} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            {state.employeeList.map((el, i) =>
                                                <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" label="Status" name="status" value={state.status} onChange={handleChange}>
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
                                                        <TextField fullWidth variant="standard" size="small"{...startProps} />
                                                        <Box sx={{ mx: 2 }}> - </Box>
                                                        <TextField fullWidth variant="standard" size="small" {...endProps} />
                                                    </React.Fragment>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item>
                                        <TextField fullWidth size="small" variant="standard" label="Amount range from" type="number" name="amountFrom" value={state.amountFrom} onChange={handleChange} />
                                    </Grid>
                                    <Grid item>
                                        <TextField fullWidth size="small" variant="standard" label="Amount range to" type="number" name="amountTo" value={state.amountTo} onChange={handleChange} />
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
                            <CardHeader title="Create reimbursement record" />
                            <CardContent>
                                <TextField fullWidth select margin="normal" size="small" label="Employee" name="employeeId" value={state.employeeId} onChange={handleChange}>
                                    {state.employeeList.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <TextField fullWidth margin="normal" multiline rows={3} size="small" label="Reason" name="reason" value={state.reason} onChange={handleChange} />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDatePicker
                                        label="Date"
                                        value={state.applyDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, applyDate: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth margin="normal" size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth margin="normal" type="number" size="small" label="Amount" name="amount" value={state.amount} onChange={handleChange} />
                                <TextField fullWidth margin="normal" select size="small" label="Status" name="applyStatus" value={state.applyStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createReimbursement}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Update Reimbursement Record" />
                            <CardContent>
                                <TextField fullWidth margin="normal" multiline rows={3} size="small" label="Reason" name="reason" value={state.reason} onChange={handleChange} />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDatePicker
                                        label="Date"
                                        value={state.applyDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, applyDate: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth margin="normal" size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="applyStatus" value={state.applyStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateReimbursement}>Update</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Delete Reimbursement Record" />
                            <CardContent>
                                Are you sure?
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteReimbursement}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid >
    )
}

export default ReimbursementManagement