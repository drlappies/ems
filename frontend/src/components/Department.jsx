import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmDepartmentUpdate, fetchDepartment, fetchSpecificDepartment, updateDepartment, deleteDepartment, resetDepartment, gotoNextDepartmentPage, gotoPreviousDepartmentPage, createDepartment } from '../actions/department'
import { Table, Grid, Form, Button, Menu, Input } from 'semantic-ui-react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableFooter from './TableFooter'
import Config from './Config'

function Department() {
    const dispatch = useDispatch()
    const department = useSelector(state => state.department)
    const [state, setState] = useState({
        isUpdating: false,
        isDeleting: false,
        isCreating: false
    })

    const header = ['id', 'Department Name', 'Department Description', 'Actions']

    useEffect(() => {
        dispatch(fetchDepartment(department.currentPage))
    }, [department.currentPage, dispatch])

    const toggleUpdating = (department) => {
        if (department) dispatch(fetchSpecificDepartment(department.id))
        if (!department) dispatch(resetDepartment())
        setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    const toggleDeleting = (department) => {
        if (department) dispatch(fetchSpecificDepartment(department.id))
        if (!department) dispatch(resetDepartment())
        setState(prevState => {
            return {
                ...prevState,
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const toggleCreating = () => {
        dispatch(resetDepartment())
        setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
    }

    const handleUpdate = () => {
        dispatch(confirmDepartmentUpdate(department.departmentId, department.departmentName, department.departmentDescription))
        toggleUpdating()
    }

    const handleDelete = () => {
        dispatch(deleteDepartment(department.departmentId))
        toggleDeleting()
    }

    const handleCreate = () => {
        dispatch(createDepartment(department.departmentName, department.departmentDescription))
        toggleCreating()
    }

    const handleSearch = () => {
        dispatch(fetchDepartment(department.currentPage, department.departmentName, department.departmentDescription))
    }

    const gotoNextPage = () => {
        dispatch(gotoNextDepartmentPage(department.currentPage, department.pageLength))
    }

    const gotoPreviousPage = () => {
        dispatch(gotoPreviousDepartmentPage(department.currentPage))
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Menu>
                        <Menu.Item>
                            <label htmlFor="departmentName">Name</label>
                        </Menu.Item>
                        <Menu.Item>
                            <Input id="departmentName" name="departmentName" value={department.departmentName} onChange={(e) => dispatch(updateDepartment(e))} />
                        </Menu.Item>
                        <Menu.Item>
                            <label htmlFor="departmentDescription">Description</label>
                        </Menu.Item>
                        <Menu.Item>
                            <Input id="departmentDescription" name="departmentDescription" value={department.departmentDescription} onChange={(e) => dispatch(updateDepartment(e))} />
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Button onClick={() => handleSearch()}>Search</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="right">
                <Grid.Column>
                    <Button color="blue" onClick={() => toggleCreating()}>Create Department</Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table celled>
                        <TableHeader
                            header={header}
                        />
                        <TableBody
                            data={department.record}
                            primaryAction={"Update"}
                            primaryFunc={toggleUpdating}
                            primaryActionColor={"blue"}
                            secondaryAction={"Delete"}
                            secondaryFunc={toggleDeleting}
                            secondaryActionColor={"red"}
                            cellSize={["1", "3", "8"]}
                        />
                        <TableFooter
                            colSpan={4}
                            pageTotal={department.pageLength}
                            pageStart={department.currentPageStart}
                            pageEnd={department.currentPageEnd}
                            onNext={gotoNextPage}
                            onPrevious={gotoPreviousPage}
                        />
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Config
                isConfigOpen={state.isUpdating}
                configType={"Update Department"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdating}
                configSecondaryAction={"Update"}
                configSecondaryColor={"blue"}
                configSecondaryFunc={handleUpdate}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="id">id</label>
                            <input id="id" name="id" value={department.departmentId} disabled />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="departmentName">Department Name</label>
                            <input id="departmentName" name="departmentName" value={department.departmentName} onChange={(e) => dispatch(updateDepartment(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="departmentDescription">Department Name</label>
                            <input id="departmentDescription" name="departmentDescription" value={department.departmentDescription} onChange={(e) => dispatch(updateDepartment(e))} />
                        </Form.Field>
                    </Form>
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Department"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={handleDelete}
                configSecondaryColor={'red'}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete this department record?</strong></p>
                        <p><strong>Department id:</strong> {department.departmentId}</p>
                        <p><strong>Department Name:</strong> {department.departmentName}</p>
                        <p><strong>Department Description:</strong> {department.departmentDescription}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configType={"Create Department"}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleCreate}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="departmentName">Department Name: </label>
                            <input id="departmentName" name="departmentName" value={department.departmentName} onChange={(e) => dispatch(updateDepartment(e))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="departmentDescription">Department Description:</label>
                            <input id="departmentDescription" name="departmentDescription" value={department.departmentDescription} onChange={(e) => dispatch(updateDepartment(e))} />
                        </Form.Field>
                    </Form>
                }
            />
        </Grid >
    )
}

export default Department