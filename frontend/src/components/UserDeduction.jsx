import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserDeduction() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        deductionRecord: [],
    })

    const fetchDeductionRecord = useCallback(async () => {
        try {
            const res = await axios.get(`/api/deduction/user/${auth.id}`)
            console.log(res.data)
            setState(prevState => {
                return {
                    ...prevState,
                    deductionRecord: res.data.deduction,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    useEffect(() => {
        fetchDeductionRecord()
    }, [fetchDeductionRecord])

    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.deductionRecord.map((el, i) =>
                        <TableRow key={i}>
                            <TableCell>{el.id}</TableCell>
                            <TableCell>{el.date}</TableCell>
                            <TableCell>{el.reason}</TableCell>
                            <TableCell>{el.amount}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default UserDeduction