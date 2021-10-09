import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { popMessage } from '../actions/ui';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserReimbursement() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        reimbursementRecord: [],
        offset: 0,
        limit: 25,
        rowCount: 0,
        isFetching: true,
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'date', headerName: 'From', flex: 1 },
        { field: 'reason', headerName: 'To', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchReimbursementRecord = useCallback(async (offset, limit) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/reimbursement/user/${auth.id}`, {
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
                    reimbursementRecord: res.data.reimbursement.map(el => {
                        return {
                            ...el,
                            date: `${new Date(el.date).getDate()} ${months[new Date(el.date).getMonth()]} ${new Date(el.date).getFullYear()}`,
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
        fetchReimbursementRecord(state.offset, state.limit)
    }, [fetchReimbursementRecord, state.limit, state.offset])

    return (
        <DataGrid
            paginationMode="server"
            disableColumnFilter
            style={{ height: '70vh', width: '100%' }}
            rows={state.reimbursementRecord}
            columns={columns}
            pageSize={state.limit}
            rowCount={state.rowCount}
            rowsPerPageOptions={[25, 50, 100]}
            onPageSizeChange={(size) => changePageSize(size)}
            onPageChange={(page) => changePage(page)}
        />
    )
}

export default UserReimbursement