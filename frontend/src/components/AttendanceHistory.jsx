import React, { useEffect } from 'react';
import { fetchAttendance, fetchNext, fetchPrevious, deleteAttendance, updateAttendance, createAttendance, handleUpdateAttendance, resetQuery, toggleUpdating, toggleCreating, toggleFiltering, toggleBatchUpdating, toggleBatchDeleting, toggleDeleting, updateRow, fetchAttendanceByQuery, toggleSelect, toggleSelectAll, updateBatchAttendance } from '../actions/attendance';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Grid, Form, Button, Header } from 'semantic-ui-react'
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableBody from './TableBody';
import Config from './Config';
import '../css/main.css'

function AttendanceHistory() {
    const dispatch = useDispatch()
    const attendance = useSelector(state => state.attendance)

    useEffect(() => {
        dispatch(fetchAttendance())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header>Employee Attendance Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Button size="mini" color="blue" disabled={!attendance.selectedRecord.length} onClick={() => dispatch(toggleBatchUpdating(attendance.isBatchUpdating))}>Batch Update</Button>
                        <Button size="mini" color="red" disabled={!attendance.selectedRecord.length} onClick={() => dispatch(toggleBatchDeleting(attendance.isBatchDeleting))}>Batch Delete</Button>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button size="mini" primary onClick={() => dispatch(toggleFiltering(attendance.isFiltering))} color="grey">Filter</Button>
                        <Button size="mini" secondary onClick={() => dispatch(toggleCreating())}>Create record</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Table celled size="small">
                        <TableHeader
                            header={['ID', 'Employee ID', 'Firstname', 'Lastname', 'Date', 'Time in', 'Time out', 'Status', 'Actions']}
                            checkName={"isAllSelected"}
                            checkValue={attendance.isAllSelected}
                            checkFunc={(e) => dispatch(toggleSelectAll(e, attendance.record))}
                        />
                        <TableBody
                            data={attendance.record}
                            primaryAction={"Update"}
                            primaryActionColor={"blue"}
                            primaryFunc={toggleUpdating}
                            secondaryAction={"Delete"}
                            secondaryActionColor={"red"}
                            secondaryFunc={toggleDeleting}
                            checkFunc={(e) => dispatch(toggleSelect(e))}
                            checkedRows={attendance.selectedRecord}
                        />
                        <TableFooter
                            colSpan={10}
                            onPrevious={() => dispatch(fetchPrevious(attendance.currentPage, attendance.currentLimit, attendance.queryText, attendance.queryStatus, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryCheckinFrom, attendance.queryCheckinTo, attendance.queryCheckoutFrom, attendance.queryCheckoutTo))}
                            onNext={() => dispatch(fetchNext(attendance.currentPage, attendance.pageLength, attendance.currentLimit, attendance.queryText, attendance.queryStatus, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryCheckinFrom, attendance.queryCheckinTo, attendance.queryCheckoutFrom, attendance.queryCheckoutTo))}
                            pageTotal={attendance.pageLength}
                            pageStart={attendance.currentPageStart}
                            pageEnd={attendance.currentPageEnd}
                            entriesName={"currentLimit"}
                            entriesNum={attendance.currentLimit}
                            entriesFunc={(e, newLimit) => dispatch(updateRow(attendance.queryText, attendance.queryStatus, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryCheckinFrom, attendance.queryCheckinTo, attendance.queryCheckoutFrom, attendance.queryCheckoutTo, attendance.currentPage, newLimit.value))}
                        />
                    </Table>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={attendance.isDeleting}
                configType={"Delete Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={() => dispatch(deleteAttendance(attendance.attendanceId))}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following attendance record?</strong></p>
                        <p><strong>Attendance record ID: </strong>{attendance.attendanceId}</p>
                        <p><strong>Employee ID: </strong>{attendance.employeeId}</p>
                        <p><strong>Employee: </strong>{attendance.employeeFirstname} {attendance.employeeLastname}</p>
                        <p><strong>Date: </strong>{new Date(attendance.attendanceDate).getFullYear()} - {new Date(attendance.attendanceDate).getMonth() + 1} - {new Date(attendance.attendanceDate).getDate()}</p>
                        <p><strong>Check in: </strong>{attendance.attendanceCheckin}</p>
                        <p><strong>Check out: </strong>{attendance.attendanceCheckout ? attendance.attendanceCheckout : "Employee did not check out."}</p>
                        <p><strong>Status: </strong>{attendance.attendanceStatus}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={attendance.isUpdating}
                configType={"Update Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryFunc={() => dispatch(updateAttendance(attendance.attendanceId, attendance.attendanceCheckin, attendance.attendanceCheckout, attendance.attendanceStatus))}
                configSecondaryColor={"green"}
                configContent={
                    <React.Fragment>
                        <p><strong>Attendance Record ID: </strong>{attendance.attendanceId}</p>
                        <p><strong>Employee ID: </strong>{attendance.employeeId}</p>
                        <p><strong>Employee: </strong>{attendance.employeeFirstname} {attendance.employeeLastname}</p>
                        <p><strong>Date: </strong>{new Date(attendance.attendanceDate).getFullYear()} - {new Date(attendance.attendanceDate).getMonth() + 1} - {new Date(attendance.attendanceDate).getDate()}</p>
                        <Form>
                            <Grid>
                                <Grid.Row columns="2">
                                    <Grid.Column>
                                        <Form.Field>
                                            <label htmlFor="attendanceCheckin">Check in</label>
                                            <input id="attendanceCheckin" name="attendanceCheckin" type="time" step="1" value={attendance.attendanceCheckin} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label htmlFor="attendanceCheckout">Check out</label>
                                            <input id="attendanceCheckout" name="attendanceCheckout" type="time" step="1" value={attendance.attendanceCheckout} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label htmlFor="attendanceStatus">Status</label>
                                            <select id="attendanceStatus" name="attendanceStatus" value={attendance.attendanceStatus} onChange={(e) => dispatch(handleUpdateAttendance(e))}>
                                                <option value="" hidden>Status</option>
                                                <option value="on_time">On Time</option>
                                                <option value="late">Late</option>
                                            </select>
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={attendance.isCreating}
                configType={"Create Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(attendance.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryFunc={() => dispatch(createAttendance(attendance.employeeId, attendance.attendanceDate, attendance.attendanceCheckout, attendance.attendanceCheckin, attendance.attendanceStatus))}
                configSecondaryColor={"green"}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="attendanceDate">Date</label>
                            <input id="attendanceDate" name="attendanceDate" type="date" value={attendance.attendanceDate} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="attendanceCheckin">Check In Time</label>
                            <input id="attendanceCheckin" name="attendanceCheckin" type="time" step="1" value={attendance.attendanceCheckin} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="attendanceCheckout">Check Out Time</label>
                            <input id="attendanceCheckout" name="attendanceCheckout" type="time" step="1" value={attendance.attendanceCheckout} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="employeeId">Employee</label>
                            <select id="employeeId" name="employeeId" plaecholder="Employee" value={attendance.employeeId} onChange={(e) => dispatch(handleUpdateAttendance(e))}>
                                <option value="" hidden>Employee</option>
                                {attendance.employeeList.map((el, i) =>
                                    <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                                )}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="attendanceStatus">Status</label>
                            <select id="attendanceStatus" name="attendanceStatus" placeholder="Status" value={attendance.attendanceStatus} onChange={(e) => dispatch(handleUpdateAttendance(e))}>
                                <option value="" hidden>Status</option>
                                <option value="on_time">On time</option>
                                <option value="late">Late</option>
                            </select>
                        </Form.Field>
                    </Form>
                }
            />
            <Config
                isConfigOpen={attendance.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(attendance.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetQuery(attendance.currentPage, attendance.currentLimit))}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configTertiaryFunc={() => dispatch(fetchAttendanceByQuery(attendance.queryText, attendance.queryStatus, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryCheckinFrom, attendance.queryCheckinTo, attendance.queryCheckoutFrom, attendance.queryCheckoutTo, attendance.currentPage, attendance.currentLimit))}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="queryText">Contains:</label>
                            <input id="queryText" name="queryText" placeholder="Employee Name" value={attendance.queryText} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="queryStatus">Status:</label>
                            <select id="queryStatus" name="queryStatus" value={attendance.queryStatus} onChange={(e) => dispatch(handleUpdateAttendance(e))}>
                                <option value="" hidden>Status</option>
                                <option value="on_time">On Time</option>
                                <option value="late">Late</option>
                            </select>
                        </Form.Field>
                        <Grid>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="queryDateFrom">Date From:</label>
                                        <input type="date" id="queryDateFrom" name="queryDateFrom" value={attendance.queryDateFrom} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="queryDateTo">Date To:</label>
                                        <input type="date" id="queryDateTo" name="queryDateTo" value={attendance.queryDateTo} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="queryCheckinFrom">Check In From:</label>
                                        <input type="time" step="1" id="queryCheckinFrom" name="queryCheckinFrom" value={attendance.queryCheckinFrom} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="queryCheckinTo">Check In To:</label>
                                        <input type="time" step="1" id="queryCheckinTo" name="queryCheckinTo" value={attendance.queryCheckinTo} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="queryCheckoutFrom">Check Out From:</label>
                                        <input type="time" step="1" id="queryCheckoutFrom" name="queryCheckoutFrom" value={attendance.queryCheckoutFrom} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="queryCheckoutTo">Check Out To:</label>
                                        <input type="time" step="1" id="queryCheckoutTo" name="queryCheckoutTo" value={attendance.queryCheckoutTo} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                }
            />
            <Config
                isConfigOpen={attendance.isBatchDeleting}
                configType={"Batch Delete"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(attendance.isBatchDeleting))}
                configSecondaryAction={"Batch Delete"}
                configSecondaryFunc={() => dispatch(deleteAttendance((attendance.selectedRecord)))}
                configSecondaryColor={"red"}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following attendance records?</strong></p>
                        {attendance.selectedRecord.map((el, i) =>
                            <p key={i}><strong>ID:</strong> {el}</p>
                        )}
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={attendance.isBatchUpdating}
                configType={"Batch Update"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(attendance.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryFunc={() => dispatch(updateBatchAttendance(attendance.selectedRecord, attendance.updateAttendanceCheckin, attendance.updateAttendanceCheckout, attendance.updateAttendanceStatus))}
                configSecondaryColor={"green"}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="updateAttendanceCheckin">Check In Time:</label>
                            <input type="time" step="1" id="updateAttendanceCheckin" name="updateAttendanceCheckin" value={attendance.updateAttendanceCheckin} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="updateAttendanceCheckout">Check Out Time:</label>
                            <input type="time" step="1" id="updateAttendanceCheckout" name="updateAttendanceCheckout" value={attendance.updateAttendanceCheckout} onChange={(e) => dispatch(handleUpdateAttendance(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="updateAttendanceStatus">Status: </label>
                            <select id="updateAttendanceStatus" name="updateAttendanceStatus" value={attendance.updateAttendanceStatus} onChange={(e) => dispatch(handleUpdateAttendance(e))}>
                                <option value="" hidden>Status</option>
                                <option value="on_time">On Time</option>
                                <option value="late">Late</option>
                            </select>
                        </Form.Field>
                    </Form>
                }
            />
        </div >
    )
}

export default AttendanceHistory