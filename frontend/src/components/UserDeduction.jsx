import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { popMessage } from '../actions/ui'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserDeduction() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        offset: 0,
        limit: 25,
        rowCount: 0,
        deductionRecord: [],
    })

    const columns = [
        { field: 'id', headerName: 'Deduction ID', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'reason', headerName: 'Reason', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 }
    ]

    const fetchDeductionRecord = useCallback(async (offset, limit) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/deduction/user/${auth.id}`, {
                params: {
                    offset: offset,
                    limit: limit
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    deductionRecord: res.data.deduction.map(el => {
                        return {
                            ...el,
                            date: `${new Date(el.date).getDate()} ${months[new Date(el.date).getMonth()]} ${new Date(el.date).getFullYear()}`
                        }
                    }),
                }
            })
        } catch (err) {
            dispatch(popMessage(err.respones.data.error, 'error'))
        }
    }, [auth.id, dispatch])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }

    useEffect(() => {
        fetchDeductionRecord(state.offset, state.limit)
    }, [fetchDeductionRecord, state.limit, state.offset])

    return (
        <DataGrid
            paginationMode="server"
            disableColumnFilter
            style={{ height: '70vh', width: '100%' }}
            rows={state.deductionRecord}
            columns={columns}
            pageSize={state.limit}
            rowCount={state.rowCount}
            rowsPerPageOptions={[25, 50, 100]}
            onPageSizeChange={(size) => changePageSize(size)}
            onPageChange={(page) => changePage(page)}
        />
    )
}

export default UserDeduction