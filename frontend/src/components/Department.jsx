import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { popMessage } from '../actions/ui'
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from './Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import axios from 'axios'

function Department() {
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
    const [state, setState] = useState({
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        departments: [],
        selectedRow: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        search: "",
        deptName: "",
        deptDesc: "",
        isLoading: true
    })

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Department Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 }
    ]

    const fetchDept = useCallback(async (offset, limit, search) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/department`, {
                params: {
                    offset: offset,
                    limit: limit,
                    search: search
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setRows(res.data.dept)
            setState(prevState => {
                return {
                    ...prevState,
                    rowCount: parseInt(res.data.rowCount.count),
                    isCreating: false,
                    isUpdating: false,
                    isDeleting: false,
                    deptName: "",
                    deptDesc: "",
                    isLoading: false
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch])

    const createDepartment = useCallback(async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/department`, {
                name: state.deptName,
                desc: state.deptDesc
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchDept(state.offset, state.limit, state.search)
        } catch (err) {

            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchDept, state.deptDesc, state.deptName, state.limit, state.offset, state.search])

    const deleteDepartment = useCallback(async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/department/${state.selectedRow.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchDept(state.offset, state.limit, state.search)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchDept, state.limit, state.offset, state.search, state.selectedRow])

    const updateDepartment = useCallback(async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/department`, {
                id: state.selectedRow,
                name: state.deptName,
                desc: state.deptDesc
            }, {
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            dispatch(popMessage(res.data.success, 'success'))
            return fetchDept(state.offset, state.limit, state.search)
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, fetchDept, state.deptDesc, state.deptName, state.limit, state.offset, state.search, state.selectedRow])

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
                        deptName: "",
                        deptDesc: ""
                    }
                })
            } else {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/department/${[state.selectedRow]}`, {
                    headers: {
                        'token': window.localStorage.getItem('jwt')
                    }
                })
                setState(prevState => {
                    return {
                        ...prevState,
                        isUpdating: true,
                        deptName: res.data.name,
                        deptDesc: res.data.desc
                    }
                })
            }

        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [dispatch, state.isUpdating, state.selectedRow])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit, isLoading: true } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset, isLoading: true } }) }
    const handleSelect = (row) => { setState(prevState => { return { ...prevState, selectedRow: row, } }) }
    const toggleCreating = () => { setState(prevState => { return { ...prevState, isCreating: !prevState.isCreating } }) }
    const toggleDeleting = () => { setState(prevState => { return { ...prevState, isDeleting: !prevState.isDeleting } }) }
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState(prevState => { return { ...prevState, [name]: value } })
    }

    useEffect(() => {
        fetchDept(state.offset, state.limit, state.search)
    }, [fetchDept, state.limit, state.offset, state.search])

    return (
        <Grid container>
            <Grid item xs={12}>
                <DataGrid
                    loading={state.loading}
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
                            <CardHeader title="Add Department" />
                            <CardContent>
                                <TextField fullWidth margin="normal" size="small" label="Department Name" name="deptName" value={state.deptName} onChange={handleChange} />
                                <TextField fullWidth margin="normal" size="small" label="Department Description" multiline rows={3} name="deptDesc" value={state.deptDesc} onChange={handleChange} />
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleCreating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={createDepartment}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isUpdating} onClose={toggleUpdating}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Update Department" />
                            <CardContent>
                                <TextField fullWidth margin="normal" size="small" label="Department Name" name="deptName" value={state.deptName} onChange={handleChange} />
                                <TextField fullWidth margin="normal" size="small" label="Department Description" multiline rows={3} name="deptDesc" value={state.deptDesc} onChange={handleChange} />
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleUpdating}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={updateDepartment}>Update</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
            <Modal open={state.isDeleting} onClose={toggleDeleting}>
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={5}>
                        <Card>
                            <CardHeader title="Delete Department" />
                            <CardContent>
                                Are you sure?
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={toggleDeleting}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={deleteDepartment}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </Grid >
    )
}

export default Department