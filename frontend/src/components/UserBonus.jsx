import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { popMessage } from '../actions/ui'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserBonus() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        offset: 0,
        limit: 25,
        rowCount: 0,
        bonusRecord: [],
        isFetching: true,
    })

    const columns = [
        { field: 'id', headerName: 'Bonus ID', flex: 1 },
        { field: 'date', headerName: 'date', flex: 1 },
        { field: 'reason', headerName: 'Reason', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
    ]

    const fetchBonusRecord = useCallback(async (offset, limit) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/bonus/user/${auth.id}`, {
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
                    bonusRecord: res.data.bonus.map(el => {
                        return {
                            ...el,
                            date: `${new Date(el.date).getDate()} ${months[new Date(el.date).getMonth()]} ${new Date(el.date).getFullYear()}`
                        }
                    }),
                    isFetching: false,
                    rowCount: parseInt(res.data.rowCount.count)
                }
            })
        } catch (err) {
            dispatch(popMessage(err.response.error.data, 'error'))
        }
    }, [auth.id, dispatch])

    const changePageSize = (limit) => { setState(prevState => { return { ...prevState, limit: limit } }) }
    const changePage = (offset) => { setState(prevState => { return { ...prevState, offset: offset } }) }

    useEffect(() => {
        fetchBonusRecord(state.offset, state.limit)
    }, [fetchBonusRecord, state.limit, state.offset])

    return (
        <DataGrid
            paginationMode="server"
            disableColumnFilter
            style={{ height: '70vh', width: '100%' }}
            rows={state.bonusRecord}
            columns={columns}
            pageSize={state.limit}
            rowCount={state.rowCount}
            rowsPerPageOptions={[25, 50, 100]}
            onPageSizeChange={(size) => changePageSize(size)}
            onPageChange={(page) => changePage(page)}
        />
    )
}

export default UserBonus