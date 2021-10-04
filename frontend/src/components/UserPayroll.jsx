import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserPayroll() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentPayrollRecord: [],
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

    const fetchEmployeePayroll = useCallback(async () => {
        try {
            const res = await axios.get(`/api/payroll/user/${auth.id}`)
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
                    isFetching: false,
                }
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    useEffect(() => {
        fetchEmployeePayroll()
    }, [fetchEmployeePayroll])

    return (
        <div style={{ height: '60vh', width: '100%' }}>
            {state.isFetching ? null : <DataGrid rows={state.currentPayrollRecord} columns={columns} />}
        </div>
    )
}

export default UserPayroll