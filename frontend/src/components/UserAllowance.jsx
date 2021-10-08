import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

function UserAllowance() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        offset: 0,
        limit: 25,
        rowCount: 0,
        allowanceRecord: [],
        isFetching: true
    })

    const columns = [
        { field: 'id', headerName: "Allowance ID", flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
    ]

    const fetchAllowanceRecord = useCallback(async (offset, limit) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/allowance/entitlement/${auth.id}`, {
                params: {
                    offset: offset,
                    limit: limit
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    allowanceRecord: res.data.allowance_employee,
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
        fetchAllowanceRecord(state.offset, state.limit)
    }, [fetchAllowanceRecord, state.limit, state.offset])

    return (
        <DataGrid
            paginationMode="server"
            disableColumnFilter
            style={{ height: "70vh", width: "100%" }}
            rows={state.allowanceRecord}
            columns={columns}
            pageSize={state.limit}
            rowCount={state.rowCount}
            rowsPerPageOptions={[25, 50, 100]}
            onPageSizeChange={(size) => changePageSize(size)}
            onPageChange={(page) => changePage(page)}
        />
    )
}

export default UserAllowance