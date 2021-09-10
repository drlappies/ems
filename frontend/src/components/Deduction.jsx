import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmDeductionUpdate, createDeduction, deleteDeduction, fetchDeduction, toggleDeleting, toggleCreating, updateDeduction, fetchNextDeductionPage, fetchPreviousDeductionPage, fetchDeductionByEntries, toggleUpdating, toggleFiltering, fetchDeductionByFilter, resetDeductionFilter, selectDeduction, selectAllDeduction, toggleBatchUpdating, toggleBatchDeleting, batchUpdateDeduction } from '../actions/deduction'
import { Grid, Table, Form, Button, Header } from 'semantic-ui-react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import Config from './Config'
import '../css/main.css'

function Deduction() {
    const dispatch = useDispatch()
    const deduction = useSelector(state => state.deduction)

    useEffect(() => {
        dispatch(fetchDeduction())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign="left">
                        <Header>Employee Payroll Deduction Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="blue" onClick={() => dispatch(toggleBatchUpdating(deduction.isBatchUpdating))} disabled={deduction.selectedRecord.length < 2}>Batch Update</Button>
                        <Button size="tiny" color="red" onClick={() => dispatch(toggleBatchDeleting(deduction.isBatchDeleting))} disabled={deduction.selectedRecord.length < 2}>Batch Delete</Button>
                        <Button size="tiny" color="teal" onClick={() => dispatch(toggleFiltering(deduction.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(deduction.isCreating))}>Create Deduction</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled size="small">
                            <TableHeader
                                header={['id', 'Employee id', 'Firstname', 'Lastname', 'Date', 'Reason', 'Deducted Amount', 'Actions']}
                                checkFunc={(e) => dispatch(selectAllDeduction(e, deduction.record))}
                            />
                            <TableBody
                                data={deduction.record}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                checkedRows={deduction.selectedRecord}
                                checkFunc={(e) => dispatch(selectDeduction(e))}
                            />
                            <TableFooter
                                colSpan={9}
                                pageStart={deduction.currentPageStart}
                                pageEnd={deduction.currentPageEnd}
                                pageTotal={deduction.pageLength}
                                onNext={() => dispatch(fetchNextDeductionPage(deduction.currentPage, deduction.currentLimit, deduction.pageLength, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
                                onPrevious={() => dispatch(fetchPreviousDeductionPage(deduction.currentPage, deduction.currentLimit, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
                                entriesNum={deduction.currentLimit}
                                entriesFunc={(e, result) => dispatch(fetchDeductionByEntries(deduction.currentPage, result.value, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={deduction.isUpdating}
                configType={"Update Deduction Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(confirmDeductionUpdate(deduction.deductionId, deduction.employeeId, deduction.reason, deduction.amount, deduction.date, deduction.currentPage, deduction.currentLimit, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
            >
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
            </Config>
            <Config
                isConfigOpen={deduction.isDeleting}
                configType={"Delete Deduction Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(deleteDeduction(deduction.deductionId, deduction.currentPage, deduction.currentLimit, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
            >
                <p><strong>Are you sure to delete the following deduction record?</strong></p>
                <p><strong>Deduction ID:</strong> {deduction.deductionId}</p>
                <p><strong>Employee:</strong> {deduction.firstname} {deduction.lastname}</p>
                <p><strong>Deduction Reason:</strong> {deduction.reason}</p>
                <p><strong>Deduction Amount:</strong> {deduction.amount}</p>
                <p><strong>Deduction Date:</strong> {deduction.date}</p>
            </Config>
            <Config
                isConfigOpen={deduction.isCreating}
                configType={"Create Deduction Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(deduction.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(createDeduction(deduction.createEmployeeId, deduction.createReason, deduction.createAmount, deduction.createDate, deduction.currentPage, deduction.currentLimit, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="createEmployeeId">Employee</label>
                        <select id="createEmployeeId" name="createEmployeeId" defaultValue={deduction.createEmployeeId} onChange={(e) => dispatch(updateDeduction(e))}>
                            {deduction.employeeRecord.map((el, i) =>
                                <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createReason">Deduction Reason</label>
                        <input id="createReason" name="createReason" value={deduction.createReason} onChange={(e) => dispatch(updateDeduction(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createAmount">Deduction Amount</label>
                        <input type="number" id="createAmount" name="createAmount" value={deduction.createAmount} onChange={(e) => dispatch(updateDeduction(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createDate">Date</label>
                        <input type="date" id="createDate" name="createDate" value={deduction.createDate} onChange={(e) => dispatch(updateDeduction(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={deduction.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(deduction.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetDeductionFilter())}
                configTertiaryAction={"Search"}
                configTertiaryFunc={() => dispatch(fetchDeductionByFilter(deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
                configTertiaryColor={"green"}
            >
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Keywords</label>
                                    <input id="queryText" name="queryText" value={deduction.queryText} onChange={(e) => dispatch(updateDeduction(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountFrom">Amount From</label>
                                    <input id="queryAmountFrom" name="queryAmountFrom" value={deduction.queryAmountFrom} onChange={(e) => dispatch(updateDeduction(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountTo">Amount To</label>
                                    <input id="queryAmountTo" name="queryAmountTo" value={deduction.queryAmountTo} onChange={(e) => dispatch(updateDeduction(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDateFrom">Date From</label>
                                    <input id="queryDateFrom" name="queryDateFrom" value={deduction.queryDateFrom} type="date" onChange={(e) => dispatch(updateDeduction(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDateTo">Date To</label>
                                    <input id="queryDateTo" name="queryDateTo" value={deduction.queryDateTo} type="date" onChange={(e) => dispatch(updateDeduction(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={deduction.isBatchUpdating}
                configType={"Batch Update Deduction"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(deduction.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(batchUpdateDeduction(deduction.selectedRecord, deduction.updateEmployeeId, deduction.updateDate, deduction.updateReason, deduction.updateAmount, deduction.currentPage, deduction.currentLimit, deduction.queryText, deduction.queryDateFrom, deduction.queryDateTo, deduction.queryAmountFrom, deduction.queryAmountTo))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="updateEmployeeId">Employee</label>
                        <select id="updateEmployeeId" name="updateEmployeeId" value={deduction.updateEmployeeId} onChange={(e) => dispatch(updateDeduction(e))}>
                            <option value="" hidden>Employee</option>
                            {deduction.employeeRecord.map((el, i) =>
                                <option value={el.id} key={i}>{el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateDate">Date</label>
                        <input type="date" id="updateDate" name="updateDate" value={deduction.updateDate} onChange={(e) => dispatch(updateDeduction(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateReason">Reason</label>
                        <textarea id="updateReason" name="updateReason" value={deduction.updateReason} onChange={(e) => dispatch(updateDeduction(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateAmount">Amount</label>
                        <input id="updateAmount" name="updateAmount" type="number" value={deduction.updateAmount} onChange={(e) => dispatch(updateDeduction(e))} />
                    </Form.Field>
                </Form>
            </Config>
        </div >
    )
}


export default Deduction