import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { Table, Menu, Icon } from 'semantic-ui-react'
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserReimbursement() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentReimbursementRecord: [],
        currentPage: 0,
        currentPageStart: 0,
        currentPageEnd: 0,
        currentLimit: 0,
        currentPageLength: 0,
    })

    const fetchReimbursementRecord = useCallback(async () => {
        try {
            const res = await axios.get('/api/reimbursement', {
                params: {
                    employee_id: auth.id
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentReimbursementRecord: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit,
                    currentPageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    const fetchNextReimbursementRecord = useCallback(async () => {
        try {
            if (state.currentPage + state.currentLimit >= state.currentLimit) return;
            const res = await axios.get('/api/reimbursement', {
                params: {
                    employee_id: auth.id,
                    page: state.currentPage + state.currentLimit,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentReimbursementRecord: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit,
                    currentPageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentPage])

    const fetchPrevReimbursementRecord = useCallback(async () => {
        try {
            if (state.currentPage <= 0) return;
            const res = await axios.get('/api/reimbursement', {
                params: {
                    employee_id: auth.id,
                    page: state.currentPage - state.currentLimit,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentReimbursementRecord: res.data.currentReimbursementRecord,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit,
                    currentPageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentPage])

    useEffect(() => {
        fetchReimbursementRecord()
    }, [fetchReimbursementRecord])

    return (
        <div>
            <Table compact celled size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={4}>
                            <Menu floated='right' pagination size="tiny">
                                <Menu.Item>
                                    {state.currentPageStart} - {state.currentPageEnd} of {state.currentPageLength}
                                </Menu.Item>
                                <Menu.Item as='a' icon onClick={() => fetchPrevReimbursementRecord()}>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a' icon onClick={() => fetchNextReimbursementRecord()}>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Applied on</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Reason</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {state.currentReimbursementRecord.map((el, i) =>
                        <Table.Row key={i}>
                            <Table.Cell>{new Date(el.date).getDate()} {months[new Date(el.date).getMonth()]} {new Date(el.date).getFullYear()}</Table.Cell>
                            <Table.Cell>{el.amount}</Table.Cell>
                            <Table.Cell>{el.reason}</Table.Cell>
                            <Table.Cell positive={el.status === 'approved'} warning={el.status === 'pending'} negative={el.status === 'rejected'}>{el.status}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

export default UserReimbursement