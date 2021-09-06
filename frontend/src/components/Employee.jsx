import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmployee, updateSpecificEmployee, confirmEmployeeUpdate, createEmployee, toggleCreating, toggleViewing, toggleUpdating, toggleDeleting, deleteEmployee, toggleFiltering, fetchEmployeeByQuery, resetEmployeeQuery, fetchNextEmployeePage, fetchPreviousEmployeePage, fetchEmployeeByEntries, selectEmployee, selectAllEmployee, toggleBatchUpdating, batchUpdateEmployee, toggleBatchDeleting, batchDeleteEmployee } from '../actions/employee'
import { Table, Grid, Form, Button, Header } from 'semantic-ui-react';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import Config from './Config';
import '../css/main.css'

function Employee() {
    const dispatch = useDispatch()
    const employee = useSelector(state => state.employee)

    useEffect(() => {
        dispatch(fetchEmployee())
    }, [dispatch])

    const data = employee.record.map(el => {
        return {
            id: el.id,
            firstname: el.firstname,
            lastname: el.lastname,
            status: el.status,
            department: el.name || "Not assigned",
            position: el.post || "Not assigned",
        }
    })


    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Header>Employee Management</Header>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Button size="tiny" color="blue" onClick={() => dispatch(toggleBatchUpdating(employee.isBatchUpdating))}>Batch Updating</Button>
                        <Button size="tiny" color="red" onClick={() => dispatch(toggleBatchDeleting(employee.isBatchDeleting))}>Batch Delete</Button>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button size="tiny" primary onClick={() => dispatch(toggleFiltering(employee.isFiltering))}>Filter</Button>
                        <Button size="tiny" secondary onClick={() => dispatch(toggleCreating(employee.isCreating))}>Create Employee</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled size="small">
                            <TableHeader
                                header={['employee ID', 'Firstname', 'Lastname', 'Status', 'Department', 'Position', 'Actions']}
                                checkFunc={(e) => dispatch(selectAllEmployee(e, employee.record))}
                            />
                            <TableBody
                                data={data}
                                primaryAction={"Details"}
                                primaryFunc={(e) => dispatch(toggleViewing(e.target.value))}
                                primaryActionColor={"blue"}
                                secondaryAction={"Update"}
                                secondaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                secondaryActionColor={"teal"}
                                tertiaryAction={"Delete"}
                                tertiaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                tertiaryActionColor={"red"}
                                checkedRows={employee.selectedRecord}
                                checkFunc={(e) => dispatch(selectEmployee(e))}
                            />
                            <TableFooter
                                colSpan={8}
                                pageStart={employee.currentPageStart}
                                pageEnd={employee.currentPageEnd}
                                pageTotal={employee.pageCount}
                                onNext={() => dispatch(fetchNextEmployeePage(employee.currentPage, employee.currentLimit, employee.pageCount, employee.queryText, employee.queryPosition, employee.queryDepartment, employee.queryJoinFrom, employee.queryJoinTo, employee.queryStatus))}
                                onPrevious={() => dispatch(fetchPreviousEmployeePage(employee.currentPage, employee.currentLimit, employee.queryText, employee.queryPosition, employee.queryDepartment, employee.queryJoinFrom, employee.queryJoinTo, employee.queryStatus))}
                                entriesNum={employee.currentLimit}
                                entriesFunc={(e, result) => dispatch(fetchEmployeeByEntries(employee.currentPage, result.value, employee.queryText, employee.queryPosition, employee.queryDepartment, employee.queryJoinFrom, employee.queryJoinTo, employee.queryStatus))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                <Config
                    isConfigOpen={employee.isViewing}
                    configType={"Employee Details"}
                    configPrimaryAction={"Cancel"}
                    configPrimaryFunc={() => dispatch(toggleViewing())}
                >
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
                    <p><strong>Current Days of Annual Leave Left:</strong> {employee.employeeAL}</p>
                </Config>
                <Config
                    isConfigOpen={employee.isUpdating}
                    configType={"Update Employee Information"}
                    configPrimaryAction={"Cancel"}
                    configPrimaryFunc={() => dispatch(toggleUpdating())}
                    configSecondaryAction={"Update"}
                    configSecondaryColor={"green"}
                    configSecondaryFunc={() => dispatch(confirmEmployeeUpdate(employee.employeeId, employee.employeeDepartmentId, employee.employeePositionId, employee.employeeFirstname, employee.employeeLastname, employee.employeeAddress, employee.employeeNumber, employee.employeeContactPerson, employee.employeeNumber, employee.employeeOnboardDate, employee.employeeStatus, employee.employeeOT, employee.employeeOTpay, employee.employeeSalary, employee.employeeStartHour, employee.employeeEndHour, employee.employeeRole, employee.employeeUsername, employee.employeePassword, employee.employeeAL))}
                >
                    <Form>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="id">Employee ID</label>
                                        <input id="id" value={employee.employeeId} disabled />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeFirstname">Firstname</label>
                                        <input id="employeeFirstname" name="employeeFirstname" value={employee.employeeFirstname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeLastname">Lastname</label>
                                        <input id="employeeLastname" name="employeeLastname" value={employee.employeeLastname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeePositionId">Position</label>
                                        <select value={employee.employeePositionId} id="employeePositionId" name="employeePositionId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                            <option value="">Unassigned</option>
                                            {employee.positions.map((el, i) =>
                                                <option value={el.id} key={i}>{el.post}</option>
                                            )}
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeDepartmentId">Department</label>
                                        <select value={employee.employeeDepartmentId} id="employeeDepartmentId" name="employeeDepartmentId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                            <option value="">Unassigned</option>
                                            {employee.departments.map((el, i) =>
                                                <option value={el.id} key={i}>{el.name}</option>
                                            )}
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeStartHour">Working Hour From</label>
                                        <input value={employee.employeeStartHour} type="time" step="1" id="employeeStartHour" name="employeeStartHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeEndHour">Ending</label>
                                        <input value={employee.employeeEndHour} type="time" step="1" id="employeeEndHour" name="employeeEndHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeRole">Role</label>
                                        <select value={employee.employeeRole} id="employeeRole" name="employeeRole" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                            <option value="employee">Employee</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="1">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeAddress">Address</label>
                                        <input id="employeeAddress" name="employeeAddress" value={employee.employeeAddress} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="1">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeNumber">Phone Number</label>
                                        <input id="employeeNumber" name="employeeNumber" value={employee.employeeNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeContactPerson">Emergency Contact Person</label>
                                        <input id="employeeContactPerson" name="employeeContactPerson" value={employee.employeeContactPerson} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeContactNumber">Emergency Contact Number</label>
                                        <input id="employeeContactNumber" name="employeeContactNumber" value={employee.employeeContactNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeSalary">Monthly Salary</label>
                                        <input id="employeeSalary" name="employeeSalary" value={employee.employeeSalary} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeOT">Entitled to Overtime Pay?</label>
                                        <input id="employeeOT" name="employeeOT" type="checkbox" checked={employee.employeeOT} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeOTpay">Overtime Hourly Pay </label>
                                        <input id="employeeOTpay" name="employeeOTpay" value={employee.employeeOTpay} onChange={(e) => dispatch(updateSpecificEmployee(e))} disabled={!employee.employeeOT} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeAL">Annual Leave Count</label>
                                        <input id="employeeAL" name="employeeAL" type="number" value={employee.employeeAL} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeUsername">Username</label>
                                        <input id="employeeUsername" name="employeeUsername" value={employee.employeeUsername} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeePassword">Change Password</label>
                                        <input id="employeePassword" name="employeePassword" type="password" value={employee.employeePassword} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Config>
                <Config
                    isConfigOpen={employee.isDeleting}
                    configType={"Delete Employee Record"}
                    configPrimaryAction={"Cancel"}
                    configPrimaryFunc={() => dispatch(toggleDeleting())}
                    configSecondaryAction={"Delete"}
                    configSecondaryColor={"red"}
                    configSecondaryFunc={() => dispatch(deleteEmployee(employee.employeeId))}
                >
                    <p><strong>Are you sure to delete the following employee record?</strong></p>
                    <p><strong>ID: </strong>{employee.employeeId}</p>
                    <p><strong>Firstname: </strong>{employee.employeeFirstname}</p>
                    <p><strong>Lastname:</strong> {employee.employeeLastname}</p>
                    <p><strong>Position:</strong> {employee.employeePosition ? employee.employeePosition : "Not specified"}</p>
                    <p><strong>Department: </strong>{employee.employeeDepartment ? employee.employeeDepartment : "Not specified"}</p>
                </Config>

                <Config
                    isConfigOpen={employee.isCreating}
                    configType={"Create Employee"}
                    configPrimaryAction={"Cancel"}
                    configPrimaryFunc={() => dispatch(toggleCreating(employee.isCreating))}
                    configSecondaryAction={"Create"}
                    configSecondaryColor={"green"}
                    configSecondaryFunc={() => dispatch(createEmployee(employee.employeeUsername, employee.employeePassword, employee.employeeRole, employee.employeeFirstname, employee.employeeLastname, employee.employeeAddress, employee.employeeNumber, employee.employeeContactPerson, employee.employeeContactNumber, employee.employeeOnboardDate, employee.employeeSalary, employee.employeeStartHour, employee.employeeEndHour, employee.employeePositionId, employee.employeeDepartmentId, employee.employeeOTpay, employee.employeeOT))}
                >
                    <Form>
                        <Grid>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeFirstname">Firstname</label>
                                        <input id="employeeFirstname" name="employeeFirstname" value={employee.employeeFirstname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeLastname">Lastname</label>
                                        <input id="employeeLastname" name="employeeLastname" value={employee.employeeLastname} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeePositionId">Position</label>
                                        <select value={employee.employeePositionId} id="employeePositionId" name="employeePositionId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                            <option value="">Unassigned</option>
                                            {employee.positions.map((el, i) =>
                                                <option value={el.id} key={i}>{el.post}</option>
                                            )}
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeDepartmentId">Department</label>
                                        <select value={employee.employeeDepartmentId} id="employeeDepartmentId" name="employeeDepartmentId" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                            <option value="">Unassigned</option>
                                            {employee.departments.map((el, i) =>
                                                <option value={el.id} key={i}>{el.name}</option>
                                            )}
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeStartHour">Starting</label>
                                        <input value={employee.employeeStartHour} type="time" step="1" id="employeeStartHour" name="employeeStartHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeEndHour">Ending</label>
                                        <input value={employee.employeeEndHour} type="time" step="1" id="employeeEndHour" name="employeeEndHour" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeRole">Role</label>
                                        <select value={employee.employeeRole} id="employeeRole" name="employeeRole" onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                            <option value="employee">Employee</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeOnboardDate">Onboard Date</label>
                                        <input type="date" id="employeeOnboardDate" name="employeeOnboardDate" value={employee.employeeOnboardDate} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeAddress">Address</label>
                                        <input id="employeeAddress" name="employeeAddress" value={employee.employeeAddress} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeNumber">Phone Number</label>
                                        <input id="employeeNumber" name="employeeNumber" value={employee.employeeNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeContactPerson">Emergency Contact Person</label>
                                        <input id="employeeContactPerson" name="employeeContactPerson" value={employee.employeeContactPerson} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeContactNumber">Emergency Contact Number</label>
                                        <input id="employeeContactNumber" name="employeeContactNumber" value={employee.employeeContactNumber} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeSalary">Monthly Salary</label>
                                        <input id="employeeSalary" name="employeeSalary" value={employee.employeeSalary} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeOT">Entitled to Overtime Pay?</label>
                                        <input id="employeeOT" name="employeeOT" type="checkbox" value={employee.employeeOT} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeOTpay">Overtime Hourly Pay </label>
                                        <input id="employeeOTpay" name="employeeOTpay" value={employee.employeeOTpay} onChange={(e) => dispatch(updateSpecificEmployee(e))} disabled={!employee.employeeOT} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeeUsername">Username:</label>
                                        <input id="employeeUsername" name="employeeUsername" value={employee.employeeUsername} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label htmlFor="employeePassword">Password:</label>
                                        <input id="employeePassword" name="employeePassword" value={employee.employeePassword} type="password" onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Config>
            </Grid >
            <Config
                isConfigOpen={employee.isFiltering}
                configType={"Search And Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(employee.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetEmployeeQuery(employee.currentPage, employee.currentLimit))}
                configTertiaryAction={"Search"}
                configTertiaryColor={'green'}
                configTertiaryFunc={() => dispatch(fetchEmployeeByQuery(employee.queryText, employee.queryPosition, employee.queryDepartment, employee.queryJoinFrom, employee.queryJoinTo, employee.queryStatus))}
            >
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Contains</label>
                                    <input id="queryText" name="queryText" value={employee.queryText} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryPosition">Position</label>
                                    <select id="queryPosition" name="queryPosition" value={employee.queryPosition} onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                        <option value="" hidden>Position</option>
                                        {employee.positions.map((el, i) =>
                                            <option key={i} value={el.id}>{el.post}</option>
                                        )}
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDepartment">Department</label>
                                    <select id="queryDepartment" name="queryDepartment" value={employee.queryDepartment} onChange={(e) => dispatch(updateSpecificEmployee(e))} >
                                        <option value="" hidden>Department</option>
                                        {employee.departments.map((el, i) =>
                                            <option key={i} value={el.id}>{el.name}</option>
                                        )}
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryJoinFrom">Join From</label>
                                    <input type="date" id="queryJoinFrom" name="queryJoinFrom" value={employee.queryJoinFrom} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryJoinTo">To</label>
                                    <input type="date" id="queryJoinTo" name="queryJoinTo" value={employee.queryJoinTo} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="1">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryStatus">Status</label>
                                    <select id="queryStatus" name="queryStatus" value={employee.queryStatus} onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                        <option value="" hidden>Status</option>
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="temporarily_unavailable">Temporarily Unavailable</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={employee.isBatchUpdating}
                configType={"Batch Update Employee Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(employee.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(batchUpdateEmployee(employee.selectedRecord, employee.batchUpdateStartHour, employee.batchUpdateEndHour, employee.batchUpdateStatus, employee.batchUpdateRole, employee.batchUpdateOTentitlement, employee.batchUpdateOTHourlyPay, employee.batchUpdateMonthlySalary))}
            >
                <Form>
                    <Grid>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateStartHour">Working Hour (From)</label>
                                    <input type="time" step="1" id="batchUpdateStartHour" name="batchUpdateStartHour" value={employee.batchUpdateStatus} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateEndHour">Working Hour (To)</label>
                                    <input type="time" step="1" id="batchUpdateEndHour" name="batchUpdateEndHour" value={employee.batchUpdateEndHour} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateStatus">Status</label>
                                    <select id="batchUpdateStatus" name="batchUpdateStatus" value={employee.batchUpdateStatus} onChange={(e) => dispatch(updateSpecificEmployee(e))}>
                                        <option value="" hidden>Status</option>
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="temporarily_unavailable">Temporarily Unavailable</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateRole">Role</label>
                                    <select id="batchUpdateRole" name="batchUpdateRole">
                                        <option value="" hidden>Role</option>
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateOTentitlement">OT Entitlement</label>
                                    <input type="checkbox" id="batchUpdateOTentitlement" name="batchUpdateOTentitlement" value={employee.batchUpdateOTentitlement} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateOTHourlyPay">OT Hourly Pay</label>
                                    <input id="batchUpdateOTHourlyPay" name="batchUpdateOTHourlyPay" value={employee.batchUpdateOTHourlyPay} disabled={!employee.batchUpdateOTentitlement} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="batchUpdateMonthlySalary">Monthly Salary</label>
                                    <input type="number" id="batchUpdateMonthlySalary" name="batchUpdateMonthlySalary" value={employee.batchUpdateMonthlySalary} onChange={(e) => dispatch(updateSpecificEmployee(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={employee.isBatchDeleting}
                configType={"Batch Delete Employee Records"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(employee.isBatchDeleting))}
                configSecondaryAction={"Batch Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(batchDeleteEmployee(employee.selectedRecord))}
            >
                {employee.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID: {el}</strong></p>
                )}
            </Config>
        </div>
    )
}

export default Employee