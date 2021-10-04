import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserBonus() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        bonusRecord: [],
        isFetching: true,
    })

    const fetchBonusRecord = useCallback(async () => {
        try {
            const res = await axios.get(`/api/bonus/user/${auth.id}`)
            setState(prevState => {
                return {
                    ...prevState,
                    bonusRecord: res.data.bonus.map(el => {
                        return {
                            ...el,
                            date: `${new Date(el.date).getDate()} ${months[new Date(el.date).getMonth()]} ${new Date(el.date).getFullYear()}`
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
        fetchBonusRecord()
    }, [fetchBonusRecord])

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
                    {state.bonusRecord.map((el, i) =>
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

export default UserBonus