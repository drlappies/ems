import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserReimbursement() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        reimbursementRecord: [],
        isFetching: true,
    })

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'date', headerName: 'From', flex: 1 },
        { field: 'reason', headerName: 'To', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ]

    const fetchReimbursementRecord = useCallback(async () => {
        try {
            const res = await axios.get(`/api/reimbursement/user/${auth.id}`)
            setState(prevState => {
                return {
                    ...prevState,
                    reimbursementRecord: res.data.reimbursement.map(el => {
                        return {
                            ...el,
                            date: `${new Date(el.date).getDate()} ${months[new Date(el.date).getMonth()]} ${new Date(el.date).getFullYear()}`,
                        }
                    }),
                    isFetching: false,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    useEffect(() => {
        fetchReimbursementRecord()
    }, [fetchReimbursementRecord])

    return (
        <div style={{ height: '60vh', width: '100%' }}>
            {state.isFetching ? null : <DataGrid rows={state.reimbursementRecord} columns={columns} />}
        </div>
    )
}

export default UserReimbursement