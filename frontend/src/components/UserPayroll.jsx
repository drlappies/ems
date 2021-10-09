import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserPayroll() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentPayrollRecord: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        isFetching: true,
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'from', headerName: 'From', flex: 1 },
        { field: 'to', headerName: 'To', flex: 1 },
        { field: 'payday', headerName: 'Payday', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchEmployeePayroll = useCallback(async (offset, limit) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/payroll/user/${auth.id}`, {
                params: {
                    offset: offset,
                    limit: limit
                },
                headers: {
                    'token': window.localStorage.getItem('jwt')
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentPayrollRecord: res.data.payroll.map(el => {
                        return {
                            ...el,
                            from: `${new Date(el.from).getDate()} ${months[new Date(el.from).getMonth()]}  ${new Date(el.from).getFullYear()}`,
                            to: `${new Date(el.to).getDate()} ${months[new Date(el.to).getMonth()]}  ${new Date(el.to).getFullYear()}`,
                            payday: `${new Date(el.payday).getDate()} ${months[new Date(el.payday).getMonth()]}  ${new Date(el.payday).getFullYear()}`
                        }
                    }),
                    rowCount: parseInt(res.data.rowCount.count),
                    isFetching: false,
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }

    useEffect(() => {
        fetchEmployeePayroll(state.offset, state.limit)
    }, [fetchEmployeePayroll, state.limit, state.offset])

    return (
        <DataGrid
            paginationMode="server"
            disableColumnFilter
            style={{ height: "70vh", width: "100%" }}
            rows={state.currentPayrollRecord}
            columns={columns}
            pageSize={state.limit}
            rowCount={state.rowCount}
            rowsPerPageOptions={[25, 50, 100]}
            onPageSizeChange={(size) => changePageSize(size)}
            onPageChange={(page) => changePage(page)}
        />
    )
}

export default UserPayroll