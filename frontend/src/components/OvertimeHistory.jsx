import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOvertimeRecord, updateOvertimeRecord, fetchNextOvertimeRecord, fetchPreviousOvertimeRecord, fetchByQuery, createOvertimeRecord } from '../actions/overtime';
import { fetchEmployee } from '../actions/employee'
import { Menu, Table, Grid, Dropdown, Form, Button, Checkbox } from 'semantic-ui-react'
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import Config from './Config';

function OvertimeHistory() {
    const date = new Date().toISOString().slice(0, 10)
    const dispatch = useDispatch()
    const overtime = useSelector(state => state.overtime)
    const employee = useSelector(state => state.employee)
    const [state, setState] = useState({
        starting: date,
        ending: date,
        employee_id: "",
        isUpdating: false,
        isCreating: false,
        update: null,
        status: "",
        createStarting: "",
        createEnding: "",
        createDate: "",
        createEmployee: "",
        createIsApproved: false,
    })

    const options = employee.record.map((el, i) => {
        return {
            key: i,
            text: `ID: ${el.id} ${el.firstname} ${el.lastname}`,
            value: el.id
        }
    })

    const status = [
        { key: 0, text: "Pending", value: "pending" },
        { key: 1, text: "Approved", value: "approved" },
        { key: 2, text: "Rejected", value: "rejected" }
    ]

    useEffect(() => {
        dispatch(fetchOvertimeRecord(state.starting, state.ending, state.employee_id, overtime.currentPage))
        dispatch(fetchEmployee())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const header = ['id', 'Employee id', 'Firstname', 'Lastname', 'Time in', 'Time out', 'Date', 'status', 'Actions']

    const flipToNextOvertimeRecord = () => {
        if (overtime.currentPageEnd >= overtime.pageLength) return

        dispatch(fetchNextOvertimeRecord(state.starting, state.ending, state.employee_id, overtime.currentPage))
    }

    const flipToPreviousOvertimeRecord = () => {
        if (overtime.currentPage <= 0) return;
        dispatch(fetchPreviousOvertimeRecord(state.starting, state.ending, state.employee_id, overtime.currentPage))
    }

    const handleChange = (e, result) => {
        let { name, value } = result || e.target
        if (result) {
            if (result.type === "checkbox") {
                value = result.checked
            }
        }
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleUpdateChange = (e) => {
        const { name, value } = e.target
        setState(prevState => {
            return {
                ...prevState,
                update: {
                    ...prevState.update,
                    [name]: value
                }
            }
        })
    }

    const toggleUpdate = (overtime) => {
        setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating,
                update: overtime
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

    const handleApprove = () => {
        dispatch(updateOvertimeRecord(state.update.id, state.update.from, state.update.to, 'approved'))
        toggleUpdate()
    }

    const handleReject = () => {
        dispatch(updateOvertimeRecord(state.update.id, state.update.from, state.update.to, 'rejected'))
        toggleUpdate()
    }

    const handleCreate = () => {
        dispatch(createOvertimeRecord(state.createEmployee, state.createStarting, state.createEnding, state.createDate, state.createIsApproved))
        toggleCreate()
    }

    return (
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
                            placeholder={'Employee'}
                            selection
                            name="employee_id"
                            options={options}
                            onChange={handleChange}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown
                            placeholder={"Status"}
                            selection
                            name="status"
                            options={status}
                            onChange={handleChange}
                        />
                    </Menu.Item>
                    <Menu.Item onClick={() => dispatch(fetchByQuery(state.starting, state.ending, state.employee_id, state.status))}>
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
                        data={overtime.overtimeRecord}
                        primaryAction={"Update"}
                        primaryActionColor={"blue"}
                        primaryFunc={toggleUpdate}
                    />
                    <TableFooter
                        colSpan={9}
                        pageStart={overtime.currentPageStart}
                        pageEnd={overtime.currentPageEnd}
                        pageTotal={overtime.pageLength}
                        onNext={flipToNextOvertimeRecord}
                        onPrevious={flipToPreviousOvertimeRecord}
                    />
                </Table>
            </Grid.Row>
            <Config
                isConfigOpen={state.isUpdating}
                configSize={"tiny"}
                configType={"Update Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdate}
                configSecondaryAction={"Approve"}
                configSecondaryFunc={handleApprove}
                configSecondaryColor={"green"}
                configTertiaryAction={"Reject"}
                configTertiaryFunc={handleReject}
                configTertiaryColor={"red"}
                configContent={
                    <React.Fragment>
                        {state.update ?
                            <React.Fragment>
                                <p>Overtime Record id: {state.update.id}</p>
                                <p>Employee id: {state.update.employee_id}</p>
                                <p>Employee fullname: {state.update.firstname} {state.update.lastname}</p>
                                <p>Date: {state.update.date}</p>
                                <p>Status: {state.update.status}</p>
                                <Form>
                                    <Form.Field>
                                        <label htmlFor="from">Check in</label>
                                        <input id="from" name="from" type="time" step="1" value={state.update.from} onChange={(e) => handleUpdateChange(e)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label htmlFor="to">Check out</label>
                                        <input id="to" name="to" type="time" step="1" value={state.update.to} onChange={(e) => handleUpdateChange(e)} />
                                    </Form.Field>
                                </Form>
                            </React.Fragment>
                            : null}
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configSize={"tiny"}
                configType={"Insert Overtime Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreate}
                configSecondaryAction={"Insert"}
                configSecondaryFunc={handleCreate}
                configSecondaryColor={"green"}
                configContent={
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                <label htmlFor="starting">Check In Time</label>
                                <input type="time" step="1" id="starting" name="createStarting" value={state.createStarting} onChange={(e) => handleChange(e)} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="ending">Check Out Time</label>
                                <input type="time" step="1" id="ending" name="createEnding" value={state.createEnding} onChange={(e) => handleChange(e)} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="date">Date</label>
                                <input type="date" id="date" name="createDate" value={state.createDate} onChange={(e) => handleChange(e)} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employee">Employee</label>
                                <Form.Select id="employee" name="createEmployee" options={options} onChange={handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label="Approve upon insert" name="createIsApproved" checked={state.createIsApproved} onChange={handleChange} />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                }
            />
        </Grid>
    )
}

export default OvertimeHistory