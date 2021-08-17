import React, { useEffect, useState } from 'react';
import { fetchAttendance, fetchNext, fetchPrevious, fetchSpecific, fetchByQuery, deleteAttendance, updateAttendance } from '../actions/attendance';
import { fetchEmployee } from '../actions/employee'
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Menu, Table, Grid, Dropdown, Modal, Button, Form } from 'semantic-ui-react'

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
        updates: null
    })

    const options = employee.record.map((el, i) => {
        return {
            key: i,
            text: `ID: ${el.id} ${el.firstname} ${el.lastname}`,
            value: el.id
        }
    })

    useEffect(() => {
        dispatch(fetchAttendance(attendance.currentPage, state.starting, state.ending))
        dispatch(fetchEmployee())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const handleFlipTo = (page) => {
        if (attendance.currentPage >= attendance.pageLength.length - 1) return;
        dispatch(fetchSpecific(page, state.starting, state.ending))
    }

    const handleFlipToPrevious = () => {
        if (attendance.currentPage <= 0) return;
        dispatch(fetchPrevious(attendance.currentPage - 1, state.starting, state.ending))
    }

    const handleFlipToNext = () => {
        if (attendance.currentPage >= attendance.pageLength.length - 1) return;
        dispatch(fetchNext(attendance.currentPage + 1, state.starting, state.ending))
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
                <Grid.Row>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>id</Table.HeaderCell>
                                <Table.HeaderCell>Employee ID</Table.HeaderCell>
                                <Table.HeaderCell>Firstname</Table.HeaderCell>
                                <Table.HeaderCell>Lastname</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Time in</Table.HeaderCell>
                                <Table.HeaderCell>Time out</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {attendance.record.map((el, i) =>
                                <Table.Row key={i}>
                                    <Table.Cell>{el.id}</Table.Cell>
                                    <Table.Cell>{el.employee_id}</Table.Cell>
                                    <Table.Cell>{el.firstname}</Table.Cell>
                                    <Table.Cell>{el.lastname}</Table.Cell>
                                    <Table.Cell>{new Date(el.date).getFullYear()} - {new Date(el.date).getMonth() + 1} - {new Date(el.date).getDate()}</Table.Cell>
                                    <Table.Cell>{el.check_in}</Table.Cell>
                                    <Table.Cell>{el.check_out}</Table.Cell>
                                    <Table.Cell>{el.status}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => toggleUpdate(el)}>
                                                    Update
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => toggleDelete(el)}>
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='9'>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='a' icon onClick={() => handleFlipToPrevious()}>
                                            <Icon name='chevron left' />
                                        </Menu.Item>
                                        {attendance.currentRange.map((el, i) =>
                                            <Menu.Item key={i} onClick={() => handleFlipTo(el)}>
                                                {el}
                                            </Menu.Item>
                                        )}
                                        <Menu.Item as='a' icon onClick={() => handleFlipToNext()}>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Grid.Row>
            </Grid>
            <Modal
                size="tiny"
                open={state.delete}
            >
                <Modal.Header>Delete attendance record</Modal.Header>
                {state.delete ?
                    <Modal.Content>
                        <p>Are you sure you want to delete the following attendance record?</p>
                        <p>Attendance record id: {state.deletion.id}</p>
                        <p>Employee id: {state.deletion.employee_id}</p>
                        <p>Employee: {state.deletion.firstname} {state.deletion.lastname}</p>
                        <p>Date: {new Date(state.deletion.date).getFullYear()} - {new Date(state.deletion.date).getMonth() + 1} - {new Date(state.deletion.date).getDate()}</p>
                        <p>Check in: {state.deletion.check_in}</p>
                        <p>Check out: {state.deletion.check_out}</p>
                        <p>Status: {state.deletion.status}</p>
                    </Modal.Content>
                    : null}
                <Modal.Actions>
                    <Button negative onClick={() => toggleDelete()}>
                        No
                    </Button>
                    <Button positive onClick={() => handleDelete()}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                size="tiny"
                open={state.update}
            >
                <Modal.Header>Update attendance record</Modal.Header>
                {state.update ?
                    <Modal.Content>
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
                    </Modal.Content>
                    :
                    null
                }
                <Modal.Actions>
                    <Button negative onClick={() => toggleUpdate()}>
                        Cancel
                    </Button>
                    <Button positive onClick={() => handleUpdate()}>
                        Update
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default AttendanceHistory