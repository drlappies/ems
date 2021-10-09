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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios'
import moment from 'moment'

function Bonus() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([])
    const [state, setState] = useState({
        bonus: [],
        selectedRow: [],
        employeeList: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        createEmployee: "",
        createReason: "",
        createAmount: "",
        createDate: null,
        search: "",
        employee: "",
        amountFrom: null,
        amountTo: null,
        isLoading: true
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'employee_id', headerName: 'Employee ID', flex: 1 },
        { field: 'firstname', headerName: 'Firstname', flex: 1 },
        { field: 'lastname', headerName: 'Lastname', flex: 1 },
        { field: 'reason', headerName: 'Reason', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
    ]

    const fetchBonus = useCallback(async (offset, limit, search, employee, amountFrom, amountTo) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/bonus`, {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    employee: employee === 'any' ? null : employee,
                    amountFrom: amountFrom,
                    amountTo: amountTo
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setRows(res.data.bonus.map(el => {
                return {
                    ...el,
                    date: `${new Date(el.date).getDate().toString().padStart(2, 0)}/${(new Date(el.date).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.date).getFullYear()}`
                }
            }))
            setState(prevState => {
                return {
                    ...prevState,
                    rowCount: parseInt(res.data.rowCount.count),
                    employeeList: res.data.employee,
                    isCreating: false,
                    isUpdating: false,
                    isDeleting: false,
                    createEmployee: "",
                    createReason: "",
                    createAmount: "",
                    createDate: null,
                    isLoading: false
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createBonus = useCallback(async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/bonus`, {
                employeeId: state.createEmployee,
                reason: state.createReason,
                amount: state.createAmount,
                date: state.createDate ? state.createDate.format('YYYY-MM-DD') : null
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            fetchBonus(state.offset, state.limit, state.search, state.employee, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchBonus, state.amountFrom, state.amountTo, state.createAmount, state.createDate, state.createEmployee, state.createReason, state.employee, state.limit, state.offset, state.search])

    const updateBonus = useCallback(async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/bonus`, {
                id: state.selectedRow,
                employeeId: state.createEmployee,
                reason: state.createReason,
                amount: state.createAmount,
                date: state.createDate ? state.createDate.format('YYYY-MM-DD') : null
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            fetchBonus(state.offset, state.limit, state.search, state.employee, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchBonus, state.amountFrom, state.amountTo, state.createAmount, state.createDate, state.createEmployee, state.createReason, state.employee, state.limit, state.offset, state.search, state.selectedRow])

    const deleteBonus = useCallback(async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/bonus/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popMessage(res.data.success, 'success'))
            fetchBonus(state.offset, state.limit, state.search, state.employee, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchBonus, state.amountFrom, state.amountTo, state.employee, state.limit, state.offset, state.search, state.selectedRow])

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
                        createEmployee: "",
                        createReason: "",
                        createAmount: "",
                        createDate: null
                    }
                })
            } else {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/bonus/${[state.selectedRow]}`, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                });
                setState(prevState => {
                    return {
                        ...prevState,
                        isUpdating: true,
                        createEmployee: res.data.bonus.employee_id,
                        createReason: res.data.bonus.reason,
                        createAmount: res.data.bonus.amount,
                        createDate: moment(res.data.bonus.date)
                    }
                })
            }
        } catch (err) {

        }
    }, [state.isUpdating, state.selectedRow])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit, isLoading: true } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset, isLoading: true } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'createAmount') {
            if (value > 99999.99) {
                value = 99999.99
            } else if (value < 0) {
                value = 0
            }
        }
        setState(prevState => { return { ...prevState, [name]: value } })
    }

    useEffect(() => {
        fetchBonus(state.offset, state.limit, state.search, state.employee, state.amountFrom, state.amountTo)
    }, [fetchBonus, state.limit, state.offset, state.search, state.employee, state.amountFrom, state.amountTo])

    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
                    loading={state.isLoading}
                    paginationMode="server"
                    checkboxSelection
                    disableColumnFilter
                    rows={rows}
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
                            <CardHeader title="Create Bonus" subheader="Grant a bonus to an employee." />
                            <CardContent>
                                <TextField fullWidth select margin="normal" size="small" label="Employee" name="createEmployee" value={state.createEmployee} onChange={handleChange}>
                                    {state.employeeList.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <TextField fullWidth margin="normal" size="small" label="Amount" name="createAmount" type="number" value={state.createAmount} onChange={handleChange} />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDatePicker
                                        label="Date"
                                        value={state.createDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createDate: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth margin="normal" size="small"{...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth margin="normal" size="small" label="Reason" name="createReason" multiline rows={4} value={state.createReason} onChange={handleChange} />
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createBonus}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Update Payroll Record" />
                            <CardContent>
                                <TextField fullWidth select margin="normal" size="small" label="Employee" name="createEmployee" value={state.createEmployee} onChange={handleChange}>
                                    {state.employeeList.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <TextField fullWidth margin="normal" size="small" label="Amount" name="createAmount" type="number" value={state.createAmount} onChange={handleChange} />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDatePicker
                                        label="Date"
                                        value={state.createDate}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createDate: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth margin="normal" size="small"{...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField fullWidth margin="normal" size="small" label="Reason" name="createReason" multiline rows={4} value={state.createReason} onChange={handleChange} />
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateBonus}>Update</Button>
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
                                <Button variant="contained" color="error" onClick={deleteBonus}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid >
    )
}

export default Bonus