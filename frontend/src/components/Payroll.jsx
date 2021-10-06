import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux'
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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import axios from 'axios'
import Payslip from './Payslip'

function Payroll() {
    const componentRef = useRef();
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const handlePrint = useReactToPrint({ content: () => componentRef.current, });
    const [state, setState] = useState({
        payrollHistory: [],
        employeeList: [],
        selectedRow: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        search: "",
        employee: "any",
        status: "any",
        date: [null, null],
        amountFrom: null,
        amountTo: null,
        isCreating: false,
        createEmployee: "",
        createDate: [null, null],
        createPayday: null,
        createIsDeductCaled: true,
        createIsBonusCaled: true,
        createIsAllowanceCaled: true,
        createIsOTcaled: true,
        createIsReimbursementCaled: true,
        createIsLeaveCaled: true,
        isUpdating: false,
        updateStatus: "",
        isDeleting: false,
        isPrinting: false,
        toBePrinted: []
    })

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'employee_id', headerName: 'Employee ID' },
        { field: 'firstname', headerName: 'Firstname' },
        { field: 'lastname', headerName: 'Lastname' },
        { field: 'from', headerName: 'From' },
        { field: 'to', headerName: 'To' },
        { field: 'payday', headerName: 'Payday' },
        { field: 'basic_salary', headerName: 'Gross' },
        { field: "mpf_deduction", headerName: "MPF" },
        { field: 'amount', headerName: 'Amount' },
        { field: 'status', headerName: 'Status' },
    ]

    const fetchPayroll = useCallback(async (offset, limit, search, employee, status, date, amountFrom, amountTo) => {
        try {
            const res = await axios.get('/api/payroll', {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search,
                    employee: employee === 'any' ? null : employee,
                    status: status === 'any' ? null : status,
                    dateFrom: date[0] ? date[0].format('YYYY-MM-DD') : null,
                    dateTo: date[1] ? date[1].format('YYYY-MM-DD') : null,
                    amountFrom: amountFrom,
                    amountTo: amountTo,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    payrollHistory: res.data.payroll.map(el => {
                        return {
                            ...el,
                            from: `${new Date(el.from).getDate().toString().padStart(2, 0)}/${(new Date(el.from).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.from).getFullYear()}`,
                            to: `${new Date(el.to).getDate().toString().padStart(2, 0)}/${(new Date(el.to).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.to).getFullYear()}`,
                            payday: `${new Date(el.payday).getDate().toString().padStart(2, 0)}/${(new Date(el.payday).getMonth() + 1).toString().padStart(2, 0)}/${new Date(el.payday).getFullYear()}`
                        }
                    }),
                    employeeList: res.data.employee,
                    rowCount: parseInt(res.data.rowCount.count),
                    isCreating: false,
                    createEmployee: "",
                    createDate: [null, null],
                    createPayday: null,
                    createIsDeductCaled: true,
                    createIsBonusCaled: true,
                    createIsAllowanceCaled: true,
                    createIsOTcaled: true,
                    createIsReimbursementCaled: true,
                    createIsLeaveCaled: true,
                    isUpdating: false,
                    updateStatus: "",
                    isDeleting: false,
                    isPrinting: false,
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createPayroll = useCallback(async () => {
        try {
            const body = {
                employee_id: state.createEmployee,
                starting_date: state.createDate[0] ? state.createDate[0].format('YYYY-MM-DD') : null,
                ending_date: state.createDate[1] ? state.createDate[1].format('YYYY-MM-DD') : null,
                payday: state.createPayday ? state.createPayday.format('YYYY-MM-DD') : null,
                isDeductCaled: state.createIsDeductCaled,
                isBonusCaled: state.createIsBonusCaled,
                isAllowanceCaled: state.createIsAllowanceCaled,
                isOTcaled: state.createIsOTcaled,
                isReimbursementCaled: state.createIsReimbursementCaled,
                isLeaveCaled: state.createIsLeaveCaled
            }
            const res = await axios.post('/api/payroll', body)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchPayroll(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchPayroll, state.amountFrom, state.amountTo, state.createDate, state.createEmployee, state.createIsAllowanceCaled, state.createIsBonusCaled, state.createIsDeductCaled, state.createIsLeaveCaled, state.createIsOTcaled, state.createIsReimbursementCaled, state.createPayday, state.date, state.employee, state.limit, state.offset, state.search, state.status])

    const updatePayroll = useCallback(async () => {
        try {
            const body = {
                id: state.selectedRow,
                status: state.updateStatus
            }
            const res = await axios.put('/api/payroll', body)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchPayroll(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchPayroll, state.amountFrom, state.amountTo, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status, state.updateStatus])

    const deletePayroll = useCallback(async () => {
        try {
            const res = await axios.delete(`/api/payroll/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popMessage(res.data.success, 'success'))
            return fetchPayroll(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchPayroll, state.amountFrom, state.amountTo, state.date, state.employee, state.limit, state.offset, state.search, state.selectedRow, state.status])

    const togglePrinting = useCallback(async () => {
        try {
            if (state.isPrinting) {
                return setState(prevState => { return { ...prevState, toBePrinted: [], isPrinting: false } })
            } else {
                state.selectedRow.forEach(async (el) => {
                    const res = await axios.get(`/api/payroll/${el}`)
                    setState(prevState => { return { ...prevState, toBePrinted: prevState.toBePrinted.concat(res.data), isPrinting: true } })
                })
            }
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, state.isPrinting, state.selectedRow])

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
        fetchPayroll(state.offset, state.limit, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo)
    }, [fetchPayroll, state.limit, state.offset, state.search, state.employee, state.status, state.date, state.amountFrom, state.amountTo])



    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
                    paginationMode="server"
                    checkboxSelection
                    disableColumnFilter
                    rows={state.payrollHistory}
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
                            actions: <Button
                                size="small"
                                startIcon={<LocalPrintshopOutlinedIcon />}
                                disabled={state.selectedRow.length < 1}
                                onClick={togglePrinting}
                            >
                                Print
                            </Button>,
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
                                            <MenuItem value="confirmed">Confirmed</MenuItem>
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
                            <CardHeader title="Generate Payroll" />
                            <CardContent>
                                <TextField fullWidth select margin="normal" size="small" label="Employee" name="createEmployee" value={state.createEmployee} onChange={handleChange}>
                                    {state.employeeList.map((el, i) =>
                                        <MenuItem key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</MenuItem>
                                    )}
                                </TextField>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DesktopDateRangePicker
                                        displayStaticWrapperAs="desktop"
                                        startText="From"
                                        endText="To"
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
                                    <DesktopDatePicker
                                        label="Payday"
                                        value={state.createPayday}
                                        onChange={(newValue) => { setState(prevState => { return { ...prevState, createPayday: newValue } }) }}
                                        renderInput={(params) => <TextField fullWidth margin="normal" size="small"{...params} />}
                                    />
                                </LocalizationProvider>
                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">Payroll Calculation</FormLabel>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox checked={state.createIsDeductCaled} onChange={handleChange} name="createIsDeductCaled" />}
                                            label="Deduction"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.createIsBonusCaled} onChange={handleChange} name="createIsBonusCaled" />}
                                            label="Bonus"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.createIsAllowanceCaled} onChange={handleChange} name="createIsAllowanceCaled" />}
                                            label="Allowance"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.createIsOTcaled} onChange={handleChange} name="createIsOTcaled" />}
                                            label="Overtime"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.createIsReimbursementCaled} onChange={handleChange} name="createIsReimbursementCaled" />}
                                            label="Reimbursement"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.createIsLeaveCaled} onChange={handleChange} name="createIsLeaveCaled" />}
                                            label="Leave"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createPayroll}>Create</Button>
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
                                <TextField fullWidth select margin="normal" size="small" label="Status" name="updateStatus" value={state.updateStatus} onChange={handleChange}>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="confirmed">Confirmed</MenuItem>
                                </TextField>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updatePayroll}>Update</Button>
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
                                <Button variant="contained" color="error" onClick={deletePayroll}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isPrinting} onClose={togglePrinting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Print Payslip" />
                            <CardContent style={{ maxHeight: '70vh', overflowY: "scroll" }}>
                                <div ref={componentRef}>
                                    {state.toBePrinted.map((el, i) =>
                                        <Payslip
                                            payrollId={el.id}
                                            employeeId={el.employee_id}
                                            employeeFirstname={el.firstname}
                                            employeeLastname={el.lastname}
                                            payrollFrom={el.from}
                                            payrollTo={el.to}
                                            payday={el.payday}
                                            basicAmount={el.basic_salary}
                                            totalAmount={el.amount}
                                            overtimeAmount={el.overtime}
                                            reimbursementAmount={el.reimbursement}
                                            allowanceAmount={el.allowance}
                                            mpf={el.mpf_deduction}
                                            bonusAmount={el.bonus}
                                            deductionAmount={el.deduction}
                                            approvalFirstname={auth.firstname}
                                            approvalLastname={auth.lastname}
                                            approvalId={auth.id}
                                        />
                                    )}
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={togglePrinting}>Cancel</Button>
                                <Button variant="contained" color="info" onClick={handlePrint}>Print</Button>
                            </CardActions>
                        </Card>

                    </Grid>
                </Grid>
            </Modal>
        </Grid >
    )
}

export default Payroll