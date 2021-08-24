import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmployee, fetchSpecificEmployee, updateSpecificEmployee, confirmEmployeeUpdate, deleteEmployee, resetEmployee, createEmployee, fetchNextEmployeePage, fetchPreviousEmployeePage } from '../actions/employee'
import { fetchDepartment } from '../actions/department';
import { fetchPositions } from '../actions/position';
import { Table, Grid, Menu, Form, Button, Input } from 'semantic-ui-react';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import Config from './Config';


function Employee() {
    const dispatch = useDispatch()
    const employee = useSelector(state => state.employee)
    const position = useSelector(state => state.position)
    const department = useSelector(state => state.department)
    const [state, setState] = useState({
        isViewing: false,
        isUpdating: false,
        isDeleting: false,
        isCreating: false,
        firstname: "",
        lastname: "",
        joinStart: "",
        joinEnd: ""
    })

    useEffect(() => {
        dispatch(fetchEmployee(employee.currentPage))
        dispatch(fetchDepartment())
        dispatch(fetchPositions())
    }, [dispatch, employee.currentPage])

    const headers = ['employee ID', 'Firstname', 'Lastname', 'Status', 'Department', 'Position', 'Actions']

    const data = employee.record.map(el => {
        return {
            id: el.id,
            firstname: el.firstname,
            lastname: el.lastname,
            status: el.status,
            department: el.department || "Not specicifed",
            position: el.position || "Not specicifed",
        }
    })

    const toggleViewing = (employee) => {
        if (employee) dispatch(fetchSpecificEmployee(employee.id))
        setState(prevState => {
            return {
                ...prevState,
                isViewing: !prevState.isViewing,
            }
        })
    }

    const toggleUpdating = (employee) => {
        if (employee) dispatch(fetchSpecificEmployee(employee.id))
        setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating,
            }
        })
    }

    const toggleDeleting = (employee) => {
        if (employee) dispatch(fetchSpecificEmployee(employee.id))
        setState(prevState => {
            return {
                ...prevState,
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const toggleCreating = () => {
        dispatch(resetEmployee())
        setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleUpdate = () => {
        dispatch(confirmEmployeeUpdate(employee.employeeId, employee.employeeFirstname, employee.employeeLastname, employee.employeePositionId, employee.employeeDepartmentId, employee.employeeAddress, employee.employeeNumber, employee.employeeContactPerson, employee.employeeContactNumber, employee.employeeOnboardDate, employee.employeeStatus, employee.employeeOT, employee.employeeOTpay, employee.employeeStartHour, employee.employeeEndHour))
        toggleUpdating()
    }

    const handleDelete = () => {
        dispatch(deleteEmployee(employee.employeeId))
        toggleDeleting()
    }

    const handleCreate = () => {
        dispatch(createEmployee(employee.employeeUsername, employee.employeePassword, employee.employeeRole, employee.employeeFirstname, employee.employeeLastname, employee.employeeAddress, employee.employeeNumber, employee.employeeContactPerson, employee.employeeContactNumber, employee.employeeOnboardDate, employee.employeeSalary, employee.employeeStartHour, employee.employeeEndHour, employee.employeePositionId, employee.employeeDepartmentId, employee.employeeOTpay, employee.employeeOT))
        toggleCreating()
    }

    const handleSearch = () => {
        dispatch(fetchEmployee(employee.currentPage, state.firstname, state.lastname, state.joinStart, state.joinEnd))
    }

    const gotoNextPage = () => {
        dispatch(fetchNextEmployeePage(employee.currentPage, employee.pageCount, state.firstname, state.lastname, state.joinStart, state.joinEnd))
    }

    const gotoPreviousPage = () => {
        dispatch(fetchPreviousEmployeePage(employee.currentPage, state.firstname, state.lastname, state.joinStart, state.joinEnd))
    }

    return (
        <Grid>
            <Grid.Row centered>
                <Menu>
                    <Menu.Item>
                        <label htmlFor="joinStart">Join Date</label>
                    </Menu.Item>
                    <Menu.Item>
                        <Input id="joinStart" name="joinStart" type="date" onChange={(e) => handleChange(e)} />
                    </Menu.Item>
                    <Menu.Item>
                        <label htmlFor="joinEnd">To</label>
                    </Menu.Item>
                    <Menu.Item>
                        <Input id="joinEnd" name="joinEnd" type="date" onChange={(e) => handleChange(e)} />
                    </Menu.Item>
                    <Menu.Item>
                        <label htmlFor="firstname">Firstname</label>
                    </Menu.Item>
                    <Menu.Item>
                        <Input id="firstname" name="firstname" type="text" onChange={(e) => handleChange(e)} />
                    </Menu.Item>
                    <Menu.Item>
                        <label htmlFor="lastname">Lastname</label>
                    </Menu.Item>
                    <Menu.Item>
                        <Input id="lastname" name="lastname" type="text" onChange={(e) => handleChange(e)} />
                    </Menu.Item>
                    <Menu.Item>
                        <Button onClick={() => handleSearch()}>Search</Button>
                    </Menu.Item>
                </Menu>
            </Grid.Row>
            <Grid.Row textAlign="right">
                <Grid.Column>
                    <Button color="blue" onClick={() => toggleCreating()}>Create Employee</Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Table celled>
                    <TableHeader header={headers} />
                    <TableBody
                        data={data}
                        primaryAction={"Details"}
                        primaryFunc={toggleViewing}
                        primaryActionColor={"blue"}
                        secondaryAction={"Update"}
                        secondaryFunc={toggleUpdating}
                        secondaryActionColor={"teal"}
                        tertiaryAction={"Delete"}
                        tertiaryFunc={toggleDeleting}
                        tertiaryActionColor={"red"}
                    />
                    <TableFooter
                        colSpan={7}
                        pageStart={employee.currentPageStart}
                        pageEnd={employee.currentPageEnd}
                        pageTotal={employee.pageCount}
                        onNext={gotoNextPage}
                        onPrevious={gotoPreviousPage}
                    />
                </Table>
            </Grid.Row>
            <Config
                isConfigOpen={state.isViewing}
                configType={"Employee Details"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleViewing}
                configContent={
                    <React.Fragment>
                        {employee.employeeId ?
                            <React.Fragment>
                                <p><strong>ID: </strong>{employee.employeeId}</p>
                                <p><strong>Firstname: </strong>{employee.employeeFirstname}</p>
                                <p><strong>Lastname:</strong> {employee.employeeLastname}</p>
                                <p><strong>Position:</strong> {employee.employeePosition ? employee.employeePosition : "Not specified"}</p>
                                <p><strong>Department: </strong>{employee.employeeDepartment ? employee.employeeDepartment : "Not specified"}</p>
                                <p><strong>Working Hours:</strong></p>
                                <p><strong>Starting at:</strong> {employee.employeeStartHour}</p>
                                <p><strong>Ending at:</strong> {employee.employeeEndHour}</p>
                                <p><strong>Address: </strong> {employee.employeeAddress}</p>
                                <p><strong>Phone Number:</strong> {employee.employeeNumber}</p>
                                <p><strong>Emergency Contact Person: </strong>{employee.employeeContactPerson}</p>
                                <p><strong>Emergency Contact Number: </strong>{employee.employeeContactNumber}</p>
                                <p><strong>Onboard Date:</strong> {new Date(employee.employeeOnboardDate).getFullYear()} - {new Date(employee.employeeOnboardDate).getMonth() + 1} - {new Date(employee.employeeOnboardDate).getDate()}</p>
                                <p><strong>Role:</strong> {employee.employeeRole}</p>
                                <p><strong>Monthly Salary: </strong>{employee.employeeSalary}</p>
                                <p><strong>Overtime Pay Entitlement: </strong>{employee.employeeOT ? "Yes" : "No"}</p>
                                <p><strong>Overtime Hourly Pay: </strong>{employee.employeeOTpay ? employee.employeeOTpay : "Not applicable"}</p>
                            </React.Fragment>
                            : null}
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isUpdating}
                configType={"Update Employee Information"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdating}
                configSecondaryAction={"Update"}
                configSecondaryFunc={handleUpdate}
                configContent={
                    <React.Fragment>
                        {employee.employeeId ?
                            <Form>
                                <Form.Field>
                                    <label htmlFor="id">Employee ID</label>
                                    <input id="id" value={employee.employeeId} disabled />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeFirstname">Firstname</label>
                                    <input id="employeeFirstname" name="employeeFirstname" value={employee.employeeFirstname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeLastname">Lastname</label>
                                    <input id="employeeLastname" name="employeeLastname" value={employee.employeeLastname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeePositionId">Position</label>
                                    <select value={employee.employeePositionId} id="employeePositionId" name="employeePositionId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                        <option value="">Unassigned</option>
                                        {position.record.map((el, i) =>
                                            <option value={el.id} key={i}>{el.post}</option>
                                        )}
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeDepartmentId">Department</label>
                                    <select value={employee.employeeDepartmentId} id="employeeDepartmentId" name="employeeDepartmentId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                        <option value="">Unassigned</option>
                                        {department.record.map((el, i) =>
                                            <option value={el.id} key={i}>{el.name}</option>
                                        )}
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <label>Working Hour</label>
                                    <label htmlFor="employeeStartHour">Starting</label>
                                    <input value={employee.employeeStartHour} type="time" step="1" id="employeeStartHour" name="employeeStartHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    <label htmlFor="employeeEndHour">Ending</label>
                                    <input value={employee.employeeEndHour} type="time" step="1" id="employeeEndHour" name="employeeEndHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeRole">Role</label>
                                    <select value={employee.employeeRole} id="employeeRole" name="employeeRole" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeAddress">Address</label>
                                    <input id="employeeAddress" name="employeeAddress" value={employee.employeeAddress} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeNumber">Phone Number</label>
                                    <input id="employeeNumber" name="employeeNumber" value={employee.employeeNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeContactPerson">Emergency Contact Person</label>
                                    <input id="employeeContactPerson" name="employeeContactPerson" value={employee.employeeContactPerson} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeContactNumber">Emergency Contact Number</label>
                                    <input id="employeeContactNumber" name="employeeContactNumber" value={employee.employeeContactNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeSalary">Monthly Salary</label>
                                    <input id="employeeSalary" name="employeeSalary" value={employee.employeeSalary} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeOT">Entitled to Overtime Pay?</label>
                                    <input id="employeeOT" name="employeeOT" type="checkbox" value={employee.employeeOT} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="employeeOTpay">Overtime Hourly Pay </label>
                                    <input id="employeeOTpay" name="employeeOTpay" value={employee.employeeOTpay} onChange={(e) => dispatch(updateSpecificEmployee(e))} disabled={!employee.employeeOT} />
                                </Form.Field>
                            </Form>
                            : null}
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Employee Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={handleDelete}
                configSecondaryColor={"red"}
                configContent={
                    employee.employeeId ?
                        <React.Fragment>
                            <p><strong>Are you sure to delete the following employee record?</strong></p>
                            <p><strong>ID: </strong>{employee.employeeId}</p>
                            <p><strong>Firstname: </strong>{employee.employeeFirstname}</p>
                            <p><strong>Lastname:</strong> {employee.employeeLastname}</p>
                            <p><strong>Position:</strong> {employee.employeePosition ? employee.employeePosition : "Not specified"}</p>
                            <p><strong>Department: </strong>{employee.employeeDepartment ? employee.employeeDepartment : "Not specified"}</p>
                            <p><strong>Address: </strong> {employee.employeeAddress}</p>
                            <p><strong>Phone Number:</strong> {employee.employeeNumber}</p>
                            <p><strong>Emergency Contact Person: </strong>{employee.employeeContactPerson}</p>
                            <p><strong>Emergency Contact Number: </strong>{employee.employeeContactNumber}</p>
                            <p><strong>Onboard Date:</strong> {new Date(employee.employeeOnboardDate).getFullYear()} - {new Date(employee.employeeOnboardDate).getMonth() + 1} - {new Date(employee.employeeOnboardDate).getDate()}</p>
                            <p><strong>Role:</strong> {employee.employeeRole}</p>
                            <p><strong>Monthly Salary: </strong>{employee.employeeSalary}</p>
                            <p><strong>Overtime Pay Entitlement: </strong>{employee.employeeOT ? "Yes" : "No"}</p>
                            <p><strong>Overtime Hourly Pay: </strong>{employee.employeeOTpay ? employee.employeeOTpay : "Not applicable"}</p>
                        </React.Fragment>
                        :
                        null}
            />
            <Config
                isConfigOpen={state.isCreating}
                configType={"Create Employee"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleCreate}
                configContent={
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                <label htmlFor="employeeFirstname">Firstname</label>
                                <input id="employeeFirstname" name="employeeFirstname" value={employee.employeeFirstname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeLastname">Lastname</label>
                                <input id="employeeLastname" name="employeeLastname" value={employee.employeeLastname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeePositionId">Position</label>
                                <select value={employee.employeePositionId} id="employeePositionId" name="employeePositionId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                    <option value="">Unassigned</option>
                                    {position.record.map((el, i) =>
                                        <option value={el.id} key={i}>{el.post}</option>
                                    )}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeDepartmentId">Department</label>
                                <select value={employee.employeeDepartmentId} id="employeeDepartmentId" name="employeeDepartmentId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                    <option value="">Unassigned</option>
                                    {department.record.map((el, i) =>
                                        <option value={el.id} key={i}>{el.name}</option>
                                    )}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Working Hour</label>
                                <label htmlFor="employeeStartHour">Starting</label>
                                <input value={employee.employeeStartHour} type="time" step="1" id="employeeStartHour" name="employeeStartHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                <label htmlFor="employeeEndHour">Ending</label>
                                <input value={employee.employeeEndHour} type="time" step="1" id="employeeEndHour" name="employeeEndHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeRole">Role</label>
                                <select value={employee.employeeRole} id="employeeRole" name="employeeRole" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeOnboardDate">Onboard Date</label>
                                <input type="date" id="employeeOnboardDate" name="employeeOnboardDate" value={employee.employeeOnboardDate} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeAddress">Address</label>
                                <input id="employeeAddress" name="employeeAddress" value={employee.employeeAddress} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeNumber">Phone Number</label>
                                <input id="employeeNumber" name="employeeNumber" value={employee.employeeNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeContactPerson">Emergency Contact Person</label>
                                <input id="employeeContactPerson" name="employeeContactPerson" value={employee.employeeContactPerson} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeContactNumber">Emergency Contact Number</label>
                                <input id="employeeContactNumber" name="employeeContactNumber" value={employee.employeeContactNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeSalary">Monthly Salary</label>
                                <input id="employeeSalary" name="employeeSalary" value={employee.employeeSalary} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeOT">Entitled to Overtime Pay?</label>
                                <input id="employeeOT" name="employeeOT" type="checkbox" value={employee.employeeOT} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeOTpay">Overtime Hourly Pay </label>
                                <input id="employeeOTpay" name="employeeOTpay" value={employee.employeeOTpay} onChange={(e) => dispatch(updateSpecificEmployee(e))} disabled={!employee.employeeOT} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeeUsername">Username:</label>
                                <input id="employeeUsername" name="employeeUsername" value={employee.employeeUsername} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="employeePassword">Password:</label>
                                <input id="employeePassword" name="employeePassword" value={employee.employeePassword} type="password" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                }
            />
        </Grid >
    )
}

export default Employee