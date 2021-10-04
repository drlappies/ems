import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'

function UserAllowance() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        allowanceRecord: [],
        isFetching: true
    })

    const fetchAllowanceRecord = useCallback(async () => {
        try {
            const res = await axios.get(`/api/allowance/entitlement/${auth.id}`)
            console.log(res.data)
            setState(prevState => {
                return {
                    ...prevState,
                    allowanceRecord: res.data.allowance_employee,
                    isFetching: false,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    useEffect(() => {
        fetchAllowanceRecord()
    }, [fetchAllowanceRecord])

    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Is attendance required?</TableCell>
                        <TableCell>Minimum attendance requirement</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.allowanceRecord.map((el, i) =>
                        <TableRow key={i}>
                            <TableCell>{el.name}</TableCell>
                            <TableCell>{el.description}</TableCell>
                            <TableCell>{el.amount}</TableCell>
                            <TableCell>{el.minimum_attendance_required}</TableCell>
                            <TableCell>{el.required_attendance_rate}%</TableCell>
                            <TableCell>{el.status}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default UserAllowance