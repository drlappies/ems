import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReimbursement, fetchSpecificReimbursement, resetReimbursement, updateReimbursement, gotoNextReimbursementPage, gotoPreviousReimbursementPage, fetchReimbursementByQuery } from '../actions/reimbursement';
import { Grid, Table, Menu, Form, Button } from 'semantic-ui-react'
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import Config from './Config'

function ReimbursementManagement() {
    const dispatch = useDispatch()
    const reimbursement = useSelector(state => state.reimbursement)
    const [state, setState] = useState({
        isInspecting: false,
        isDeleting: false,
        text: "",
        from: "",
        to: "",
        status: ""
    })
    const header = ['id', 'Employee ID', 'Firstname', 'Lastname', 'Reason', 'Date', 'Amount', 'Status', 'Actions']

    useEffect(() => {
        dispatch(fetchReimbursement())
    }, [dispatch])

    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const toggleInspecting = (reimbursement) => {
        if (reimbursement) {
            dispatch(fetchSpecificReimbursement(reimbursement.id))
        } else {
            dispatch(resetReimbursement())
        }
        setState(prevState => {
            return {
                ...prevState,
                isInspecting: !prevState.isInspecting
            }
        })
    }

    const handleSearch = () => {
        dispatch(fetchReimbursementByQuery(state.text, state.from, state.to, state.status))
    }

    const handleApprove = () => {
        dispatch(updateReimbursement(reimbursement.id, "approved"))
        toggleInspecting()
    }

    const handleReject = () => {
        dispatch(updateReimbursement(reimbursement.id, "rejected"))
        toggleInspecting()
    }

    const gotoNextPage = () => {
        dispatch(gotoNextReimbursementPage(reimbursement.currentPage, reimbursement.pageLength))
    }

    const gotoPreviousPage = () => {
        dispatch(gotoPreviousReimbursementPage(reimbursement.currentPage))
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Menu>
                        <Menu.Item>
                            <Form>
                                <Form.Field>
                                    <input placeholder="Search" name="text" value={state.text} onChange={(e) => handleChange(e)} />
                                </Form.Field>
                            </Form>
                        </Menu.Item>
                        <Menu.Item>
                            From
                        </Menu.Item>
                        <Menu.Item>
                            <Form>
                                <Form.Field>
                                    <input type="date" placeholder="Date From" name="from" value={state.from} onChange={(e) => handleChange(e)} />
                                </Form.Field>
                            </Form>
                        </Menu.Item>
                        <Menu.Item>
                            To
                        </Menu.Item>
                        <Menu.Item>
                            <Form>
                                <Form.Field>
                                    <input type="date" placeholder="Date From" name="to" value={state.to} onChange={(e) => handleChange(e)} />
                                </Form.Field>
                            </Form>
                        </Menu.Item>
                        <Menu.Item>
                            <Form>
                                <Form.Field>
                                    <select name="status" value={state.status} onChange={(e) => handleChange(e)}>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </Form.Field>
                            </Form>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button onClick={() => handleSearch()}>Search</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table celled>
                        <TableHeader header={header} />
                        <TableBody
                            data={reimbursement.record}
                            primaryAction={"Inspect"}
                            primaryActionColor={"blue"}
                            primaryFunc={toggleInspecting}
                            secondaryAction={"Delete"}
                            secondaryActionColor={"red"}
                        />
                        <TableFooter
                            colSpan={9}
                            pageTotal={reimbursement.pageLength}
                            pageStart={reimbursement.currentPageStart}
                            pageEnd={reimbursement.currentPageEnd}
                            onNext={gotoNextPage}
                            onPrevious={gotoPreviousPage}
                        />
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Config
                isConfigOpen={state.isInspecting}
                configType={"Reimbursement details"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleInspecting}
                configSecondaryAction={"Approve"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleApprove}
                configTertiaryAction={"Reject"}
                configTertiaryColor={"red"}
                configTertiaryFunc={handleReject}
                configContent={
                    <React.Fragment>
                        <p><strong>Reimbursement ID:</strong> {reimbursement.id}</p>
                        <p><strong>Employee ID:</strong> {reimbursement.employeeId}</p>
                        <p><strong>Employee Firstname:</strong> {reimbursement.firstname}</p>
                        <p><strong>Employee Lastname:</strong> {reimbursement.lastname}</p>
                        <p><strong>Reason:</strong> {reimbursement.reason}</p>
                        <p><strong>Date:</strong> {new Date(reimbursement.date).getFullYear()}-{new Date(reimbursement.date).getMonth() + 1}-{new Date(reimbursement.date).getDate()}</p>
                        <p><strong>Amount:</strong> {reimbursement.amount}</p>
                        <p><strong>Current Status:</strong> {reimbursement.status}</p>
                    </React.Fragment>
                }
            />
        </Grid>
    )
}

export default ReimbursementManagement