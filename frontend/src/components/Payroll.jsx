import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPayroll, updatePayroll, generatePayroll, fetchNextPayrollPage, fetchPreviousPayrollPage, toggleCreating, toggleViewing, toggleDeleting, handleDelete, toggleBatchUpdating, handleSelect, handleBatchDelete, handleBatchUpdate, toggleBatchDeleting, handleEntriesChange, toggleFiltering, resetQuery, handleSearch, toggleUpdating, handleUpdate, handleSelectAll } from '../actions/payroll';
import { Grid, Button, Header, Table, Form } from 'semantic-ui-react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import Config from './Config'
import '../css/main.css'

function Payroll() {
    const dispatch = useDispatch()
    const payroll = useSelector(state => state.payroll)

    useEffect(() => {
        dispatch(fetchPayroll())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header>Employee Payroll Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="blue" disabled={payroll.selectedRecord.length < 2} onClick={() => dispatch(toggleBatchUpdating(payroll.isBatchUpdating))}>Batch Update</Button>
                        <Button size="tiny" color="red" disabled={payroll.selectedRecord.length < 2} onClick={() => dispatch(toggleBatchDeleting(payroll.isBatchDeleting))}>Batch Delete</Button>
                        <Button size="tiny" color="teal" onClick={() => dispatch(toggleFiltering(payroll.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(payroll.isCreating))}>Generate Payroll</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled size="small">
                            <TableHeader
                                header={['ID', 'Employee ID', 'Firstname', 'Lastname', 'Payroll Period From', 'To', 'Total Amount', 'Status', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, payroll.record))}
                            />
                            <TableBody
                                data={payroll.record}
                                primaryAction={"View"}
                                primaryActionColor={"olive"}
                                primaryFunc={(e) => dispatch(toggleViewing(e.target.value))}
                                secondaryAction={"Update"}
                                secondaryActionColor={"blue"}
                                secondaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                tertiaryAction={"Delete"}
                                tertiaryActionColor={"red"}
                                tertiaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                                checkedRows={payroll.selectedRecord}
                            />
                            <TableFooter
                                colSpan={10}
                                pageStart={payroll.currentPageStart}
                                pageEnd={payroll.currentPageEnd}
                                pageTotal={payroll.pageLength}
                                onNext={() => dispatch(fetchNextPayrollPage(payroll.currentLimit, payroll.currentPage, payroll.pageLength))}
                                onPrevious={() => dispatch(fetchPreviousPayrollPage(payroll.currentLimit, payroll.currentPage))}
                                entriesNum={payroll.currentLimit}
                                entriesFunc={(e, result) => dispatch(handleEntriesChange(result.value, payroll.currentPage))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={payroll.isViewing}
                configType={"Payroll Details"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleViewing())}
            >
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
            </Config>
            <Config
                isConfigOpen={payroll.isCreating}
                configType={"Generate Payroll Report"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(payroll.isCreating))}
                configSecondaryAction={"Generate Payroll"}
                configSecondaryFunc={() => dispatch(generatePayroll(payroll.employeeId, payroll.starting, payroll.ending, payroll.isOTcaled, payroll.isLeaveCaled, payroll.isDeductCaled, payroll.isBonusCaled, payroll.isAllowanceCaled, payroll.isReimbursementCaled))}
                configSecondaryColor={'green'}
            >
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
            </Config>
            <Config
                isConfigOpen={payroll.isDeleting}
                configType={"Delete Payroll Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={() => dispatch(handleDelete(payroll.payrollId))}
                configSecondaryColor={'red'}
            >
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
            </Config>
            <Config
                configType={"Generate Batch Payroll Report"}
                configPrimaryAction={"Cancel"}
            />
            <Config
                isConfigOpen={payroll.isBatchUpdating}
                configType={"Batch Update Payroll"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(payroll.isBatchUpdating))}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(handleBatchUpdate(payroll.selectedRecord, payroll.updateBatchPayrollStatus))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="updateBatchPayrollStatus">Status</label>
                        <select id="updateBatchPayrollStatus" name="updateBatchPayrollStatus" value={payroll.updateBatchPayrollStatus} onChange={(e) => dispatch(updatePayroll(e))}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={payroll.isBatchDeleting}
                configType={"Batch Delete Payroll"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(payroll.isBatchDeleting))}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(handleBatchDelete(payroll.selectedRecord))}
            >
                <p><strong>Are you sure to delete the following payroll records?</strong></p>
                {payroll.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID:</strong> {el}</p>
                )}
            </Config>
            <Config
                isConfigOpen={payroll.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(payroll.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetQuery(payroll.currentPage, payroll.currentLimit))}
                configTertiaryColor={"green"}
                configTertiaryAction={"Search"}
                configTertiaryFunc={() => dispatch(handleSearch(payroll.currentPage, payroll.currentLimit, payroll.queryFrom, payroll.queryTo, payroll.queryText, payroll.queryStatus, payroll.queryAmountFrom, payroll.queryAmountTo, payroll.queryEmployeeId, payroll.queryIsReimbursementCaled, payroll.queryIsAllowanceCaled, payroll.queryIsDeductionCaled, payroll.queryIsBonusCaled, payroll.queryIsOvertimeCaled, payroll.queryIsLeaveCaled))}
            >
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Keywords</label>
                                    <input id="queryText" name="queryText" value={payroll.queryText} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryEmployeeId">Employee</label>
                                    <select id="queryEmployeeId" name="queryEmployeeId" value={payroll.queryEmployeeId} onChange={(e) => dispatch(updatePayroll(e))}>
                                        <option value="" hidden>Employee</option>
                                        {payroll.employeeList.map((el, i) =>
                                            <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                                        )}
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryStatus">Status</label>
                                    <select id="queryStatus" name="queryStatus" value={payroll.queryStatus} onChange={(e) => dispatch(updatePayroll(e))}>
                                        <option value="" hidden>Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryFrom">Date from</label>
                                    <input id="queryFrom" name="queryFrom" type="date" value={payroll.queryFrom} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryTo">Date to</label>
                                    <input id="queryTo" name="queryTo" type="date" value={payroll.queryTo} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountFrom">Amount From </label>
                                    <input id="queryAmountFrom" name="queryAmountFrom" type="number" value={payroll.queryAmountFrom} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountTo">Amount To</label>
                                    <input id="queryAmountTo" name="queryAmountTo" type="number" value={payroll.queryAmountTo} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="3">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsReimbursementCaled">Is Reimbursement Calculated?</label>
                                    <input id="queryIsReimbursementCaled" name="queryIsReimbursementCaled" type="checkbox" value={payroll.queryIsReimbursementCaled} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsAllowanceCaled">Is Allowance Calculated?</label>
                                    <input id="queryIsAllowanceCaled" name="queryIsAllowanceCaled" type="checkbox" value={payroll.queryIsAllowanceCaled} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsDeductionCaled">Is Deduction Calculated?</label>
                                    <input id="queryIsDeductionCaled" name="queryIsDeductionCaled" type="checkbox" value={payroll.queryIsDeductionCaled} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="3">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsBonusCaled">Is Bonus Calculated?</label>
                                    <input id="queryIsBonusCaled" name="queryIsBonusCaled" type="checkbox" value={payroll.queryIsBonusCaled} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsOvertimeCaled">Is Overtime Calculated?</label>
                                    <input id="queryIsOvertimeCaled" name="queryIsOvertimeCaled" type="checkbox" value={payroll.queryIsOvertimeCaled} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsLeaveCaled">Is Leave Calculated?</label>
                                    <input id="queryIsLeaveCaled" name="queryIsLeaveCaled" type="checkbox" value={payroll.queryIsLeaveCaled} onChange={(e) => dispatch(updatePayroll(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={payroll.isUpdating}
                configType={"Update Payroll Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(handleUpdate(payroll.payrollId, payroll.status))}
            >
                <p><strong>Payroll ID:</strong> {payroll.payrollId}</p>
                <p><strong>Employee ID:</strong> {payroll.employeeId}</p>
                <p><strong>Employee Name:</strong> {payroll.firstname} {payroll.lastname}</p>
                <p><strong>Employee Firstname:</strong> {payroll.firstname}</p>
                <p><strong>Employee Lastname:</strong> {payroll.lastname}</p>
                <p><strong>Amount:</strong> {payroll.amount}</p>
                <p><strong>Date From:</strong> {new Date(payroll.from).getFullYear()} - {new Date(payroll.from).getMonth() + 1} - {new Date(payroll.from).getDate()}</p>
                <p><strong>Date To:</strong> {new Date(payroll.to).getFullYear()} - {new Date(payroll.to).getMonth() + 1} - {new Date(payroll.to).getDate()}</p>
                <p><strong>Reimbursement:</strong> {payroll.reimbursement}</p>
                <p><strong>Allowance:</strong> {payroll.allowance}</p>
                <p><strong>Deduction:</strong> {payroll.deduction}</p>
                <p><strong>Bonus:</strong> {payroll.bonus}</p>
                <p><strong>Overtime:</strong> {payroll.overtime}</p>
                <p><strong>Is Reimbursement Calculated?</strong> {payroll.isReimbursementCaled ? "Yes" : "No"} </p>
                <p><strong>Is Allowance Calculated?</strong> {payroll.isAllowanceCaled ? "Yes" : "No"}</p>
                <p><strong>Is Bonus Calculated?</strong> {payroll.isBonusCaled ? "Yes" : "No"}</p>
                <p><strong>Is Deduction Caculated?</strong> {payroll.isDeductCaled ? "Yes" : "No"}</p>
                <p><strong>Is Leave Calculated?</strong> {payroll.isLeaveCaled ? "Yes" : "No"}</p>
                <p><strong>Is Overtime Calculated?</strong> {payroll.isOTcaled ? "Yes" : "No"}</p>
                <Form>
                    <Form.Field>
                        <label htmlFor="status">Payroll Status:</label>
                        <select id="status" name="status" value={payroll.status} onChange={(e) => dispatch(updatePayroll(e))}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
        </div >
    )
}

export default Payroll