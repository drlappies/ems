import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Table, Menu, Icon } from 'semantic-ui-react'
import axios from 'axios';
import '../css/main.css'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function UserPayroll() {
    const auth = useSelector(state => state.auth)
    const [state, setState] = useState({
        currentPayrollRecord: [],
        currentPageLength: 0,
        currentPage: 0,
        currentPageStart: 0,
        currentPageEnd: 0,
        currentLimit: 0,
        queryFrom: "",
        queryTo: "",
        queryAmountFrom: "",
        queryAmountTo: "",
        queryEmployeeId: "",
        queryStatus: "",
    })

    const fetchEmployeePayroll = useCallback(async () => {
        try {
            const res = await axios.get('/api/payroll', {
                params: {
                    employee_id: auth.id,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentPayrollRecord: res.data.payroll,
                    currentLimit: res.data.currentLimit,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentPageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id])

    const fetchNextEmployeePayroll = useCallback(async () => {
        try {
            if (state.currentPage + state.currentLimit > state.currentLimit) return;
            const res = await axios.get('/api/payroll', {
                params: {
                    employee_id: auth.id,
                    page: state.currentPage + state.currentLimit,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentPayrollRecord: res.data.payroll,
                    currentLimit: res.data.currentLimit,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentPageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentPage])

    const fetchPrevEmployeePayroll = useCallback(async () => {
        try {
            if (state.currentPage <= 0) return;
            const res = await axios.get('/api/payroll', {
                params: {
                    employee_id: auth.id,
                    page: state.currentPage - state.currentLimit,
                    limit: state.currentLimit,
                }
            })
            setState(prevState => {
                return {
                    ...prevState,
                    currentPayrollRecord: res.data.payroll,
                    currentLimit: res.data.currentLimit,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentPageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [auth.id, state.currentLimit, state.currentPage])

    useEffect(() => {
        fetchEmployeePayroll()
    }, [fetchEmployeePayroll])

    return (
        <Table compact size="small" celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan={4}>
                        <Menu floated='right' pagination size="tiny">
                            <Menu.Item>
                                {state.currentPageStart} - {state.currentPageEnd} of {state.currentPageLength}
                            </Menu.Item>
                            <Menu.Item as='a' icon onClick={() => fetchPrevEmployeePayroll()}>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a' icon onClick={() => fetchNextEmployeePayroll()}>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell sorted={'descending'}>Date From</Table.HeaderCell>
                    <Table.HeaderCell>Date To</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {state.currentPayrollRecord.map((el, i) =>
                    <Table.Row key={i}>
                        <Table.Cell>{`${new Date(el.from).getDate()} ${months[new Date(el.from).getMonth()]} ${new Date(el.from).getFullYear()}`}</Table.Cell>
                        <Table.Cell>{`${new Date(el.to).getDate()} ${months[new Date(el.to).getMonth()]} ${new Date(el.to).getFullYear()}`}</Table.Cell>
                        <Table.Cell>{el.amount}</Table.Cell>
                        <Table.Cell positive={el.status === 'confirmed'} warning={el.status === 'pending'}>{el.status}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default UserPayroll