import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOvertimeRecord, updateOvertimeRecord, createOvertimeRecord, deleteOvertime, updateOvertime, toggleUpdating, toggleCreating, toggleDeleting, toggleFiltering, toggleBatchUpdating, toggleBatchDeleting, fetchNextOvertimeRecord, fetchPreviousOvertimeRecord, fetchOvertimeRecordByEntries, fetchOvertimeRecordByQuery, resetOvertimeQuery, handleSelect, updateBatchOvertimeRecord, toggleSelectAll, batchDeleteOvertime } from '../actions/overtime';
import { Table, Grid, Form, Button, Header } from 'semantic-ui-react'
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import Config from './Config';
import '../css/main.css'

function OvertimeHistory() {
    const dispatch = useDispatch()
    const overtime = useSelector(state => state.overtime)

    useEffect(() => {
        dispatch(fetchOvertimeRecord())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Header>Employee Overtime Management</Header>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="blue" disabled={overtime.selectedRecord.length < 2} onClick={() => dispatch(toggleBatchUpdating(overtime.isBatchUpdating))}>Batch Update</Button>
                        <Button size="tiny" color="red" disabled={overtime.selectedRecord.length < 2} onClick={() => dispatch(toggleBatchDeleting(overtime.isBatchDeleting))}>Batch Delete</Button>
                        <Button size="tiny" color="teal" onClick={() => dispatch(toggleFiltering(overtime.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(overtime.isCreating))}>Create record</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled compact selectable size="small">
                            <TableHeader
                                header={['ID', 'Employee ID', 'Firstname', 'Lastname', 'Time in', 'Time out', 'Date', 'Status', 'Actions']}
                                checkName={"selectAll"}
                                checkValue={overtime.isAllSelected}
                                checkFunc={(e) => dispatch(toggleSelectAll(e, overtime.overtimeRecord))}
                            />
                            <TableBody
                                data={overtime.overtimeRecord}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                checkedRows={overtime.selectedRecord}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                            />
                            <TableFooter
                                colSpan={11}
                                pageStart={overtime.currentPageStart}
                                pageEnd={overtime.currentPageEnd}
                                pageTotal={overtime.pageLength}
                                entriesName={"currentLimit"}
                                entriesNum={overtime.currentLimit}
                                entriesFunc={(e, result) => dispatch(fetchOvertimeRecordByEntries(result.value, overtime.currentPage, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
                                onNext={() => dispatch(fetchNextOvertimeRecord(overtime.currentPage, overtime.pageLength, overtime.currentLimit, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
                                onPrevious={() => dispatch(fetchPreviousOvertimeRecord(overtime.currentPage, overtime.currentLimit, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={overtime.isUpdating}
                configType={"Update Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryFunc={() => dispatch(updateOvertimeRecord(overtime.overtimeId, overtime.overtimeFrom, overtime.overtimeTo, overtime.overtimeStatus, overtime.currentPage, overtime.currentLimit, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
                configSecondaryColor={"green"}
            >
                <p><strong>Overtime Record id: </strong>{overtime.overtimeId}</p>
                <p><strong>Employee id: </strong>{overtime.overtimeEmployeeId}</p>
                <p><strong>Employee fullname:</strong> {overtime.overtimeEmployeeFirstname} {overtime.overtimeEmployeeLastname}</p>
                <p><strong>Date: </strong>{overtime.overtimeDate}</p>
                <p><strong>Status: </strong>{overtime.overtimeStatus}</p>
                <Form>
                    <Form.Field>
                        <label htmlFor="overtimeFrom">Check in</label>
                        <input id="overtimeFrom" name="overtimeFrom" type="time" step="1" value={overtime.overtimeFrom} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="overtimeTo">Check out</label>
                        <input id="overtimeTo" name="overtimeTo" type="time" step="1" value={overtime.overtimeTo} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="overtimeStatus">Status</label>
                        <select id="overtimeStatus" name="overtimeStatus" value={overtime.overtimeStatus} onChange={(e) => dispatch(updateOvertime(e))}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={overtime.isCreating}
                configType={"Create Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(overtime.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryFunc={() => dispatch(createOvertimeRecord(overtime.createEmployeeId, overtime.createStarting, overtime.createEnding, overtime.createDate, overtime.createIsApproved))}
                configSecondaryColor={"green"}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="starting">Check In Time</label>
                        <input type="time" step="1" id="starting" name="createStarting" value={overtime.createStarting} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="ending">Check Out Time</label>
                        <input type="time" step="1" id="ending" name="createEnding" value={overtime.createEnding} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="createDate" value={overtime.createDate} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createEmployeeId">Employee</label>
                        <select id="createEmployeeId" name="createEmployeeId" value={overtime.createEmployeeId} onChange={(e) => dispatch(updateOvertime(e))}>
                            <option value="" hidden>Employee</option>
                            {overtime.employeeList.map((el, i) =>
                                <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createIsApproved">Approve upon creation?</label>
                        <input type="checkbox" id="createIsApproved" name="createIsApproved" value={overtime.createIsApproved} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={overtime.isDeleting}
                configType={"Delete Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={() => dispatch(deleteOvertime(overtime.overtimeId, overtime.currentPage, overtime.currentLimit, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
                configSecondaryColor={"red"}
            >
                <p><strong>Are you sure to delete the following overtime record?</strong></p>
                <p><strong>Overtime Record ID:</strong> {overtime.overtimeId}</p>
                <p><strong>Employee ID:</strong> {overtime.overtimeEmployeeId}</p>
                <p><strong>Employee Firstname:</strong> {overtime.overtimeEmployeeFirstname}</p>
                <p><strong>Employee Lastname:</strong> {overtime.overtimeEmployeeLastname}</p>
                <p><strong>Overtime Check In Time:</strong> {overtime.overtimeFrom}</p>
                <p><strong>Overtime Check Out Time:</strong> {overtime.overtimeTo}</p>
                <p><strong>Overtime Status: </strong> {overtime.overtimeStatus}</p>
            </Config>
            <Config
                isConfigOpen={overtime.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(overtime.isFiltering))}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configTertiaryFunc={() => dispatch(fetchOvertimeRecordByQuery(overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo, overtime.queryEmployeeId))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetOvertimeQuery())}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="queryText">Keywords</label>
                        <input id="queryText" name="queryText" value={overtime.queryText} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="queryEmployeeId">Employee</label>
                        <select id="queryEmployeeId" name="queryEmployeeId" value={overtime.queryEmployeeId} onChange={(e) => dispatch(updateOvertime(e))}>
                            <option value="">Employee</option>
                            {overtime.employeeList.map((el, i) =>
                                <option key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="queryStatus">Status:</label>
                        <select id="queryStatus" name="queryStatus" value={overtime.queryStatus} onChange={(e) => dispatch(updateOvertime(e))}>
                            <option value="" hidden>Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </Form.Field>
                    <Grid>
                        <Grid.Row columns="2">
                            <Grid.Column width="8">
                                <Form.Field>
                                    <label htmlFor="queryDateFrom">Date from:</label>
                                    <input
                                        type="date"
                                        id="queryDateFrom"
                                        name="queryDateFrom"
                                        value={overtime.queryDateFrom}
                                        onChange={(e, result) => dispatch(updateOvertime(e, result))}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width="8">
                                <Form.Field>
                                    <label htmlFor="queryDateTo">Date to:</label>
                                    <input
                                        type="date"
                                        id="queryDateTo"
                                        name="queryDateTo"
                                        value={overtime.queryDateTo}
                                        onChange={(e, result) => dispatch(updateOvertime(e, result))}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column width="8">
                                <Form.Field>
                                    <label htmlFor="queryCheckinFrom">Check In From:</label>
                                    <input type="time" step="1" id="queryCheckinFrom" name="queryCheckinFrom" value={overtime.queryCheckinFrom} onChange={(e) => dispatch(updateOvertime(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width="8">
                                <Form.Field>
                                    <label htmlFor="queryCheckinTo">Check In To:</label>
                                    <input type="time" step="1" id="queryCheckinTo" name="queryCheckinTo" value={overtime.queryCheckinTo} onChange={(e) => dispatch(updateOvertime(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column width="8">
                                <Form.Field>
                                    <label htmlFor="queryCheckoutFrom">Check Out From:</label>
                                    <input type="time" step="1" id="queryCheckoutFrom" name="queryCheckoutFrom" value={overtime.queryCheckoutFrom} onChange={(e) => dispatch(updateOvertime(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width="8">
                                <Form.Field>
                                    <label htmlFor="queryCheckoutTo">Check Out To:</label>
                                    <input type="time" step="1" id="queryCheckoutTo" name="queryCheckoutTo" value={overtime.queryCheckoutTo} onChange={(e) => dispatch(updateOvertime(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={overtime.isBatchUpdating}
                configType={"Batch Update Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(overtime.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(updateBatchOvertimeRecord(overtime.selectedRecord, overtime.updateOvertimeTimein, overtime.updateOvertimeTimeout, overtime.updateOvertimeStatus, overtime.currentPage, overtime.currentLimit, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="updateOvertimeTimein">Check in time:</label>
                        <input type="time" step="1" id="updateOvertimeTimein" name="updateOvertimeTimein" value={overtime.updateOvertimeTimein} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateOvertimeTimeout">Check out time:</label>
                        <input type="time" step="1" id="updateOvertimeTimeout" name="updateOvertimeTimeout" value={overtime.updateOvertimeTimeout} onChange={(e) => dispatch(updateOvertime(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateOvertimeStatus">Status:</label>
                        <select id="updateOvertimeStatus" name="updateOvertimeStatus" value={overtime.updateOvertimeStatus} onChange={(e) => dispatch(updateOvertime(e))}>
                            <option value="" hidden>Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={overtime.isBatchDeleting}
                configType={"Batch Delete Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(overtime.isBatchDeleting))}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(batchDeleteOvertime(overtime.selectedRecord, overtime.currentPage, overtime.currentLimit, overtime.queryText, overtime.queryStatus, overtime.queryDateFrom, overtime.queryDateTo, overtime.queryCheckinFrom, overtime.queryCheckinTo, overtime.queryCheckoutFrom, overtime.queryCheckoutTo))}
            >
                <p><strong>Are you sure to batch delete the following records?</strong></p>
                {overtime.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID:</strong> {el}</p>
                )}
            </Config>
        </div>
    )
}

export default OvertimeHistory