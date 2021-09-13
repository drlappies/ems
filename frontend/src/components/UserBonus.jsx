import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Table, Menu, Icon } from 'semantic-ui-react'
import axios from 'axios'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserBonus() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        bonusRecord: [],
        currentOffset: 0,
        currentLimit: 0,
        pageStart: 0,
        pageEnd: 0,
        pageLength: 0,
    })

    const fetchBonusRecord = useCallback(async () => {
        try {
            const res = await axios.get('/bonus', {
                params: {
                    employee_id: auth.id
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
        fetchBonusRecord()
    }, [fetchBonusRecord])

    return (
        <Table celled compact size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan={3}>
                        <Menu floated='right' pagination size="tiny">
                            <Menu.Item>
                                {state.pageStart} - {state.pageEnd} of {state.pageLength}
                            </Menu.Item>
                            <Menu.Item as='a' icon >
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a' icon >
                                <Icon name='chevron right' />
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
                {state.bonusRecord.map((el, i) =>
                    <Table.Row key={i}>
                        <Table.Cell>{new Date(el.date).getDate()} {months[new Date(el.date).getMonth()]} {new Date(el.date).getFullYear()}</Table.Cell>
                        <Table.Cell>{el.reason}</Table.Cell>
                        <Table.Cell>{el.amount}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default UserBonus