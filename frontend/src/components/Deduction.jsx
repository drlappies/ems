import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmDeductionUpdate, createDeduction, deleteDeduction, fetchDeduction, fetchSpecificDeduction, resetDeduction, updateDeduction, fetchNextDeductionPage, fetchPreviousDeductionPage } from '../actions/deduction'
import { Grid, Table, Form, Button, Menu, Input, Label, Header } from 'semantic-ui-react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import Config from './Config'

function Deduction() {
    const dispatch = useDispatch()
    const deduction = useSelector(state => state.deduction)
    const [state, setState] = useState({
        isUpdating: false,
        isDeleting: false,
        isCreating: false
    })

    useEffect(() => {
        dispatch(fetchDeduction())
    }, [dispatch])

    const toggleUpdating = (deduction) => {
        if (deduction) {
            dispatch(fetchSpecificDeduction(deduction.id))
        } else {
            dispatch(resetDeduction())
        }
        setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    const toggleCreating = () => {
        setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
        return dispatch(resetDeduction())
    }

    const toggleDeleting = (deduction) => {
        if (deduction) {
            dispatch(fetchSpecificDeduction(deduction.id))
        } else {
            dispatch(resetDeduction())
        }
        setState(prevState => {
            return {
                ...prevState,
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const handleUpdate = () => {
        dispatch(confirmDeductionUpdate(deduction.deductionId, deduction.employeeId, deduction.reason, deduction.amount, deduction.date))
        return toggleUpdating()
    }

    const handleDelete = () => {
        dispatch(deleteDeduction(deduction.deductionId))
        return toggleDeleting()
    }

    const handleCreate = () => {
        dispatch(createDeduction(deduction.employeeId, deduction.reason, deduction.amount, deduction.date))
        return toggleCreating()
    }

    const handleSearch = () => {
        return dispatch(fetchDeduction(0, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo, deduction.queryText))
    }

    const gotoNextPage = () => {
        return dispatch(fetchNextDeductionPage(deduction.currentPage, deduction.pageLength))
    }

    const gotoPreviousPage = () => {
        return dispatch(fetchPreviousDeductionPage(deduction.currentPage))
    }

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Menu>
                            <Menu.Item>
                                <Input labelPosition='right' type="date" name="queryDateFrom" value={deduction.queryDateFrom} onChange={(e) => dispatch(updateDeduction(e))}>
                                    <Label basic>From</Label>
                                    <input />
                                </Input>
                                <Input labelPosition='right' type="date" name="queryDateTo" value={deduction.queryDateTo} onChange={(e) => dispatch(updateDeduction(e))}>
                                    <Label basic>To</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input labelPosition='right' type="number" name="queryAmountFrom" value={deduction.queryAmountFrom} onChange={(e) => dispatch(updateDeduction(e))}>
                                    <Label basic>Amount From</Label>
                                    <input />
                                </Input>
                                <Input labelPosition='right' type="number" name="queryAmountTo" value={deduction.queryAmountTo} onChange={(e) => dispatch(updateDeduction(e))}>
                                    <Label basic>To</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input icon="search" placeholder="Search" name="queryText" value={deduction.queryText} onChange={(e) => dispatch(updateDeduction(e))} />
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Button onClick={() => handleSearch()}>Search</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Header>Employee Payroll Deduction Management</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button color="blue" onClick={() => toggleCreating()}>Create Deduction</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled>
                            <TableHeader header={['id', 'Employee id', 'Firstname', 'Lastname', 'Date', 'Reason', 'Deducted Amount', 'Actions']} />
                            <TableBody
                                data={deduction.record}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={toggleUpdating}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={toggleDeleting}
                            />
                            <TableFooter
                                colSpan={8}
                                pageStart={deduction.currentPageStart}
                                pageEnd={deduction.currentPageEnd}
                                pageTotal={deduction.pageLength}
                                onNext={gotoNextPage}
                                onPrevious={gotoPreviousPage}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={state.isUpdating}
                configType={"Update Deduction Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdating}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleUpdate}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="deductionId">Deduction ID</label>
                            <input id="deductionId" name="deductionId" value={deduction.deductionId} disabled />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="employeeId">Employee</label>
                            <select id="employeeId" name="employeeId" defaultValue={deduction.employeeId} onChange={(e) => dispatch(updateDeduction(e))}>
                                {deduction.employeeRecord.map((el, i) =>
                                    <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                                )}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="reason">Deduction Reason</label>
                            <input id="reason" name="reason" value={deduction.reason} onChange={(e) => dispatch(updateDeduction(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="amount">Deduction Amount</label>
                            <input type="number" id="amount" name="amount" value={deduction.amount} onChange={(e) => dispatch(updateDeduction(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" value={deduction.date} onChange={(e) => dispatch(updateDeduction(e))} />
                        </Form.Field>
                    </Form>
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Deduction Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={handleDelete}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following deduction record?</strong></p>
                        <p><strong>Deduction ID:</strong> {deduction.deductionId}</p>
                        <p><strong>Employee:</strong> {deduction.firstname} {deduction.lastname}</p>
                        <p><strong>Deduction Reason:</strong> {deduction.reason}</p>
                        <p><strong>Deduction Amount:</strong> {deduction.amount}</p>
                        <p><strong>Deduction Date:</strong> {deduction.date}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configType={"Create Deduction Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleCreate}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="employeeId">Employee</label>
                            <select id="employeeId" name="employeeId" defaultValue={deduction.employeeId} onChange={(e) => dispatch(updateDeduction(e))}>
                                {deduction.employeeRecord.map((el, i) =>
                                    <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                                )}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="reason">Deduction Reason</label>
                            <input id="reason" name="reason" value={deduction.reason} onChange={(e) => dispatch(updateDeduction(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="amount">Deduction Amount</label>
                            <input type="number" id="amount" name="amount" value={deduction.amount} onChange={(e) => dispatch(updateDeduction(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" value={deduction.date} onChange={(e) => dispatch(updateDeduction(e))} />
                        </Form.Field>
                    </Form>
                }
            />
        </div >
    )
}

export default Deduction