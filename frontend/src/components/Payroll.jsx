import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPayroll, updatePayroll, resetPayroll, fetchSpecificPayroll, generatePayroll, deletePayroll, fetchNextPayrollPage, fetchPreviousPayrollPage } from '../actions/payroll';
import { Grid, Button, Header, Table, Form, Menu, Label, Input } from 'semantic-ui-react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import Config from './Config'

function Payroll() {
    const dispatch = useDispatch()
    const payroll = useSelector(state => state.payroll)
    const [state, setState] = useState({
        isCreating: false,
        iCreatingBatch: false,
        isDeleting: false,
        isViewing: false
    })

    useEffect(() => {
        dispatch(fetchPayroll())
    }, [dispatch])

    const toggleCreating = () => {
        setState(prevState => {
            return {
                ...state,
                isCreating: !prevState.isCreating
            }
        })
        return dispatch(resetPayroll())
    }

    const toggleViewing = (payroll) => {
        if (payroll) {
            dispatch(fetchSpecificPayroll(payroll.id))
        } else {
            dispatch(resetPayroll())
        }
        return setState(prevState => {
            return {
                ...state,
                isViewing: !prevState.isViewing
            }
        })
    }

    const toggleDeleting = (payroll) => {
        if (payroll) {
            dispatch(fetchSpecificPayroll(payroll.id))
        } else {
            dispatch(resetPayroll())
        }
        return setState(prevState => {
            return {
                ...state,
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const toggleBatchCreating = () => {
        setState(prevState => {
            return {
                ...state,
                isCreatingBatch: !prevState.isCreatingBatch
            }
        })
        return dispatch(resetPayroll())
    }

    const handleCreate = () => {
        dispatch(generatePayroll(payroll.employeeId, payroll.starting, payroll.ending, payroll.isOTcaled, payroll.isLeaveCaled, payroll.isDeductCaled, payroll.isBonusCaled, payroll.isAllowanceCaled, payroll.isReimbursementCaled))
        return toggleCreating()
    }

    const handleDelete = () => {
        dispatch(deletePayroll(payroll.payrollId))
        return toggleDeleting()
    }

    const gotoNextPage = () => {
        return dispatch(fetchNextPayrollPage(payroll.currentPage, payroll.pageLength))
    }

    const gotoPreviousPage = () => {
        return dispatch(fetchPreviousPayrollPage(payroll.currentPage))
    }

    const handleSearch = () => {
        return dispatch(fetchPayroll(0, payroll.queryFrom, payroll.querytTo, payroll.queryText))
    }

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Menu>
                            <Menu.Item>
                                <Input labelPosition='right' type="date" name="queryFrom" value={payroll.queryFrom} onChange={(e) => dispatch(updatePayroll(e))}>
                                    <Label basic>Period From</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input labelPosition='right' type="date" name="queryTo" value={payroll.queryTo} onChange={(e) => dispatch(updatePayroll(e))}>
                                    <Label basic>To</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input labelPosition="right" type="text" name="queryText" value={payroll.queryText} onChange={(e) => dispatch(updatePayroll(e))} >
                                    <Label basic>Employee Name</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Button color="blue" onClick={() => handleSearch()}>Search</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Header>Payroll Management</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {/* <Button color="facebook" onClick={() => toggleBatchCreating()}>Batch Generate Payroll Report</Button> */}
                        <Button color="linkedin" onClick={() => toggleCreating()}>Generate Payroll Report</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled>
                            <TableHeader header={['id', 'Employee id', 'Firstname', 'Lastname', 'Payroll Period From', 'To', 'Total Amount', 'Status', 'Actions']} />
                            <TableBody
                                data={payroll.record}
                                primaryAction={"Details"}
                                primaryActionColor={"primary"}
                                primaryFunc={toggleViewing}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={toggleDeleting}
                            />
                            <TableFooter
                                colSpan={9}
                                pageStart={payroll.currentPageStart}
                                pageEnd={payroll.currentPageEnd}
                                pageTotal={payroll.pageLength}
                                onNext={gotoNextPage}
                                onPrevious={gotoPreviousPage}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={state.isViewing}
                configType={"Payroll Details"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleViewing}
                configContent={
                    <React.Fragment>
                        <p><strong>Payroll id:</strong> {payroll.payrollId}</p>
                        <p><strong>Employee id:</strong> {payroll.employeeId}</p>
                        <p><strong>Employee Firstname:</strong> {payroll.firstname}</p>
                        <p><strong>Employee Lastname:</strong> {payroll.lastname}</p>
                        <p><strong>Payoll Period:</strong> From {new Date(payroll.from).getFullYear()}-{new Date(payroll.from).getMonth() + 1}-{new Date(payroll.from).getDate()} to {new Date(payroll.to).getFullYear()}-{new Date(payroll.to).getMonth() + 1}-{new Date(payroll.to).getDate()}</p>
                        <p><strong>Payroll Amount:</strong> {payroll.amount}</p>
                        <p><strong>Overtime Pay:</strong> {payroll.overtime}</p>
                        <p><strong>Reimbursement:</strong> {payroll.reimbursement}</p>
                        <p><strong>Allowance:</strong> {payroll.allowance}</p>
                        <p><strong>Bonus:</strong> {payroll.bonus}</p>
                        <p><strong>Deduction:</strong> {payroll.deduction}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configType={"Generate Payroll Report"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configSecondaryAction={"Generate Payroll"}
                configSecondaryFunc={handleCreate}
                configSecondaryColor={'green'}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="employeeId">Employee</label>
                            <select id="employeeId" name="employeeId" onChange={(e) => dispatch(updatePayroll(e))}>
                                <option value="" selected hidden>Select Employee</option>
                                {payroll.employeeList.map((el, i) =>
                                    <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                                )}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="starting">Payroll Period From</label>
                            <input id="starting" name="starting" type="date" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="ending">To</label>
                            <input id="ending" name="ending" type="date" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="isOTcaled">Calculate Employee Overtime Pay?</label>
                            <input id="isOTcaled" name="isOTcaled" type="checkbox" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="isLeaveCaled">Calculate Employee Leave Deduction?</label>
                            <input id="isLeaveCaled" name="isLeaveCaled" type="checkbox" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="isDeductCaled">Calculate Employee Deduction?</label>
                            <input id="isDeductCaled" name="isDeductCaled" type="checkbox" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="isBonusCaled">Calculate Employee Bonus?</label>
                            <input id="isBonusCaled" name="isBonusCaled" type="checkbox" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="isAllowanceCaled">Calculate Employee Allowance?</label>
                            <input id="isAllowanceCaled" name="isAllowanceCaled" type="checkbox" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="isReimbursementCaled">Calculate Employee Reimbursement?</label>
                            <input id="isReimbursementCaled" name="isReimbursementCaled" type="checkbox" onChange={(e) => dispatch(updatePayroll(e))} />
                        </Form.Field>
                    </Form>
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Payroll Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={handleDelete}
                configSecondaryColor={'red'}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following payroll record?</strong></p>
                        <p><strong>Payroll id:</strong> {payroll.payrollId}</p>
                        <p><strong>Employee id:</strong> {payroll.employeeId}</p>
                        <p><strong>Employee Firstname:</strong> {payroll.firstname}</p>
                        <p><strong>Employee Lastname:</strong> {payroll.lastname}</p>
                        <p><strong>Payoll Period:</strong> From {new Date(payroll.from).getFullYear()}-{new Date(payroll.from).getMonth() + 1}-{new Date(payroll.from).getDate()} to {new Date(payroll.to).getFullYear()}-{new Date(payroll.to).getMonth() + 1}-{new Date(payroll.to).getDate()}</p>
                        <p><strong>Payroll Amount:</strong> {payroll.amount}</p>
                        <p><strong>Overtime Pay:</strong> {payroll.overtime}</p>
                        <p><strong>Reimbursement:</strong> {payroll.reimbursement}</p>
                        <p><strong>Allowance:</strong> {payroll.allowance}</p>
                        <p><strong>Bonus:</strong> {payroll.bonus}</p>
                        <p><strong>Deduction:</strong> {payroll.deduction}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreatingBatch}
                configType={"Generate Batch Payroll Report"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleBatchCreating}
            />
        </div>
    )
}

export default Payroll