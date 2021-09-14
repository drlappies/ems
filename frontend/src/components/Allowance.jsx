import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllowance, updateAllowance, confirmAllowanceUpdate, deleteAllowance, addToEntitleList, removeFromEntitleList, gotoNextAllowancePage, gotoPreviousAllowancePage, createAllowance, fetchAllowanceByQuery, handleEntriesChange, toggleFiltering, resetAllowanceQuery, toggleCreating, toggleUpdating, toggleDeleting, handleSelect, handleSelectAll, toggleBatchUpdating, toggleBatchDeleting, batchUpdateAllowance, batchDeleteAllowance, toggleManaging } from '../actions/allowance';
import { Form, Grid, Table, Button, List, Header } from 'semantic-ui-react'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import Config from './Config';
import '../css/main.css'

function Allowance() {
    const dispatch = useDispatch()
    const allowance = useSelector(state => state.allowance)

    useEffect(() => {
        dispatch(fetchAllowance())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row >
                    <Grid.Column>
                        <Header>Employee Allowance Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="blue" onClick={() => dispatch(toggleBatchUpdating(allowance.isBatchUpdating))} disabled={!allowance.selectedRecord.length}>Batch Update</Button>
                        <Button size="tiny" color="red" onClick={() => dispatch(toggleBatchDeleting(allowance.isBatchDeleting))} disabled={!allowance.selectedRecord.length}>Batch Delete</Button>
                        <Button size="tiny" color="teal" onClick={() => dispatch(toggleFiltering(allowance.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(allowance.isCreating))}>Create Allowance</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled compact selectable size="small">
                            <TableHeader
                                header={['id', 'Allowance Name', 'Description', 'Amount', 'Status', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, allowance.record))}
                            />
                            <TableBody
                                data={allowance.record}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                tertiaryAction={"Delete"}
                                tertiaryActionColor={"red"}
                                tertiaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                secondaryAction={"Manage"}
                                secondaryFunc={(e) => dispatch(toggleManaging(e.target.value))}
                                secondaryActionColor={'orange'}
                                checkedRows={allowance.selectedRecord}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                            />
                            <TableFooter
                                colSpan={7}
                                pageTotal={allowance.pageLength}
                                pageStart={allowance.currentPageStart}
                                pageEnd={allowance.currentPageEnd}
                                onNext={() => dispatch(gotoNextAllowancePage(allowance.currentPage, allowance.pageLength, allowance.currentLimit, allowance.queryText, allowance.queryAmountFrom, allowance.queryAmountTo, allowance.queryStatus, allowance.queryIsAttendRequired, allowance.queryRequiredAttendRateFrom, allowance.queryRequiredAttendRateTo))}
                                onPrevious={() => dispatch(gotoPreviousAllowancePage(allowance.currentPage, allowance.currentLimit, allowance.queryText, allowance.queryAmountFrom, allowance.queryAmountTo, allowance.queryStatus, allowance.queryIsAttendRequired, allowance.queryRequiredAttendRateFrom, allowance.queryRequiredAttendRateTo))}
                                entriesNum={allowance.currentLimit}
                                entriesFunc={(e, result) => dispatch(handleEntriesChange(result.value, allowance.currentPage, allowance.queryText, allowance.queryAmountFrom, allowance.queryAmountTo, allowance.queryStatus, allowance.queryIsAttendRequired, allowance.queryRequiredAttendRateFrom, allowance.queryRequiredAttendRateTo))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={allowance.isUpdating}
                configType={"Update Allowance"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(confirmAllowanceUpdate(allowance.allowanceId, allowance.allowanceName, allowance.allowanceDescription, allowance.allowanceAmount, allowance.allowanceStatus, allowance.allowanceMinimumAttendanceRequired, allowance.allowanceRequiredAttendanceRate))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="allowaneID">ID</label>
                        <input id="allowanceId" name="allowanceId" value={allowance.allowanceId} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="allowanceName">Name</label>
                        <input id="allowanceName" name="allowanceName" value={allowance.allowanceName} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="allowanceDescription">Description</label>
                        <input id="allowanceDescription" name="allowanceDescription" value={allowance.allowanceDescription} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="allowanceAmount">Amount</label>
                        <input type="number" id="allowanceAmount" name="allowanceAmount" value={allowance.allowanceAmount} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="allowanceStatus">Status</label>
                        <select id="allowanceStatus" name="allowanceStatus" value={allowance.allowanceStatus} onChange={(e) => dispatch(updateAllowance(e))}>
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="allowanceMinimumAttendanceRequired">Minimum Attendance Required</label>
                        <input type="checkbox" id="allowanceMinimumAttendanceRequired" name="allowanceMinimumAttendanceRequired" checked={allowance.allowanceMinimumAttendanceRequired} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="allowanceRequiredAttendanceRate">Allowance Required Attendance Rate</label>
                        <input type="number" id="allowanceRequiredAttendanceRate" name="allowanceRequiredAttendanceRate" value={allowance.allowanceRequiredAttendanceRate} disabled={!allowance.allowanceMinimumAttendanceRequired} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={allowance.isDeleting}
                configType={"Delete Allowance"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={(e) => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={() => dispatch(deleteAllowance(allowance.allowanceId, allowance.currentPage, allowance.currentLimit, allowance.queryText, allowance.queryAmountFrom, allowance.queryAmountTo, allowance.queryStatus, allowance.queryIsAttendRequired, allowance.queryRequiredAttendRateFrom, allowance.queryRequiredAttendRateTo))}
                configSecondaryColor={'red'}
            >
                <p><strong>Are you sure to delete the following allowance record?</strong></p>
                <p><strong>ID:</strong> {allowance.allowanceId}</p>
                <p><strong>Name:</strong> {allowance.allowanceName}</p>
                <p><strong>Description:</strong> {allowance.allowanceDescription}</p>
                <p><strong>Amount:</strong> {allowance.allowanceAmount}</p>
            </Config>
            <Config
                isConfigOpen={allowance.isManaging}
                configSize={"large"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleManaging())}
                configType={"Manage Employee Entitlement"}
            >
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <List celled>
                                <Header>Entitled Employees:</Header>
                                {allowance.entitledEmployee.map((el, i) =>
                                    <List.Item>
                                        <List.Content floated="right">
                                            <Button color="red" size="tiny" onClick={() => dispatch(removeFromEntitleList(el.id, allowance.allowanceId, el.firstname, el.lastname))}>Remove</Button>
                                        </List.Content>
                                        <List.Content key={i}>
                                            <List.Header>
                                                ID: {el.id}
                                            </List.Header>
                                            {el.firstname} {el.lastname}
                                        </List.Content>
                                    </List.Item>
                                )}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List celled>
                                <Header>Employees:</Header>
                                {allowance.notEntitledEmployee.map((el, i) =>
                                    <List.Item key={i}>
                                        <List.Content floated="right">
                                            <Button color="green" size="tiny" onClick={() => dispatch(addToEntitleList(el.id, allowance.allowanceId, el.firstname, el.lastname))}>Add</Button>
                                        </List.Content>
                                        <List.Content>
                                            <List.Header>
                                                ID: {el.id}
                                            </List.Header>
                                            {el.firstname} {el.lastname}
                                        </List.Content>
                                    </List.Item>
                                )}
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Config>
            <Config
                isConfigOpen={allowance.isCreating}
                configType={"Create Allowance"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(allowance.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(createAllowance(allowance.createAllowanceName, allowance.createAllowanceDescription, allowance.createAllowanceAmount, allowance.rma, allowance.rate))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="createAllowanceName">Name</label>
                        <input id="createAllowanceName" name="createAllowanceName" value={allowance.createAllowanceName} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createAllowanceDescription">Description</label>
                        <input id="createAllowanceDescription" name="createAllowanceDescription" value={allowance.createAllowanceDescription} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createAllowanceAmount">Amount</label>
                        <input type="number" id="createAllowanceAmount" name="createAllowanceAmount" value={allowance.createAllowanceAmount} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="rma">Require minimum attendance?</label>
                        <input type="checkbox" id="rma" name="rma" value={allowance.rma} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="rate">Required minimum attendance rate:</label>
                        <input type="number" min="0" max="100" id="rate" name="rate" value={allowance.rate} onChange={(e) => dispatch(updateAllowance(e))} disabled={!allowance.rma} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={allowance.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(allowance.isFiltering))}
                configSecondaryAction={"Reset"}
                configSecondaryFunc={() => dispatch(resetAllowanceQuery())}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configSecondaryColor={"grey"}
                configTertiaryFunc={() => dispatch(fetchAllowanceByQuery(allowance.currentPage, allowance.currentLimit, allowance.queryText, allowance.queryAmountFrom, allowance.queryAmountTo, allowance.queryStatus, allowance.queryIsAttendRequired, allowance.queryRequiredAttendRateFrom, allowance.queryRequiredAttendRateTo))}
            >
                <Form>
                    <Grid>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Keywords</label>
                                    <input placeholder="Allowance name, description ..." id="queryText" name="queryText" value={allowance.queryText} onChange={(e) => dispatch(updateAllowance(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryStatus">Status</label>
                                    <select id="queryStatus" name="queryStatus" value={allowance.queryStatus} onChange={(e) => dispatch(updateAllowance(e))}>
                                        <option value="" hidden>Status</option>
                                        <option value="active">Active</option>
                                        <option value="disabled">Disabled</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountFrom">Allowance Amount From</label>
                                    <input type="number" id="queryAmountFrom" name="queryAmountFrom" value={allowance.queryAmountFrom} onChange={(e) => dispatch(updateAllowance(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountTo">Allowance Amount To</label>
                                    <input type="number" id="queryAmountTo" name="queryAmountTo" value={allowance.queryAmountTo} onChange={(e) => dispatch(updateAllowance(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="3">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryIsAttendRequired">Is Minimum Attendance Required?</label>
                                    <select type="queryIsAttendRequired" name="queryIsAttendRequired" value={allowance.queryIsAttendRequired} onChange={(e) => dispatch(updateAllowance(e))}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryRequiredAttendRateFrom">Required Attendance Rate From</label>
                                    <input type="number" id="queryRequiredAttendRateFrom" name="queryRequiredAttendRateFrom" value={allowance.queryRequiredAttendRateFrom} onChange={(e) => dispatch(updateAllowance(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryRequiredAttendRateTo">Required Attendance Rate To</label>
                                    <input type="number" id="queryRequiredAttendRateTo" name="queryRequiredAttendRateTo" value={allowance.queryRequiredAttendRateTo} onChange={(e) => dispatch(updateAllowance(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={allowance.isBatchUpdating}
                configType={"Batch Update Employee Allowance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(allowance.isBatchUpdating))}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(batchUpdateAllowance(allowance.selectedRecord, allowance.updateAllowanceAmount, allowance.updateAllowanceStatus, allowance.updateAllowanceMinimumAttendanceRequired, allowance.updateAllowanceRequiredAttendanceRate))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="updateAllowanceAmount">Amount</label>
                        <input type="number" id="updateAllowanceAmount" name="updateAllowanceAmount" value={allowance.updateAllowanceAmount} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateAllowanceStatus">Status</label>
                        <select id="updateAllowanceStatus" name="updateAllowanceStatus" value={allowance.updateAllowanceStatus} onChange={(e) => dispatch(updateAllowance(e))}>
                            <option value="" hidden>Status</option>
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateAllowanceMinimumAttendanceRequired">Minimum Attendance Required</label>
                        <select id="updateAllowanceMinimumAttendanceRequired" name="updateAllowanceMinimumAttendanceRequired" checked={allowance.updateAllowanceMinimumAttendanceRequired} onChange={(e) => dispatch(updateAllowance(e))}>
                            <option value="" hidden>Required?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateAllowanceRequiredAttendanceRate">Allowance Required Attendance Rate</label>
                        <input type="number" id="updateAllowanceRequiredAttendanceRate" name="updateAllowanceRequiredAttendanceRate" value={allowance.updateAllowanceRequiredAttendanceRate} disabled={!allowance.updateAllowanceMinimumAttendanceRequired} onChange={(e) => dispatch(updateAllowance(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={allowance.isBatchDeleting}
                configType={"Batch Delete Allowance Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(allowance.isBatchDeleting))}
                configSecondaryAction={"Batch Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(batchDeleteAllowance(allowance.selectedRecord, allowance.currentPage, allowance.currentLimit, allowance.queryText, allowance.queryAmountFrom, allowance.queryAmountTo, allowance.queryStatus, allowance.queryIsAttendRequired, allowance.queryRequiredAttendRateFrom, allowance.queryRequiredAttendRateTo))}
            >
                <p><strong>Are you sure to delete the following allowance records?</strong></p>
                {allowance.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID: </strong>{el}</p>
                )}
            </Config>
        </div>
    )
}

export default Allowance