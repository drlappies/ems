import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Table, Menu, Icon } from 'semantic-ui-react';
import axios from 'axios'

function UserDeduction() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        deductionRecord: [],
        currentOffset: 0,
        currentLimit: 10,
        pageStart: 0,
        pageEnd: 0,
        pageLength: 0,
    })

    const fetchDeductionRecord = useCallback(async () => {
        try {
            const res = await axios.get('/deduction', {
                params: {
                    employee_id: auth.id
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    deductionRecord: res.data.deduction,
                    currentOffset: res.data.currentPage,
                    currentLimit: res.data.currentLimit,
                    pageStart: res.data.currentPageStart,
                    pageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    const next = useCallback(async () => {
        try {
            if (state.currentOffset + state.currentLimit >= state.currentLimit) return;
            const res = await axios.get('/bonus', {
                params: {
                    employee_id: auth.id,
                    page: state.currentOffset + state.currentLimit,
                    limit: state.currentLimit
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    bonusRecord: res.data.bonus,
                    currentOffset: res.data.currentPage,
                    currentLimit: res.data.currentLimit,
                    pageStart: res.data.currentPageStart,
                    pageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentOffset])

    const prev = useCallback(async () => {
        try {
            if (state.currentOffset <= 0) return;
            const res = await axios.get('/bonus', {
                params: {
                    employee_id: auth.id,
                    page: state.currentOffset - state.currentLimit,
                    limit: state.currentLimit
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    bonusRecord: res.data.bonus,
                    currentOffset: res.data.currentPage,
                    currentLimit: res.data.currentLimit,
                    pageStart: res.data.currentPageStart,
                    pageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentOffset])

    useEffect(() => {
        fetchDeductionRecord()
    }, [fetchDeductionRecord])

    return (
        <Table compact celled size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan="3">
                        <Menu floated='right' pagination size="tiny">
                            <Menu.Item>
                                {state.pageStart} - {state.pageEnd} of {state.pageLength}
                            </Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' onClick={() => prev()} />
                            </Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' onClick={() => next()} />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Reason</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {state.deductionRecord.map((el, i) =>
                    <Table.Row key={i}>
                        <Table.Cell>{el.date}</Table.Cell>
                        <Table.Cell>{el.reason}</Table.Cell>
                        <Table.Cell>{el.amount}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default UserDeduction