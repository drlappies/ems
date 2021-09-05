import React, { useEffect } from 'react';
import { fetchLeave, updateLeave, confirmLeaveUpdate, deleteLeave, createLeave, toggleViewing, toggleUpdating, toggleDeleting, toggleCreating, handleSelect, handleSelectAll, toggleFiltering, resetQuery, fetchLeaveByQuery, toggleBatchUpdating, confirmBatchLeaveUpdate, toggleBatchDeleting, batchDeleteLeave, fetchNextLeaveRecord, fetchPreviousLeaveRecord, handleEntriesChange } from '../actions/leave';
import { useSelector, useDispatch } from 'react-redux';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader'
import Config from './Config'
import { Grid, Button, Header, Table, Form } from 'semantic-ui-react';
import '../css/main.css'

function LeaveManagement() {
    const dispatch = useDispatch()
    const leave = useSelector(state => state.leave)

    useEffect(() => {
        dispatch(fetchLeave())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Header>Employee Leave Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Button size="tiny" color="blue" disabled={!leave.selectedRecord.length} onClick={() => dispatch(toggleBatchUpdating(leave.isBatchUpdating))}>Batch Update</Button>
                        <Button size="tiny" color="red" disabled={!leave.selectedRecord.length} onClick={() => dispatch(toggleBatchDeleting(leave.isBatchDeleting))}>Batch Delete</Button>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button size="tiny" onClick={() => dispatch(toggleFiltering())}> Filter</Button>
                        <Button size="tiny" color="linkedin" onClick={() => dispatch(toggleCreating())}>Create Leave Record</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled size="small">
                            <TableHeader
                                header={['ID', 'Employee ID', 'Firstname', 'Lastname', 'Leave From', 'Leave To', 'Leave Type', 'Status', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, leave.record))}
                            />
                            <TableBody
                                data={leave.record}
                                primaryAction={"View"}
                                primaryActionColor={"blue"}
                                primaryFunc={(e) => dispatch(toggleViewing(e.target.value))}
                                secondaryAction={"Update"}
                                secondaryActionColor={"teal"}
                                secondaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                tertiaryAction={"Delete"}
                                tertiaryActionColor={"red"}
                                tertiaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                                checkedRows={leave.selectedRecord}
                            />
                            <TableFooter
                                colSpan={10}
                                pageStart={leave.currentPageStart}
                                pageEnd={leave.currentPageEnd}
                                pageTotal={leave.pageLength}
                                onNext={() => dispatch(fetchNextLeaveRecord(leave.currentPage, leave.pageLength, leave.currentLimit, leave.queryText, leave.queryFrom, leave.queryTo, leave.queryType, leave.queryStatus))}
                                onPrevious={() => dispatch(fetchPreviousLeaveRecord(leave.currentPage, leave.currentLimit, leave.queryText, leave.queryFrom, leave.queryTo, leave.queryType, leave.queryStatus))}
                                entriesName={"currentLimit"}
                                entriesNum={leave.currentLimit}
                                entriesFunc={(e, result) => dispatch(handleEntriesChange(leave.queryText, leave.queryFrom, leave.queryTo, leave.queryType, leave.queryStatus, leave.currentPage, result.value))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
            <Config
                isConfigOpen={leave.isViewing}
                configType={"Leave Details"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleViewing())}
            >
                <p><strong>ID:</strong> {leave.leaveId}</p>
                <p><strong>Employee ID:</strong> {leave.employeeId}</p>
                <p><strong>Employee Firstname:</strong> {leave.firstname}</p>
                <p><strong>Employee Lastname:</strong>  {leave.lastname}</p>
                <p><strong>Leave From: </strong> {leave.from}</p>
                <p><strong>Leave To:</strong> {leave.to}</p>
                <p><strong>Duration:</strong> {leave.duration}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p><strong>Status:</strong> {leave.status}</p>
            </Config>
            <Config
                isConfigOpen={leave.isUpdating}
                configType={"Update Leave"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(confirmLeaveUpdate(leave.leaveId, leave.duration, leave.type, leave.status))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="leaveId">Leave ID</label>
                        <input id="leaveId" name="leaveId" value={leave.leaveId} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="employeeId">Employee ID</label>
                        <input id="employeeId" name="employeeId" value={leave.employeeId} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="firstname">Firstname</label>
                        <input id="firstname" name="firstname" value={leave.firstname} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="lastname">Lastname</label>
                        <input id="lastname" name="lastname" value={leave.lastname} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="duration">Duration</label>
                        <select id="duration" name="duration" value={leave.duration} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="half_day">Half Day</option>
                            <option value="full_day">Full Day</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" value={leave.type} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="annual_leave">Annual Leave</option>
                            <option value="sick_leave">Sick Leave</option>
                            <option value="no_pay_leave">No Pay Leave</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" value={leave.status} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={leave.isDeleting}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configType={"Delete Leave Record"}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(deleteLeave(leave.leaveId))}
            >
                <p><strong>ID:</strong> {leave.leaveId}</p>
                <p><strong>Employee ID:</strong> {leave.employeeId}</p>
                <p><strong>Employee Firstname:</strong> {leave.firstname}</p>
                <p><strong>Employee Lastname:</strong>  {leave.lastname}</p>
                <p><strong>Leave From: </strong> {leave.from}</p>
                <p><strong>Leave To:</strong> {leave.to}</p>
                <p><strong>Duration:</strong> {leave.duration}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p><strong>Status:</strong> {leave.status}</p>
            </Config>
            <Config
                isConfigOpen={leave.isCreating}
                configType={"Create Leave Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating())}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(createLeave(leave.applyEmployee, leave.applyReason, leave.applyFrom, leave.applyTo, leave.applyType, leave.applySpan))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="applyEmployee">Employee</label>
                        <select id="applyEmployee" name="applyEmployee" value={leave.applyEmployee} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="">Employee</option>
                            {leave.employeeList.map((el, i) =>
                                <option key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyFrom">Leave From</label>
                        <input id="applyFrom" name="applyFrom" type="date" value={leave.applyFrom} onChange={(e) => dispatch(updateLeave(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyTo">To</label>
                        <input id="applyTo" name="applyTo" type="date" value={leave.applyTo} onChange={(e) => dispatch(updateLeave(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyReason">Reason</label>
                        <textarea id="applyReason" name="applyReason" value={leave.applyReason} onChange={(e) => dispatch(updateLeave(e))}></textarea>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyType">Leave Type</label>
                        <select id="applyType" name="applyType" value={leave.applyType} onChange={(e) => dispatch(updateLeave(e))} >
                            <option value="sick_leave">Sick Leave</option>
                            <option value="no_pay_leave">No Pay Leave</option>
                            <option value="annual_leave">Annual Leave</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applySpan">Span</label>
                        <select id="applySpan" name="applySpan" value={leave.applySpan} onChange={(e) => dispatch(updateLeave(e))} >
                            <option value="half_day">Half Day</option>
                            <option value="full_day">Full Day</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={leave.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering())}
                configSecondaryAction={"Reset"}
                configSecondaryFunc={() => dispatch(resetQuery(leave.currentPage, leave.currentLimit))}
                configSecondaryColor={"grey"}
                configTertiaryColor={"green"}
                configTertiaryAction={"Search"}
                configTertiaryFunc={() => dispatch(fetchLeaveByQuery(leave.queryText, leave.queryFrom, leave.queryTo, leave.queryType, leave.queryStatus))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="queryText">Contains:</label>
                        <input type="text" id="queryText" name="queryText" placeholder="ID, employee ID, leave reason..." value={leave.queryText} onChange={(e) => dispatch(updateLeave(e))} />
                    </Form.Field>
                    <Grid>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryFrom">Leave From:</label>
                                    <input type="date" id="queryFrom" name="queryFrom" value={leave.queryFrom} onChange={(e) => dispatch(updateLeave(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryTo">Leave To:</label>
                                    <input type="date" id="queryTo" name="queryTo" value={leave.queryTo} onChange={(e) => dispatch(updateLeave(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <label htmlFor="queryType">Leave Type:</label>
                                <select id="queryType" name="queryType" value={leave.queryType} onChange={(e) => dispatch(updateLeave(e))}>
                                    <option value="" hidden>Type</option>
                                    <option value="half_day">Half Day</option>
                                    <option value="full_day">Full Day</option>
                                </select>
                            </Grid.Column>
                            <Grid.Column>
                                <label htmlFor="queryStatus">Leave Status:</label>
                                <select id="queryStatus" name="queryStatus" value={leave.queryStatus} onChange={(e) => dispatch(updateLeave(e))}>
                                    <option value="" hidden>Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={leave.isBatchUpdating}
                configType={"Batch Update Leave Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(leave.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(confirmBatchLeaveUpdate(leave.selectedRecord, leave.batchUpdateDuration, leave.batchUpdateType, leave.batchUpdateStatus))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="batchUpdateDuration">Duration</label>
                        <select id="batchUpdateDuration" name="batchUpdateDuration" value={leave.batchUpdateDuration} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="" hidden>Duration</option>
                            <option value="half_day">Half Day</option>
                            <option value="full_day">Full Day</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="batchUpdateType">Type</label>
                        <select id="batchUpdateType" name="batchUpdateType" value={leave.batchUpdateType} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="" hidden>Type</option>
                            <option value="sick_leave">Sick Leave</option>
                            <option value="no_pay_leave">No Pay Leave</option>
                            <option value="annual_leave">Annual Leave</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="batchUpdateStatus">Status</label>
                        <select id="batchUpdateStatus" name="batchUpdateStatus" value={leave.batchUpdateStatus} onChange={(e) => dispatch(updateLeave(e))}>
                            <option value="" hidden>Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={leave.isBatchDeleting}
                configType={"Batch Delete Leave Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(leave.isBatchDeleting))}
                configSecondaryAction={"Delete"}
                configSecondaryColor={'red'}
                configSecondaryFunc={() => dispatch(batchDeleteLeave(leave.selectedRecord))}
            >
                <p><strong>Are you sure to batch delete leave record?</strong></p>
                {leave.selectedRecord.map(el =>
                    <p><strong>ID: </strong>{el}</p>
                )}
            </Config>
        </div>
    )
}

export default LeaveManagement