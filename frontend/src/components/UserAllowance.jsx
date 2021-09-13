import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Table, Menu, Icon } from 'semantic-ui-react'
import axios from 'axios'

function UserAllowance() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentAllowanceRecord: [],
        currentOffset: 0,
        currentLimit: 10,
        currentLength: 0,
        currentPageStart: 0,
        currentPageEnd: 0,
    })

    const fetchAllowanceRecord = useCallback(async () => {
        try {
            const res = await axios.get(`/allowance/entitlement/${auth.id}`, {
                params: {
                    offset: state.currentOffset,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentAllowanceRecord: res.data.allowance_employee,
                    currentLength: res.data.length,
                    currentLimit: res.data.limit,
                    currentOffset: res.data.offset,
                    currentPageStart: res.data.start,
                    currentPageEnd: res.data.end
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentOffset])

    const fetchNextAllowanceRecord = useCallback(async () => {
        try {
            if (state.currentOffset + state.currentLimit >= state.currentLimit) return;
            const res = await axios.get(`/allowance/entitlement/${auth.id}`, {
                params: {
                    offset: state.currentOffset + state.currentLimit,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentAllowanceRecord: res.data.allowance_employee,
                    currentLength: res.data.length,
                    currentLimit: res.data.limit,
                    currentOffset: res.data.offset,
                    currentPageStart: res.data.start,
                    currentPageEnd: res.data.end
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentOffset])

    const fetchPrevAllowanceRecord = useCallback(async () => {
        try {
            if (state.offset <= 0) return;
            const res = await axios.get(`/allowance/entitlement/${auth.id}`, {
                params: {
                    offset: state.currentOffset - state.currentLimit,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentAllowanceRecord: res.data.allowance_employee,
                    currentLength: res.data.length,
                    currentLimit: res.data.limit,
                    currentOffset: res.data.offset,
                    currentPageStart: res.data.start,
                    currentPageEnd: res.data.end
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentOffset, state.offset])

    useEffect(() => {
        fetchAllowanceRecord()
    }, [fetchAllowanceRecord])

    return (
        <div>
            <Table compact celled size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={6}>
                            <Menu floated='right' pagination size="tiny">
                                <Menu.Item>
                                    {state.currentPageStart} - {state.currentPageEnd} of {state.currentPageLength}
                                </Menu.Item>
                                <Menu.Item as='a' icon onClick={() => fetchPrevAllowanceRecord()}>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a' icon onClick={() => fetchNextAllowanceRecord()}>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Required Attendance Rate?</Table.HeaderCell>
                        <Table.HeaderCell>Minimum Attendance Rate</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {state.currentAllowanceRecord.map((el, i) =>
                        <Table.Row key={i}>
                            <Table.Cell>{el.name}</Table.Cell>
                            <Table.Cell>{el.description}</Table.Cell>
                            <Table.Cell>{el.amount}</Table.Cell>
                            <Table.Cell positive={el.minimum_attendance_required} negative={!el.minimum_attendance_required}>{el.minimum_attendance_required ? "Yes" : "No"}</Table.Cell>
                            <Table.Cell>{el.required_attendance_rate}</Table.Cell>
                            <Table.Cell positive={el.status === 'active'} negative={el.status === 'negative'}>{el.status}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

export default UserAllowance