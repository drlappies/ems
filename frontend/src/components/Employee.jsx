import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { popMessage } from '../actions/ui'
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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import axios from 'axios'

function Employee() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        employeeList: [],
        posList: [],
        deptList: [],
        selectedRow: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        search: "",
        position: "any",
        department: "any",
        role: "any",
        status: "any",
        salaryFrom: null,
        salaryTo: null,
        hasOTpay: "any"
    })

    const columns = [
        { field: 'id', headerName: "ID", },
        { field: 'firstname', headerName: "Firstname" },
        { field: 'lastname', headerName: 'Lastname' },
        { field: 'address', headerName: 'Address' },
        { field: 'phone_number', headerName: 'Phone Number' },
        { field: 'post', headerName: 'Position' },
        { field: 'name', headerName: 'Department' },
        { field: 'onboard_date', headerName: 'Onboard Date' },
        { field: 'role', headerName: 'Role' },
        { field: 'start_hour', headerName: 'Working Hour(Start)' },
        { field: 'end_hour', headerName: 'Working Hour(End)' },
        { field: 'status', headerName: 'Status' },
        { field: 'salary_monthly', headerName: 'Salary' },
        { field: 'ot_pay_entitled', headerName: 'OT compensation entitlement' },
        { field: 'ot_hourly_salary', headerName: 'OT hourly compensation' }
    ]

    const fetchEmployee = useCallback(async (offset, limit, search, position, department, role, status, salaryFrom, salaryTo, hasOTpay) => {
        try {
            const res = await axios.get('/api/employee', {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    position: position === 'any' ? null : position,
                    department: department === 'any' ? null : department,
                    role: role === 'any' ? null : role,
                    status: status === 'any' ? null : status,
                    salaryFrom: salaryFrom,
                    salaryTo: salaryTo,
                    hasOTpay: hasOTpay === 'any' ? null : hasOTpay === 'entitled' ? true : false
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    employeeList: res.data.employee.map(el => {
                        return {
                            ...el,
                            onboard_date: `${new Date(el.onboard_date).getDate().toString().padStart(2, 0)}/${(new Date(el.onboard_date).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.onboard_date).getFullYear()}`,
                            post: el.post ? el.post : "Unassigned",
                            name: el.name ? el.name : "Unassigned"
                        }
                    }),
                    posList: res.data.positions,
                    deptList: res.data.departments,
                    rowCount: parseInt(res.data.rowCount.count)
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const toggleUpdating = () => { setState(prevState => { return { ...prevState, isUpdating: !prevState.isUpdating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        if (type === 'checkbox') value = checked
        setState(prevState => { return { ...prevState, [name]: value } })
    }

    useEffect(() => {
        fetchEmployee(state.offset, state.limit, state.search, state.position, state.department, state.role, state.status, state.salaryFrom, state.salaryTo, state.hasOTpay)
    }, [fetchEmployee, state.limit, state.offset, state.search, state.position, state.department, state.role, state.status, state.salaryFrom, state.salaryTo, state.hasOTpay])

    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
                    checkboxSelection
                    disableColumnFilter
                    style={{ height: '75vh', width: "100%" }}
                    rows={state.employeeList}
                    columns={columns}
                    onSelectionModelChange={(row) => handleSelect(row)}
                    onPageSizeChange={(size) => changePageSize(size)}
                    onPageChange={(page) => changePage(page)}
                    pageSize={state.limit}
                    rowCount={state.rowCount}
                    rowsPerPageOptions={[25, 50, 100]}
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
                                        <TextField fullWidth variant="standard" select size="small" label="Position" name="position" value={state.position} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            {state.posList.map((el, i) =>
                                                <MenuItem value={el.id} key={i}>{el.post}</MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" label="Department" name="department" value={state.department} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            {state.deptList.map((el, i) =>
                                                <MenuItem value={el.id} key={i}>{el.name}</MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" label="Role" name="role" value={state.role} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            <MenuItem value="employee">Employee</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" label="Status" name="status" value={state.status} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            <MenuItem value="available">Available</MenuItem>
                                            <MenuItem value="unavailable">Unavailable</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" type="number" size="small" label="Salary range from" name="salaryFrom" value={state.salaryFrom} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" type="number" size="small" label="Salary range to" name="salaryTo" value={state.salaryTo} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField fullWidth variant="standard" select size="small" label="OT Compensation" name="hasOTpay" value={state.hasOTpay} onChange={handleChange}>
                                            <MenuItem value="any">Any</MenuItem>
                                            <MenuItem value="entitled">Entitled</MenuItem>
                                            <MenuItem value="unentitled">Unentitled</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            )
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default Employee