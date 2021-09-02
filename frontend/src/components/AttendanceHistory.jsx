import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAttendance, fetchNext, fetchPrevious, deleteAttendance, updateAttendance, createAttendance, handleUpdateAttendance, fetchSpecificAttendance, resetAttendance, addToSelected, removeFromSelected, resetSelected, resetQuery, addAllToSelected } from '../actions/attendance';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Grid, Form, Button, Header } from 'semantic-ui-react'
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableBody from './TableBody';
import Config from './Config';
import '../css/main.css'

function AttendanceHistory() {
    const dispatch = useDispatch()
    const history = useHistory()
    const attendance = useSelector(state => state.attendance)
    const [state, setState] = useState({
        isUpdating: false,
        isCreating: false,
        isFiltering: false,
        isBatchDeleting: false,
        isBatchUpdating: false,
        isDeleting: false,
    })

    useEffect(() => {
        dispatch(fetchAttendance())
    }, [dispatch])

    const toggleBatchUpdate = () => {
        if (!state.isBatchUpdating) {
            window.history.replaceState(null, "", '/attendance/updatebatch')
            dispatch(resetAttendance())
        } else {
            history.push('/attendance')
        }

        return setState(prevState => {
            return {
                ...prevState,
                isBatchUpdating: !prevState.isBatchUpdating
            }
        })
    }

    const toggleDelete = (attendance) => {
        if (attendance) {
            window.history.replaceState(null, "", `/attendance/${attendance.id}/delete`)
            dispatch(fetchSpecificAttendance(attendance.id))
        } else {
            history.push('/attendance')
            dispatch(resetAttendance())
        }

        return setState(prevState => {
            return {
                ...prevState,
                isDeleting: !prevState.isDeleting,
            }
        })
    }

    const toggleUpdate = (attendance) => {
        if (attendance) {
            window.history.replaceState(null, "", `/attendance/${attendance.id}/update`)
            dispatch(fetchSpecificAttendance(attendance.id))
        } else {
            history.push('/attendance')
            dispatch(resetAttendance())
        }

        return setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    const toggleFilter = () => {
        if (!state.isFiltering) {
            window.history.replaceState(null, "", "/attendance/filter")
        } else {
            history.push('/attendance')
        }

        setState(prevState => {
            return {
                ...prevState,
                isFiltering: !prevState.isFiltering
            }
        })
    }

    const toggleCreate = () => {
        if (!state.isCreating) {
            window.history.replaceState(null, "", `/attendance/create`)
        } else {
            history.push('/attendance')
        }
        dispatch(resetAttendance())
        return setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
    }

    const toggleBatchDelete = () => {
        if (!state.isBatchDeleting) {
            window.history.replaceState(null, "", '/attendance/deletebatch')
        } else {
            history.push('/attendance')
        }

        return setState(prevState => {
            return {
                ...prevState,
                isBatchDeleting: !prevState.isBatchDeleting
            }
        })
    }

    const handleEntriesChange = (e, result) => {
        dispatch(fetchAttendance(attendance.queryText, attendance.queryStatus, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryCheckinFrom, attendance.queryCheckinTo, attendance.queryCheckoutFrom, attendance.queryCheckoutTo, attendance.currentPage, result.value))
        return dispatch(handleUpdateAttendance(e, result))
    }

    const handleSearch = () => {
        dispatch(fetchAttendance(attendance.queryText, attendance.queryStatus, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryCheckinFrom, attendance.queryCheckinTo, attendance.queryCheckoutFrom, attendance.queryCheckoutTo, attendance.currentPage, attendance.currentLimit))
        return toggleFilter()
    }

    const handleSelect = (e) => {
        if (e.target.checked) {
            dispatch(addToSelected(e.target.name))
        } else {
            dispatch(removeFromSelected(e.target.name))
        }
    }

    const handleBatchDelete = () => {
        dispatch(deleteAttendance((attendance.selectedRecord)))
        return toggleBatchDelete()
    }

    const handleDelete = () => {
        dispatch(deleteAttendance(attendance.attendanceId))
        return toggleDelete()
    }

    const handleReset = () => {
        dispatch(resetQuery())
        dispatch(fetchAttendance())
        return toggleFilter()
    }

    const handleUpdate = () => {
        dispatch(updateAttendance(attendance.attendanceId, attendance.attendanceCheckin, attendance.attendanceCheckout, attendance.attendanceStatus))
        return toggleUpdate()
    }

    const handleBatchUpdate = () => {
        dispatch(updateAttendance(attendance.selectedRecord, attendance.updateAttendanceCheckin, attendance.updateAttendanceCheckout, attendance.updateAttendanceStatus))
        return toggleBatchUpdate()
    }

    const handleCreate = () => {
        dispatch(createAttendance(attendance.employeeId, attendance.attendanceDate, attendance.attendanceCheckout, attendance.attendanceCheckin, attendance.attendanceStatus))
        return toggleCreate()
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            dispatch(addAllToSelected(attendance.record))
        } else {
            dispatch(resetSelected())
        }
    }

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
                        <Button size="mini" color="blue" disabled={!attendance.selectedRecord.length} onClick={() => toggleBatchUpdate()}>Batch Update</Button>
                        <Button size="mini" color="red" disabled={!attendance.selectedRecord.length} onClick={() => toggleBatchDelete()}>Batch Delete</Button>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button size="mini" primary onClick={() => toggleFilter()} color="grey">Filter</Button>
                        <Button size="mini" secondary onClick={() => toggleCreate()}>Create record</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Table celled size="small">
                        <TableHeader
                            header={['ID', 'Employee ID', 'Firstname', 'Lastname', 'Date', 'Time in', 'Time out', 'Status', 'Actions']}
                            checkName={"isAllSelected"}
                            checkValue={attendance.isAllSelected}
                            checkFunc={handleSelectAll}
                        />
                        <TableBody
                            data={attendance.record}
                            primaryAction={"Update"}
                            primaryActionColor={"blue"}
                            primaryFunc={toggleUpdate}
                            secondaryAction={"Delete"}
                            secondaryActionColor={"red"}
                            secondaryFunc={toggleDelete}
                            checkFunc={handleSelect}
                            checkedRows={attendance.selectedRecord}
                        />
                        <TableFooter
                            colSpan={10}
                            onPrevious={() => dispatch(fetchPrevious(attendance.currentPage, attendance.currentLimit))}
                            onNext={() => dispatch(fetchNext(attendance.currentPage, attendance.pageLength, attendance.currentLimit, attendance.queryDateFrom, attendance.queryDateTo, attendance.queryText, attendance.queryStatus))}
                            pageTotal={attendance.pageLength}
                            pageStart={attendance.currentPageStart}
                            pageEnd={attendance.currentPageEnd}
                            entriesName={"currentLimit"}
                            entriesNum={attendance.currentLimit}
                            entriesFunc={handleEntriesChange}
                        />
                    </Table>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDelete}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={handleDelete}
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
                isConfigOpen={state.isUpdating}
                configType={"Update Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdate}
                configSecondaryAction={"Update"}
                configSecondaryFunc={handleUpdate}
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
                isConfigOpen={state.isCreating}
                configType={"Create Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreate}
                configSecondaryAction={"Create"}
                configSecondaryFunc={handleCreate}
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
                isConfigOpen={state.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleFilter}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={handleReset}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configTertiaryFunc={handleSearch}
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
                isConfigOpen={state.isBatchDeleting}
                configType={"Batch Delete"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleBatchDelete}
                configSecondaryAction={"Batch Delete"}
                configSecondaryFunc={handleBatchDelete}
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
                isConfigOpen={state.isBatchUpdating}
                configType={"Batch Update"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleBatchUpdate}
                configSecondaryAction={"Batch Update"}
                configSecondaryFunc={handleBatchUpdate}
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