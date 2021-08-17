import React, { useEffect, useState } from 'react';
import { fetchAttendance, fetchNext, fetchPrevious, fetchSpecific, fetchByQuery } from '../actions/attendance';
import { fetchEmployee } from '../actions/employee'
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Menu, Table, Grid, Dropdown } from 'semantic-ui-react'

function AttendanceHistory() {
    const date = new Date().toISOString().slice(0, 10)
    const dispatch = useDispatch()
    const attendance = useSelector(state => state.attendance)
    const employee = useSelector(state => state.employee)
    const [state, setState] = useState({
        starting: date,
        ending: date,
        employee: "",
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
    }, [attendance.currentPage, dispatch])

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
                            </Table.Row>
                        )}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='8'>
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
    )
}

export default AttendanceHistory