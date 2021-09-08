import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReimbursement, updateReimbursement, gotoNextReimbursementPage, gotoPreviousReimbursementPage, fetchReimbursementByEntries, toggleCreating, handleChange, createReimbursement, toggleUpdating, toggleDeleting, deleteReimbursement, toggleFiltering, fetchReimbursementByQuery, resetReimbursementQuery, handleSelect, handleSelectAll, toggleBatchUpdating, batchUpdateReimbursement, toggleBatchDeleting, batchDeleteReimbursement } from '../actions/reimbursement';
import { Grid, Table, Header, Button, Form } from 'semantic-ui-react'
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import Config from './Config'
import '../css/main.css'

function ReimbursementManagement() {
    const dispatch = useDispatch()
    const reimbursement = useSelector(state => state.reimbursement)

    useEffect(() => {
        dispatch(fetchReimbursement())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign="left">
                        <Header>
                            Reimbursement Management
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Button color="blue" size="tiny" onClick={() => dispatch(toggleBatchUpdating(reimbursement.isBatchUpdating))} disabled={reimbursement.selectedRecord.length < 2}>Batch Update</Button>
                        <Button color="red" size="tiny" onClick={() => dispatch(toggleBatchDeleting(reimbursement.isBatchDeleting))} disabled={reimbursement.selectedRecord.length < 2}>Batch Delete</Button>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button primary size="tiny" onClick={() => dispatch(toggleFiltering(reimbursement.isFiltering))}>Filter</Button>
                        <Button secondary size="tiny" onClick={() => dispatch(toggleCreating(reimbursement.isCreating))}>Create Reimbursement Record</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled size="small">
                            <TableHeader
                                header={['id', 'Employee ID', 'Firstname', 'Lastname', 'Reason', 'Date', 'Amount', 'Status', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, reimbursement.record))}
                            />
                            <TableBody
                                data={reimbursement.record}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                checkedRows={reimbursement.selectedRecord}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                            />
                            <TableFooter
                                colSpan={10}
                                pageTotal={reimbursement.pageLength}
                                pageStart={reimbursement.currentPageStart}
                                pageEnd={reimbursement.currentPageEnd}
                                onNext={() => dispatch(gotoNextReimbursementPage(reimbursement.currentPage, reimbursement.currentLimit, reimbursement.pageLength, reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
                                onPrevious={() => dispatch(gotoPreviousReimbursementPage(reimbursement.currentPage, reimbursement.currentLimit, reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
                                entriesNum={reimbursement.currentLimit}
                                entriesFunc={(e, result) => dispatch(fetchReimbursementByEntries(reimbursement.currentPage, result.value, reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                <Config
                    isConfigOpen={reimbursement.isUpdating}
                    configType={"Reimbursement Application"}
                    configPrimaryAction={"Cancel"}
                    configPrimaryFunc={() => dispatch(toggleUpdating())}
                    configSecondaryAction={"Update"}
                    configSecondaryColor={"green"}
                    configSecondaryFunc={() => dispatch(updateReimbursement(reimbursement.id, reimbursement.reason, reimbursement.date, reimbursement.amount, reimbursement.status))}
                >
                    <Form>
                        <Grid>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="id">Reimbursement ID</label>
                                        <input id="id" name="id" value={reimbursement.id} disabled />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeId">Employee ID</label>
                                        <input id="employeeId" name="employeeId" value={reimbursement.employeeId} disabled />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="firstname">Employee Firstname</label>
                                        <input id="firstname" name="firstname" value={reimbursement.firstname} disabled />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="lastname">Employee Lastname</label>
                                        <input id="lastname" name="lastname" value={reimbursement.lastname} disabled />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="date">Reimbursement Date</label>
                                        <input id="date" name="date" value={reimbursement.date} type="date" onChange={(e) => dispatch(handleChange(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="amount">Reimbursement Amount</label>
                                        <input id="amount" name="amount" value={reimbursement.amount} type="number" onChange={(e) => dispatch(handleChange(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="reason">Reimbursement Reason</label>
                                        <textarea id="reason" name="reason" value={reimbursement.reason} onChange={(e) => dispatch(handleChange(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="status">Status</label>
                                        <select id="status" name="status" value={reimbursement.status} onChange={(e) => dispatch(handleChange(e))}>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Config>
            </Grid>
            <Config
                isConfigOpen={reimbursement.isCreating}
                configType={"Create Reimbursement Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(reimbursement.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(createReimbursement(reimbursement.createReimbursementEmployeeId, reimbursement.createReimbursementDate, reimbursement.createReimbursementAmount, reimbursement.createReimbursementReason, reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="createReimbursementEmployeeId">Employee</label>
                        <select id="createReimbursementEmployeeId" name="createReimbursementEmployeeId" value={reimbursement.createReimbursementEmployeeId} onChange={(e) => dispatch(handleChange(e))}>
                            <option value="">Employee</option>
                            {reimbursement.employeeList.map((el, i) =>
                                <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createReimbursementDate">Reimbursement Date</label>
                        <input type="date" id="createReimbursementDate" name="createReimbursementDate" value={reimbursement.createReimbursementDate} onChange={(e) => dispatch(handleChange(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createReimbursementAmount">Reimbursement Amount</label>
                        <input type="number" id="createReimbursementAmount" name="createReimbursementAmount" value={reimbursement.createReimbursementAmount} onChange={(e) => dispatch(handleChange(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createReimbursementReason">Reimbursement Reason</label>
                        <textarea id="createReimbursementReason" name="createReimbursementReason" value={reimbursement.createReimbursementReason} onChange={(e) => dispatch(handleChange(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={reimbursement.isDeleting}
                configType={"Delete Reimbursement"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={() => dispatch(deleteReimbursement(reimbursement.id, reimbursement.currentPage, reimbursement.currentLimit, reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
            >
                <p><strong>Are you sure to delete the following reimbursement record?</strong></p>
                <p><strong>Reimbursement ID: </strong>{reimbursement.id}</p>
                <p><strong>Applied By Employee: </strong>{reimbursement.firstname} {reimbursement.lastname}</p>
                <p><strong>Employee ID: </strong>{reimbursement.employeeId}</p>
                <p><strong>Reimbursement Date:</strong> {new Date(reimbursement.date).getFullYear()} - {new Date(reimbursement.date).getMonth() + 1} - {new Date(reimbursement.date).getDate()}</p>
                <p><strong>Reimbursement Reason:</strong> {reimbursement.reason}</p>
                <p><strong>Status: </strong>{reimbursement.status}</p>
            </Config>
            <Config
                isConfigOpen={reimbursement.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(reimbursement.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetReimbursementQuery())}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configTertiaryFunc={() => dispatch(fetchReimbursementByQuery(reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
            >
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Keywords</label>
                                    <input id="queryText" name="queryText" placeholder="Employee name, reason ..." value={reimbursement.queryText} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountFrom">Amount From</label>
                                    <input type="number" id="queryAmountFrom" name="queryAmountFrom" value={reimbursement.queryAmountFrom} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountTo">Amount To</label>
                                    <input type="number" id="queryAmountTo" name="queryAmountTo" value={reimbursement.queryAmountTo} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDateFrom">Date From</label>
                                    <input type="date" id="queryDateFrom" name="queryDateFrom" value={reimbursement.queryDateFrom} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDateTo">Date To</label>
                                    <input type="date" id="queryDateTo" name="queryDateTo" value={reimbursement.queryDateTo} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryStatus">Status</label>
                                    <select id="queryStatus" name="queryStatus" value={reimbursement.queryStatus} onChange={(e) => dispatch(handleChange(e))}>
                                        <option value="" hidden>Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={reimbursement.isBatchUpdating}
                configType={"Batch Update Reimbursement Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(reimbursement.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(batchUpdateReimbursement(reimbursement.selectedRecord, reimbursement.updateReimbursementAmount, reimbursement.updateReimbursementDate, reimbursement.updateReimbursementStatus, reimbursement.updateReimbursementReason))}
            >
                <Form>
                    <Grid>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="updateReimbursementAmount">Amount</label>
                                    <input id="updateReimbursementAmount" name="updateReimbursementAmount" value={reimbursement.updateReimbursementAmount} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="updateReimbursementDate">Date</label>
                                    <input type="date" id="updateReimbursementDate" name="updateReimbursementDate" value={reimbursement.updateReimbursementDate} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="updateReimbursementReason">Reason</label>
                                    <textarea id="updateReimbursementReason" name="updateReimbursementReason" value={reimbursement.updateReimbursementReason} onChange={(e) => dispatch(handleChange(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="1">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="updateReimbursementStatus">Status</label>
                                    <select id="updateReimbursementStatus" name="updateReimbursementStatus" value={reimbursement.updateReimbursementStatus} onChange={(e) => dispatch(handleChange(e))}>
                                        <option value="" hidden>Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={reimbursement.isBatchDeleting}
                configType={"Batch Delete Reimbursement Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(reimbursement.isBatchDeleting))}
                configSecondaryAction={"Batch Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(batchDeleteReimbursement(reimbursement.selectedRecord, reimbursement.currentPage, reimbursement.currentLimit, reimbursement.queryText, reimbursement.queryAmountFrom, reimbursement.queryAmountTo, reimbursement.queryDateFrom, reimbursement.queryDateTo, reimbursement.queryStatus))}
            >
                <p><strong>Are you sure to batch delete the following reimbursement records?</strong></p>
                {reimbursement.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID: </strong> {el}</p>
                )}
            </Config>
        </div >
    )
}

export default ReimbursementManagement