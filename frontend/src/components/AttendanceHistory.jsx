import React, { useEffect, useState } from 'react';
import { fetchAttendance, fetchNext, fetchPrevious, fetchByQuery, deleteAttendance, updateAttendance, createAttendance } from '../actions/attendance';
import { fetchEmployee } from '../actions/employee'
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Table, Grid, Dropdown, Form, Button } from 'semantic-ui-react'
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableBody from './TableBody';
import Config from './Config';

function AttendanceHistory() {
    const date = new Date().toISOString().slice(0, 10)
    const dispatch = useDispatch()
    const attendance = useSelector(state => state.attendance)
    const employee = useSelector(state => state.employee)
    const [state, setState] = useState({
        starting: date,
        ending: date,
        employee: "",
        delete: false,
        update: false,
        deletion: null,
        updates: null,
        isCreating: false,
        createCheckin: "",
        createCheckout: "",
        createDate: "",
        createEmployee: "",
        createStatus: ""
    })

    const options = employee.record.map((el, i) => {
        return {
            key: i,
            text: `ID: ${el.id} ${el.firstname} ${el.lastname}`,
            value: el.id
        }
    })

    const statusOptions = [
        { key: 0, text: "On-Time", value: "on_time" },
        { key: 1, text: "Late", value: "late" }
    ]

    const header = ['ID', 'Employee ID', 'Firstname', 'Lastname', 'Date', 'Time in', 'Time out', 'Status', 'Actions']

    useEffect(() => {
        dispatch(fetchAttendance(attendance.currentPage, state.starting, state.ending))
        dispatch(fetchEmployee())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const handleFlipToPrevious = () => {
        if (attendance.currentPage <= 0) return;
        dispatch(fetchPrevious(attendance.currentPage, state.starting, state.ending))
    }

    const handleFlipToNext = () => {
        if (attendance.currentPageEnd >= attendance.pageLength) return;
        dispatch(fetchNext(attendance.currentPage, state.starting, state.ending))
    }

    const handleChange = (e, result) => {
        const { name, value } = result || e.target;
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSearch = () => {
        dispatch(fetchByQuery(state.starting, state.ending, state.employee))
    }

    const toggleDelete = (attendance) => {
        setState(prevState => {
            return {
                ...prevState,
                delete: !prevState.delete,
                deletion: attendance
            }
        })
    }

    const toggleUpdate = (attendance) => {
        setState(prevState => {
            return {
                ...prevState,
                update: !prevState.update,
                updates: attendance
            }
        })
    }

    const toggleCreate = () => {
        setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
    }

    const handleUpdateChange = (e) => {
        const { name, value } = e.target
        setState(prevState => {
            return {
                ...prevState,
                updates: {
                    ...prevState.updates,
                    [name]: value
                }
            }
        })
    }

    const handleDelete = () => {
        dispatch(deleteAttendance(state.deletion.id))
        toggleDelete()
    }

    const handleUpdate = () => {
        dispatch(updateAttendance(state.updates.id, state.updates.check_in, state.updates.check_out))
        toggleUpdate()
    }

    const handleCreate = () => {
        dispatch(createAttendance(state.createEmployee, state.createDate, state.createCheckin, state.createCheckout, state.createStatus))
        toggleCreate()
    }

    return (
        <div>
            <Grid>
                <Grid.Row centered>
                    <Menu>
                        <Menu.Item>
                            <label htmlFor="starting">Starting date</label>
                        </Menu.Item>
                        <Menu.Item>
                            <input id="starting" type="date" name="starting" value={state.starting} onChange={(e) => handleChange(e)} />
                        </Menu.Item>
                        <Menu.Item>
                            <label htmlFor="ending">Ending date</label>
                        </Menu.Item>
                        <Menu.Item>
                            <input id="ending" type="date" name="ending" value={state.ending} onChange={(e) => handleChange(e)} />
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
                                onChange={handleChange}
                                options={options}
                                placeholder={'Employee'}
                                selection
                                value={state.employee}
                                name="employee"
                            />
                        </Menu.Item>
                        <Menu.Item onClick={() => handleSearch()}>
                            Search
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row textAlign="right">
                    <Grid.Column>
                        <Button color="blue" onClick={() => toggleCreate()}>Create record</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Table celled>
                        <TableHeader header={header} />
                        <TableBody
                            data={attendance.record}
                            primaryAction={"Update"}
                            primaryFunc={toggleUpdate}
                            secondaryAction={"Delete"}
                            secondaryFunc={toggleDelete}
                        />
                        <TableFooter
                            colSpan={9}
                            onPrevious={() => handleFlipToPrevious()}
                            onNext={() => handleFlipToNext()}
                            pageTotal={attendance.pageLength}
                            pageStart={attendance.currentPageStart}
                            pageEnd={attendance.currentPageEnd}
                        />
                    </Table>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={state.delete}
                configSize={"tiny"}
                configType={"Delete Attendance Record"}
                configContent={
                    <React.Fragment>
                        {state.deletion ?
                            <React.Fragment>
                                <p>Are you sure you want to delete the following attendance record?</p>
                                <p>Attendance record id: {state.deletion.id}</p>
                                <p>Employee id: {state.deletion.employee_id}</p>
                                <p>Employee: {state.deletion.firstname} {state.deletion.lastname}</p>
                                <p>Date: {new Date(state.deletion.date).getFullYear()} - {new Date(state.deletion.date).getMonth() + 1} - {new Date(state.deletion.date).getDate()}</p>
                                <p>Check in: {state.deletion.check_in}</p>
                                <p>Check out: {state.deletion.check_out}</p>
                                <p>Status: {state.deletion.status}</p>
                            </React.Fragment> : null}
                    </React.Fragment>
                }
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDelete}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={handleDelete}
            />
            <Config
                isConfigOpen={state.update}
                configSize={"tiny"}
                configType={"Update Attendance Record"}
                configContent={
                    <React.Fragment>
                        {state.updates ?
                            <React.Fragment>
                                <p>Attendance record id: {state.updates.id}</p>
                                <p>Employee id: {state.updates.employee_id}</p>
                                <p>Employee: {state.updates.firstname} {state.updates.lastname}</p>
                                <p>Date: {new Date(state.updates.date).getFullYear()} - {new Date(state.updates.date).getMonth() + 1} - {new Date(state.updates.date).getDate()}</p>
                                <Form>
                                    <Form.Field>
                                        <label htmlFor="check_in">Check in</label>
                                        <input id="check_in" name="check_in" type="time" step="1" value={state.updates.check_in} onChange={(e) => handleUpdateChange(e)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label htmlFor="check_out">Check out</label>
                                        <input id="check_out" name="check_out" type="time" step="1" value={state.updates.check_out} onChange={(e) => handleUpdateChange(e)} />
                                    </Form.Field>
                                </Form>
                            </React.Fragment>
                            : null}
                    </React.Fragment>
                }
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdate}
                configSecondaryAction={"Update"}
                configSecondaryFunc={handleUpdate}
            />
            <Config
                isConfigOpen={state.isCreating}
                configSize={"tiny"}
                configType={"Create Attendance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreate}
                configContent={
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                <label htmlFor="createDate">Date</label>
                                <input id="createDate" name="createDate" type="date" value={state.createDate} onChange={(e) => handleChange(e)} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="createCheckin">Check In Time</label>
                                <input id="createCheckin" name="createCheckin" type="time" step="1" value={state.createCheckin} onChange={(e) => handleChange(e)} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="createCheckout">Check Out Time</label>
                                <input id="createCheckout" name="createCheckout" type="time" step="1" value={state.createCheckout} onChange={(e) => handleChange(e)} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="createEmployee">Employee</label>
                                <Form.Select id="createEmployee" name="createEmployee" options={options} onChange={handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="createStatus">Status</label>
                                <Form.Select id="createStatus" name="createStatus" options={statusOptions} onChange={handleChange} />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                }
                configSecondaryAction={"Create"}
                configSecondaryFunc={handleCreate}
            />
        </div>
    )
}

export default AttendanceHistory