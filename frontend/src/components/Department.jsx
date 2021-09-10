import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmDepartmentUpdate, fetchDepartment, updateDepartment, handleDelete, gotoNextDepartmentPage, gotoPreviousDepartmentPage, toggleCreating, handleCreate, fetchDepartmentsByEntries, toggleFiltering, resetDepartmentQuery, fetchDepartmentByQuery, toggleUpdating, toggleDeleting, handleSelect, handleSelectAll, toggleBatchDeleting, handleBatchDelete } from '../actions/department'
import { Table, Grid, Form, Button, Header, Input } from 'semantic-ui-react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableFooter from './TableFooter'
import Config from './Config'
import '../css/main.css'

function Department() {
    const dispatch = useDispatch()
    const department = useSelector(state => state.department)

    useEffect(() => {
        dispatch(fetchDepartment(department.currentPage))
    }, [department.currentPage, dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header>Department Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="red" disabled={!department.selectedRecord.length} onClick={() => dispatch(toggleBatchDeleting(department.isBatchDeleting))}>Batch Delete</Button>
                        <Button size="tiny" color="teal" primary onClick={() => dispatch(toggleFiltering(department.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(department.isCreating))}>Create Department</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled size="small">
                            <TableHeader
                                header={['id', 'Department Name', 'Department Description', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, department.record))}
                            />
                            <TableBody
                                data={department.record}
                                primaryAction={"Update"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                primaryActionColor={"blue"}
                                secondaryAction={"Delete"}
                                secondaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                secondaryActionColor={"red"}
                                cellSize={["1", "3", "8"]}
                                checkedRows={department.selectedRecord}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                            />
                            <TableFooter
                                colSpan={5}
                                pageTotal={department.pageLength}
                                pageStart={department.currentPageStart}
                                pageEnd={department.currentPageEnd}
                                onNext={() => dispatch(gotoNextDepartmentPage(department.currentPage, department.currentLimit, department.pageLength, department.queryDepartmentName))}
                                onPrevious={() => dispatch(gotoPreviousDepartmentPage(department.currentPage, department.currentLimit, department.queryDepartmentName))}
                                entriesNum={department.currentLimit}
                                entriesFunc={(e, result) => dispatch(fetchDepartmentsByEntries(result.value, department.currentPage, department.queryDepartmentName))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
            <Config
                isConfigOpen={department.isUpdating}
                configType={"Update Department"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryFunc={() => dispatch(confirmDepartmentUpdate(department.departmentId, department.departmentName, department.departmentDesc))}
                configSecondaryColor={"blue"}
            >
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
                        <input id="departmentDescription" name="departmentDescription" value={department.departmentDesc} onChange={(e) => dispatch(updateDepartment(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={department.isDeleting}
                configType={"Delete Department"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={() => dispatch(handleDelete(department.departmentId, department.currentPage, department.currentLimit, department.queryDepartmentName))}
                configSecondaryColor={'red'}
            >
                <p><strong>Are you sure to delete this department record?</strong></p>
                <p><strong>Department id:</strong> {department.departmentId}</p>
                <p><strong>Department Name:</strong> {department.departmentName}</p>
                <p><strong>Department Description:</strong> {department.departmentDesc}</p>
            </Config>
            <Config
                isConfigOpen={department.isCreating}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(department.isCreating))}
                configType={"Create Department"}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(handleCreate(department.createDepartmentName, department.createDepartmentDesc))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="createDepartmentName">Department Name</label>
                        <input id="createDepartmentName" name="createDepartmentName" value={department.createDepartmentName} onChange={(e) => dispatch(updateDepartment(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createDepartmentDesc">Department Description</label>
                        <input id="createDepartmentDesc" name="createDepartmentDesc" value={department.createDepartmentDesc} onChange={(e) => dispatch(updateDepartment(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={department.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(department.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryFunc={() => dispatch(resetDepartmentQuery(department.currentPage, department.currentLimit))}
                configSecondaryColor={"grey"}
                configTertiaryAction={"Search"}
                configTertiaryFunc={() => dispatch(fetchDepartmentByQuery(department.queryDepartmentName))}
                configTertiaryColor={"green"}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="queryDepartmentName">Contains</label>
                        <input placeholder="Department name, description ..." id="queryDepartmentName" name="queryDepartmentName" value={department.queryDepartmentName} onChange={(e) => dispatch(updateDepartment(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={department.isBatchDeleting}
                configType={"Batch Delete Department Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(department.isBatchDeleting))}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(handleBatchDelete(department.selectedRecord, department.currentPage, department.currentLimit, department.queryDepartmentName))}
            >
                <p><strong>Are you sure to delete the following department records?</strong></p>
                {department.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID:</strong> {el}</p>
                )}
            </Config>
        </div>
    )
}

export default Department