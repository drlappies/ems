import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { popMessage } from '../redux/actions/ui';
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
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'


function Allowance() {
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
    const [state, setState] = useState({
        offset: 0,
        limit: 25,
        rowCount: 0,
        allowance: [],
        employeeList: [],
        employeeEntitledList: [],
        selectedRow: [],
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        queryStatus: "any",
        amountFrom: null,
        amountTo: null,
        search: "",
        name: "",
        amount: "",
        desc: "",
        status: "active",
        addEmployee: "",
        isLoading: true
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchAllowance = useCallback(async (offset, limit, search, amountFrom, amountTo, status) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/allowance`, {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    amountFrom: amountFrom,
                    amountTo: amountTo,
                    status: status === 'any' ? null : status
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setRows(res.data.allowance)
            setState(prevState => {
                return {
                    ...prevState,
                    rowCount: parseInt(res.data.rowCount.count),
                    isCreating: false,
                    isUpdating: false,
                    isDeleting: false,
                    name: "",
                    amount: "",
                    desc: "",
                    status: "active",
                    isLoading: false
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createAllowance = useCallback(async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/allowance`, {
                name: state.name,
                description: state.desc,
                amount: state.amount,
                status: state.status
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            fetchAllowance(state.offset, state.limit, state.search, state.amountFrom, state.amountTo, state.queryStatus)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchAllowance, state.amount, state.amountFrom, state.amountTo, state.desc, state.limit, state.name, state.offset, state.queryStatus, state.search, state.status])

    const updateAllowance = useCallback(async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/allowance`, {
                id: state.selectedRow,
                name: state.name,
                description: state.desc,
                amount: state.amount,
                status: state.status,
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            fetchAllowance(state.offset, state.limit, state.search, state.amountFrom, state.amountTo, state.queryStatus)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchAllowance, state.amount, state.amountFrom, state.amountTo, state.desc, state.limit, state.name, state.offset, state.queryStatus, state.search, state.selectedRow, state.status])

    const deleteAllowance = useCallback(async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/allowance/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popMessage(res.data.success, 'success'))
            fetchAllowance(state.offset, state.limit, state.search, state.amountFrom, state.amountTo, state.queryStatus)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchAllowance, state.amountFrom, state.amountTo, state.limit, state.offset, state.queryStatus, state.search, state.selectedRow])

    const entitleEmployee = useCallback(async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/allowance/entitlement/${[state.selectedRow]}`, {
                employeeId: state.addEmployee
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            const res2 = await axios.get(`${process.env.REACT_APP_API}/api/allowance/${[state.selectedRow]}`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    isUpdating: true,
                    addEmployee: null,
                    employeeList: res2.data.employee,
                    name: res2.data.allowance.name,
                    desc: res2.data.allowance.description,
                    amount: res2.data.allowance.amount,
                    status: res2.data.allowance.status,
                    employeeEntitledList: res2.data.allowance_employee
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, state.addEmployee, state.selectedRow])

    const disentitleEmployee = useCallback(async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/allowance/entitlement/${[state.selectedRow]}/employee/${id}`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            const res2 = await axios.get(`${process.env.REACT_APP_API}/api/allowance/${[state.selectedRow]}`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    isUpdating: true,
                    employeeList: res2.data.employee,
                    name: res2.data.allowance.name,
                    desc: res2.data.allowance.description,
                    amount: res2.data.allowance.amount,
                    status: res2.data.allowance.status,
                    employeeEntitledList: res2.data.allowance_employee
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, state.selectedRow])

    const toggleUpdating = async () => {
        try {
            if (state.isUpdating) {
                return setState(prevState => { return { ...prevState, isUpdating: false } })
            }

            if (state.selectedRow.length > 1) {
                setState(prevState => {
                    return {
                        ...prevState,
                        isUpdating: true,
                        name: "",
                        amount: "",
                        desc: "",
                        status: "active"
                    }
                })
            } else {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/allowance/${[state.selectedRow]}`, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                setState(prevState => {
                    return {
                        ...prevState,
                        isUpdating: true,
                        employeeList: res.data.employee,
                        name: res.data.allowance.name,
                        desc: res.data.allowance.description,
                        amount: res.data.allowance.amount,
                        status: res.data.allowance.status,
                        employeeEntitledList: res.data.allowance_employee
                    }
                })
            }
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit, isLoading: true } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset, isLoading: true } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
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
        fetchAllowance(state.offset, state.limit, state.search, state.amountFrom, state.amountTo, state.queryStatus)
    }, [fetchAllowance, state.limit, state.offset, state.search, state.amountFrom, state.amountTo, state.queryStatus])

    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
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
                                        <TextField fullWidth variant="standard" select size="small" label="Status" name="queryStatus" value={state.queryStatus} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="disabled">Disabled</MenuItem>
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
                            <CardHeader title="Create Allowance" />
                            <CardContent>
                                <TextField fullWidth margin="normal" size="small" label="Name" name="name" value={state.name} onChange={handleChange} />
                                <TextField fullWidth margin="normal" size="small" label="Description" multiline rows={3} name="desc" value={state.desc} onChange={handleChange} />
                                <TextField fullWidth margin="normal" size="small" type="number" label="Amount" name="amount" value={state.amount} onChange={handleChange} />
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="status" value={state.status} onChange={handleChange}>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="disabled">Disabled</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createAllowance}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={state.selectedRow.length > 1 ? 5 : 9}>
                        <Card>
                            <CardHeader title="Update Allowance" />
                            <CardContent>
                                {state.selectedRow.length > 1 ?
                                    <React.Fragment>
                                        <TextField fullWidth margin="normal" size="small" type="number" label="Amount" name="amount" value={state.amount} onChange={handleChange} />
                                        <TextField fullWidth select margin="normal" size="small" label="Status" name="status" value={state.status} onChange={handleChange}>
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="disabled">Disabled</MenuItem>
                                        </TextField>
                                    </React.Fragment>
                                    :
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <TextField fullWidth margin="normal" size="small" label="Name" name="name" value={state.name} onChange={handleChange} />
                                            <TextField fullWidth margin="normal" size="small" label="Description" multiline rows={3} name="desc" value={state.desc} onChange={handleChange} />
                                            <TextField fullWidth margin="normal" size="small" type="number" label="Amount" name="amount" value={state.amount} onChange={handleChange} />
                                            <TextField fullWidth select margin="normal" size="small" label="Status" name="status" value={state.status} onChange={handleChange}>
                                                <MenuItem value="active">Active</MenuItem>
                                                <MenuItem value="disabled">Disabled</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                                                <TextField select fullWidth margin="normal" size="small" label="Employee" name="addEmployee" value={state.addEmployee} onChange={handleChange}>
                                                    {state.employeeList.map((el, i) =>
                                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                                    )}
                                                </TextField>
                                                <Button variant="contained" onClick={entitleEmployee} disabled={state.employeeList.length < 1 || !state.addEmployee}>Add</Button>
                                            </Stack>
                                            <div style={{ overflowY: "scroll" }}>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>ID</TableCell>
                                                            <TableCell>Entitled Employee</TableCell>
                                                            <TableCell align="right">Action</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {state.employeeEntitledList.map((el, i) =>
                                                            <TableRow key={i}>
                                                                <TableCell>{el.id}</TableCell>
                                                                <TableCell>{el.firstname} {el.lastname}</TableCell>
                                                                <TableCell align="right"><Button onClick={() => disentitleEmployee(el.id)} size="small" variant="contained" color="error">Remove</Button></TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </Grid>
                                    </Grid>}
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateAllowance}>Update</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Delete Allowance" />
                            <CardContent>
                                Are you sure?
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteAllowance} >Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>

        </Grid>
    )
}

export default Allowance