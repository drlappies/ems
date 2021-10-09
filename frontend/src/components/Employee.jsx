import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import moment from 'moment';
import axios from 'axios'

function Employee() {
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
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
        hasOTpay: "any",
        createFirstname: "",
        createLastname: "",
        createAddress: "",
        createNum: "",
        createContactPerson: "",
        createContactNum: "",
        createOnboardDate: null,
        createSalary: "",
        createStartHour: null,
        createEndHour: null,
        createPos: "unassigned",
        createDept: "unassigned",
        createHasOTpay: "entitled",
        createOTpay: 0,
        createUsername: "",
        createPassword: "",
        createRole: "employee",
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
            const res = await axios.get(`${process.env.REACT_APP_API}/api/employee`, {
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
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setRows(res.data.employee.map(el => {
                return {
                    ...el,
                    onboard_date: `${new Date(el.onboard_date).getDate().toString().padStart(2, 0)}/${(new Date(el.onboard_date).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.onboard_date).getFullYear()}`,
                    post: el.post ? el.post : "Unassigned",
                    name: el.name ? el.name : "Unassigned"
                }
            }))
            setState(prevState => {
                return {
                    ...prevState,
                    posList: res.data.positions,
                    deptList: res.data.departments,
                    rowCount: parseInt(res.data.rowCount.count),
                    createFirstname: "",
                    createLastname: "",
                    createAddress: "",
                    createNum: "",
                    createContactPerson: "",
                    createContactNum: "",
                    createOnboardDate: null,
                    createSalary: "",
                    createStartHour: null,
                    createEndHour: null,
                    createPos: "unassigned",
                    createDept: "unassigned",
                    createHasOTpay: "entitled",
                    createOTpay: "",
                    createUsername: "",
                    createPassword: "",
                    createRole: "employee",
                    isCreating: false,
                    isUpdating: false,
                    isDeleting: false,
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createEmployee = useCallback(async () => {
        try {
            const body = {
                username: state.createUsername,
                password: state.createPassword,
                firstname: state.createFirstname,
                lastname: state.createLastname,
                address: state.createAddress,
                phone_number: state.createNum,
                emergency_contact_person: state.createContactPerson,
                emergency_contact_number: state.createContactNum,
                onboard_date: state.createOnboardDate ? state.createOnboardDate.format('YYYY-MM-DD') : null,
                salary_monthly: state.createSalary,
                start_hour: state.createStartHour ? state.createStartHour.format('HH:mm:ss') : null,
                end_hour: state.createEndHour ? state.createEndHour.format('HH:mm:ss') : null,
                post_id: state.createPos === 'unassigned' ? null : state.createPos,
                dept_id: state.createDept === 'unassigned' ? null : state.createDept,
                ot_pay_entitled: state.createHasOTpay === 'entitled' ? true : false,
                ot_hourly_salary: state.createHasOTpay === 'entitled' ? state.createOTpay : null,
                role: state.createRole
            }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/employee`, body)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchEmployee(state.offset, state.limit, state.search, state.position, state.department, state.role, state.status, state.salaryFrom, state.salaryTo, state.hasOTpay)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchEmployee, state.createAddress, state.createContactNum, state.createContactPerson, state.createDept, state.createEndHour, state.createFirstname, state.createHasOTpay, state.createLastname, state.createNum, state.createOTpay, state.createOnboardDate, state.createPassword, state.createPos, state.createRole, state.createSalary, state.createStartHour, state.createUsername, state.department, state.hasOTpay, state.limit, state.offset, state.position, state.role, state.salaryFrom, state.salaryTo, state.search, state.status])

    const updateEmployee = useCallback(async () => {
        try {
            if (state.selectedRow.length < 2) {
                const body = {
                    id: [state.selectedRow],
                    username: state.createUsername,
                    password: state.createPassword,
                    firstname: state.createFirstname,
                    lastname: state.createLastname,
                    address: state.createAddress,
                    phone_number: state.createNum,
                    emergency_contact_person: state.createContactPerson,
                    emergency_contact_number: state.createContactNum,
                    onboard_date: state.createOnboardDate ? state.createOnboardDate.format('YYYY-MM-DD') : null,
                    salary_monthly: state.createSalary,
                    start_hour: state.createStartHour ? state.createStartHour.format('HH:mm:ss') : null,
                    end_hour: state.createEndHour ? state.createEndHour.format('HH:mm:ss') : null,
                    post_id: state.createPos === 'unassigned' ? null : state.createPos,
                    dept_id: state.createDept === 'unassigned' ? null : state.createDept,
                    ot_pay_entitled: state.createHasOTpay === 'entitled' ? true : false,
                    ot_hourly_salary: state.createOTpay,
                    role: state.createRole
                }
                const res = await axios.put(`${process.env.REACT_APP_API}/api/employee`, body, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                dispatch(popMessage(res.data.success, 'success'))
            } else {
                const body = {
                    id: state.selectedRow,
                    onboard_date: state.createOnboardDate ? state.createOnboardDate.format('YYYY-MM-DD') : null,
                    start_hour: state.createStartHour ? state.createStartHour.format('HH:mm:ss') : null,
                    end_hour: state.createEndHour ? state.createEndHour.format('HH:mm:ss') : null,
                    post_id: state.createPos === 'unassigned' ? null : state.createPos,
                    dept_id: state.createDept === 'unassigned' ? null : state.createDept,
                    ot_pay_entitled: state.createHasOTpay === 'entitled' ? true : false,
                    ot_hourly_salary: state.createOTpay,
                }
                const res = await axios.put(`${process.env.REACT_APP_API}/api/employee`, body, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                dispatch(popMessage(res.data.success, 'success'))
            }

            return fetchEmployee(state.offset, state.limit, state.search, state.position, state.department, state.role, state.status, state.salaryFrom, state.salaryTo, state.hasOTpay)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchEmployee, state.createAddress, state.createContactNum, state.createContactPerson, state.createDept, state.createEndHour, state.createFirstname, state.createHasOTpay, state.createLastname, state.createNum, state.createOTpay, state.createOnboardDate, state.createPassword, state.createPos, state.createRole, state.createSalary, state.createStartHour, state.createUsername, state.department, state.hasOTpay, state.limit, state.offset, state.position, state.role, state.salaryFrom, state.salaryTo, state.search, state.selectedRow, state.status])

    const deleteEmployee = useCallback(async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/employee/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchEmployee(state.offset, state.limit, state.search, state.position, state.department, state.role, state.status, state.salaryFrom, state.salaryTo, state.hasOTpay)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchEmployee, state.department, state.hasOTpay, state.limit, state.offset, state.position, state.role, state.salaryFrom, state.salaryTo, state.search, state.selectedRow, state.status])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const toggleUpdating = async () => {
        if (state.isUpdating) {
            return setState(prevState => { return { ...prevState, isUpdating: false } })
        }
        if (state.selectedRow.length < 2) {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/employee/${[state.selectedRow]}`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    createFirstname: res.data.employee.firstname,
                    createLastname: res.data.employee.lastname,
                    createAddress: res.data.employee.address,
                    createNum: res.data.employee.phone_number,
                    createContactPerson: res.data.employee.emergency_contact_person,
                    createContactNum: res.data.employee.emergency_contact_number,
                    createOnboardDate: moment(res.data.employee.onboard_date),
                    createSalary: res.data.employee.salary_monthly,
                    createStartHour: moment(`2017-03-13 ${res.data.employee.start_hour}`),
                    createEndHour: moment(`2017-03-13 ${res.data.employee.end_hour}`),
                    createPos: res.data.employee.post_id,
                    createDept: res.data.employee.dept_id,
                    createHasOTpay: res.data.employee.ot_pay_entitled ? "entitled" : "unentitled",
                    createOTpay: res.data.employee.ot_hourly_salary,
                    createUsername: res.data.employee.username,
                    createRole: res.data.employee.role,
                    isUpdating: true
                }
            })
        } else {
            setState(prevState => { return { ...prevState, isUpdating: true } })
        }
    }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        if (type === 'checkbox') value = checked
        if (name === 'createSalary' || name === 'createOTpay') {
            if (value > 99999.99) {
                value = 99999.99
            } else if (value < 0) {
                value = 0
            }
        }
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
                    rows={rows}
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
            <Modal open={state.isCreating} onClose={toggleCreating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Add Employee" />
                            <CardContent style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField size="small" fullWidth label="Employee Firstname" value={state.createFirstname} name="createFirstname" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" fullWidth label="Employee Lastname" value={state.createLastname} name="createLastname" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField size="small" fullWidth multiline rows={3} label="Address" value={state.createAddress} name="createAddress" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField size="small" fullWidth label="Contact Number" value={state.createNum} name="createNum" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" fullWidth label="Emergency Contact Person" value={state.createContactPerson} name="createContactPerson" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" fullWidth label="Emergency Contact Number" value={state.createContactNum} name="createContactNum" onChange={handleChange} />
                                    </Grid>
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <Grid item xs={12}>
                                            <DesktopDatePicker
                                                label="Onboard Date"
                                                value={state.createOnboardDate}
                                                onChange={(newValue) => { setState(prevState => { return { ...prevState, createOnboardDate: newValue } }) }}
                                                renderInput={(params) => <TextField fullWidth size="small"{...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TimePicker
                                                ampm={false}
                                                openTo="hours"
                                                views={['hours', 'minutes', 'seconds']}
                                                inputFormat="HH:mm:ss"
                                                mask="__:__:__"
                                                label="Work From"
                                                value={state.createStartHour}
                                                onChange={(newValue) => { setState(prevState => { return { ...prevState, createStartHour: newValue } }) }}
                                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TimePicker
                                                ampm={false}
                                                openTo="hours"
                                                views={['hours', 'minutes', 'seconds']}
                                                inputFormat="HH:mm:ss"
                                                mask="__:__:__"
                                                label="Work To"
                                                value={state.createEndHour}
                                                onChange={(newValue) => { setState(prevState => { return { ...prevState, createEndHour: newValue } }) }}
                                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                            />
                                        </Grid>
                                    </LocalizationProvider>
                                    <Grid item xs={6}>
                                        <TextField size="small" select fullWidth value={state.createPos} name="createPos" label="Position" onChange={handleChange}>
                                            <MenuItem value="unassigned">Unassigned</MenuItem>
                                            {state.posList.map((el, i) =>
                                                <MenuItem key={i} value={el.id}>{el.post}</MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" select fullWidth value={state.createDept} name="createDept" label="Department" onChange={handleChange}>
                                            <MenuItem value="unassigned">Unassigned</MenuItem>
                                            {state.deptList.map((el, i) =>
                                                <MenuItem key={i} value={el.id}>{el.name}</MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField size="small" type="number" fullWidth label="Salary" value={state.createSalary} name="createSalary" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" select fullWidth value={state.createHasOTpay} name="createHasOTpay" label="OT Compensation" onChange={handleChange}>
                                            <MenuItem value="entitled">Entitled</MenuItem>
                                            <MenuItem value="unentitled">Unentitled</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" type="number" fullWidth value={state.createOTpay} name="createOTpay" label="OT Hourly Compensation" onChange={handleChange} disabled={state.createHasOTpay === 'unentitled'} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" fullWidth value={state.createUsername} name="createUsername" label="Username" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField size="small" type="password" fullWidth value={state.createPassword} name="createPassword" label="Password" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField size="small" select fullWidth value={state.createRole} name="createRole" label="Role" onChange={handleChange}>
                                            <MenuItem value="employee">Employee</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createEmployee}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Update Employee" />
                            <CardContent style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                                {state.selectedRow.length === 1 ?
                                    <React.Fragment>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField size="small" fullWidth label="Employee Firstname" value={state.createFirstname} name="createFirstname" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" fullWidth label="Employee Lastname" value={state.createLastname} name="createLastname" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField size="small" fullWidth multiline rows={3} label="Address" value={state.createAddress} name="createAddress" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField size="small" fullWidth label="Contact Number" value={state.createNum} name="createNum" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" fullWidth label="Emergency Contact Person" value={state.createContactPerson} name="createContactPerson" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" fullWidth label="Emergency Contact Number" value={state.createContactNum} name="createContactNum" onChange={handleChange} />
                                            </Grid>
                                            <LocalizationProvider dateAdapter={DateAdapter}>
                                                <Grid item xs={12}>
                                                    <DesktopDatePicker
                                                        label="Onboard Date"
                                                        value={state.createOnboardDate}
                                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createOnboardDate: newValue } }) }}
                                                        renderInput={(params) => <TextField fullWidth size="small"{...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TimePicker
                                                        ampm={false}
                                                        openTo="hours"
                                                        views={['hours', 'minutes', 'seconds']}
                                                        inputFormat="HH:mm:ss"
                                                        mask="__:__:__"
                                                        label="Work From"
                                                        value={state.createStartHour}
                                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createStartHour: newValue } }) }}
                                                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TimePicker
                                                        ampm={false}
                                                        openTo="hours"
                                                        views={['hours', 'minutes', 'seconds']}
                                                        inputFormat="HH:mm:ss"
                                                        mask="__:__:__"
                                                        label="Work To"
                                                        value={state.createEndHour}
                                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createEndHour: newValue } }) }}
                                                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                    />
                                                </Grid>
                                            </LocalizationProvider>
                                            <Grid item xs={6}>
                                                <TextField size="small" select fullWidth value={state.createPos} name="createPos" label="Position" onChange={handleChange}>
                                                    <MenuItem value="unassigned">Unassigned</MenuItem>
                                                    {state.posList.map((el, i) =>
                                                        <MenuItem key={i} value={el.id}>{el.post}</MenuItem>
                                                    )}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" select fullWidth value={state.createDept} name="createDept" label="Department" onChange={handleChange}>
                                                    <MenuItem value="unassigned">Unassigned</MenuItem>
                                                    {state.deptList.map((el, i) =>
                                                        <MenuItem key={i} value={el.id}>{el.name}</MenuItem>
                                                    )}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField size="small" type="number" fullWidth label="Salary" value={state.createSalary} name="createSalary" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" select fullWidth value={state.createHasOTpay} name="createHasOTpay" label="OT Compensation" onChange={handleChange}>
                                                    <MenuItem value="entitled">Entitled</MenuItem>
                                                    <MenuItem value="unentitled">Unentitled</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" type="number" fullWidth value={state.createOTpay} name="createOTpay" label="OT Hourly Compensation" onChange={handleChange} disabled={state.createHasOTpay === 'unentitled'} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" fullWidth value={state.createUsername} name="createUsername" label="Username" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" type="password" fullWidth value={state.createPassword} name="createPassword" label="New Password" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField size="small" select fullWidth value={state.createRole} name="createRole" label="Role" onChange={handleChange}>
                                                    <MenuItem value="employee">Employee</MenuItem>
                                                    <MenuItem value="admin">Admin</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Grid container spacing={2}>
                                            <LocalizationProvider dateAdapter={DateAdapter}>
                                                <Grid item xs={12}>
                                                    <DesktopDatePicker
                                                        label="Onboard Date"
                                                        value={state.createOnboardDate}
                                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createOnboardDate: newValue } }) }}
                                                        renderInput={(params) => <TextField fullWidth size="small"{...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TimePicker
                                                        ampm={false}
                                                        openTo="hours"
                                                        views={['hours', 'minutes', 'seconds']}
                                                        inputFormat="HH:mm:ss"
                                                        mask="__:__:__"
                                                        label="Work From"
                                                        value={state.createStartHour}
                                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createStartHour: newValue } }) }}
                                                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TimePicker
                                                        ampm={false}
                                                        openTo="hours"
                                                        views={['hours', 'minutes', 'seconds']}
                                                        inputFormat="HH:mm:ss"
                                                        mask="__:__:__"
                                                        label="Work To"
                                                        value={state.createEndHour}
                                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createEndHour: newValue } }) }}
                                                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                    />
                                                </Grid>
                                            </LocalizationProvider>
                                            <Grid item xs={6}>
                                                <TextField size="small" select fullWidth value={state.createPos} name="createPos" label="Position" onChange={handleChange}>
                                                    <MenuItem value="unassigned">Unassigned</MenuItem>
                                                    {state.posList.map((el, i) =>
                                                        <MenuItem key={i} value={el.id}>{el.post}</MenuItem>
                                                    )}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" select fullWidth value={state.createDept} name="createDept" label="Department" onChange={handleChange}>
                                                    <MenuItem value="unassigned">Unassigned</MenuItem>
                                                    {state.deptList.map((el, i) =>
                                                        <MenuItem key={i} value={el.id}>{el.name}</MenuItem>
                                                    )}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField size="small" type="number" fullWidth label="Salary" value={state.createSalary} name="createSalary" onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" select fullWidth value={state.createHasOTpay} name="createHasOTpay" label="OT Compensation" onChange={handleChange}>
                                                    <MenuItem value="entitled">Entitled</MenuItem>
                                                    <MenuItem value="unentitled">Unentitled</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField size="small" type="number" fullWidth value={state.createOTpay} name="createOTpay" label="OT Hourly Compensation" onChange={handleChange} disabled={state.createHasOTpay === 'unentitled'} />
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>}
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateEmployee}>Update</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Delete Employee" />
                            <CardContent>
                                Are you sure?
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteEmployee}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default Employee