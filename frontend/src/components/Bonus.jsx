import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBonus, updateBonus, confirmBonusUpdate, deleteBonus, createBonus, fetchNextBonusPage, fetchPreviousBonusPage, fetchBonusByEntries, toggleCreating, toggleFiltering, fetchBonusByFilter, resetBonusFilter, toggleUpdating, handleSelect, handleSelectAll, toggleBatchUpdating, batchUpdateBonus, toggleBatchDeleting, batchDeleteBonus, toggleDeleting } from '../actions/bonus';
import { Grid, Table, Form, Header, Button } from 'semantic-ui-react'
import TableBody from './TableBody';
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import Config from './Config'
import '../css/main.css'

function Bonus() {
    const dispatch = useDispatch();
    const bonus = useSelector(state => state.bonus)

    useEffect(() => {
        dispatch(fetchBonus())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row >
                    <Grid.Column textAlign="left">
                        <Header>Employee Bonus Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="blue" disabled={bonus.selectedRecord.length < 2} onClick={() => dispatch(toggleBatchUpdating(bonus.isBatchUpdating))}>Batch Update</Button>
                        <Button size="tiny" color="red" disabled={bonus.selectedRecord.length < 2} onClick={() => dispatch(toggleBatchDeleting(bonus.isBatchDeleting))}>Batch Delete</Button>
                        <Button size="tiny" color="teal" onClick={() => dispatch(toggleFiltering(bonus.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(bonus.isCreating))}>Create Bonus</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled compact selectable size="small">
                            <TableHeader
                                header={['id', 'Employee Id', 'Firstname', 'Lastname', 'Date', 'Reason', 'Amount', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, bonus.record))}
                            />
                            <TableBody
                                data={bonus.record}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                checkedRows={bonus.selectedRecord}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                            />
                            <TableFooter
                                colSpan={9}
                                pageTotal={bonus.pageLength}
                                pageStart={bonus.currentPageStart}
                                pageEnd={bonus.currentPageEnd}
                                onNext={() => dispatch(fetchNextBonusPage(bonus.currentPage, bonus.currentLimit, bonus.pageLength, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
                                onPrevious={() => dispatch(fetchPreviousBonusPage(bonus.currentPage, bonus.currentLimit, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
                                entriesNum={bonus.currentLimit}
                                entriesFunc={(e, result) => dispatch(fetchBonusByEntries(bonus.currentPage, result.value, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
            <Config
                isConfigOpen={bonus.isUpdating}
                configType={"Update Bonus Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryColor={"green"}
                configSecondaryAction={"Update"}
                configSecondaryFunc={() => dispatch(confirmBonusUpdate(bonus.bonusId, bonus.employeeId, bonus.reason, bonus.date, bonus.amount))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="bonusId">ID</label>
                        <input id="bonusId" name="bonusId" value={bonus.bonusId} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="employeeId">Recipient Employee</label>
                        <select id="employeeId" name="employeeId" defaultValue={bonus.employeeId} onChange={(e) => dispatch(updateBonus(e))}>
                            {bonus.employeeRecord.map((el, i) =>
                                <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="reason">Reason</label>
                        <input id="reason" name="reason" value={bonus.reason} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" name="amount" value={bonus.amount} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="date" defaultValue={bonus.date} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={bonus.isDeleting}
                configType={"Delete Bonus Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(deleteBonus(bonus.bonusId, bonus.currentPage, bonus.currentLimit, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
            >
                <p><strong>Are you sure to delete the following bonus record?</strong></p>
                <p><strong>ID:</strong> {bonus.bonusId}</p>
                <p><strong>Recipient Employee ID:</strong> {bonus.employeeId}</p>
                <p><strong>Recipient Employee:</strong> {bonus.firstname} {bonus.lastname}</p>
                <p><strong>Reason:</strong> {bonus.reason}</p>
                <p><strong>Amount:</strong> {bonus.amount}</p>
                <p><strong>Date: </strong> {bonus.date}</p>
            </Config>
            <Config
                isConfigOpen={bonus.isCreating}
                configType={"Create Bonus Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(bonus.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(createBonus(bonus.createEmployeeId, bonus.createBonusReason, bonus.createBonusAmount, bonus.createBonusDate, bonus.currentPage, bonus.currentLimit, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="createEmployeeId">Recipient Employee</label>
                        <select id="createEmployeeId" name="createEmployeeId" value={bonus.createEmployeeId} onChange={(e) => dispatch(updateBonus(e))}>
                            <option value="" hidden>Employee</option>
                            {bonus.employeeRecord.map((el, i) =>
                                <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createBonusReason">Reason</label>
                        <input id="createBonusReason" name="createBonusReason" value={bonus.createBonusReason} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createBonusAmount">Amount</label>
                        <input type="number" id="createBonusAmount" name="createBonusAmount" value={bonus.createBonusAmount} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="createBonusDate">Date</label>
                        <input type="date" id="createBonusDate" name="createBonusDate" defaultValue={bonus.createBonusDate} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={bonus.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configPrimaryFunc={() => dispatch(toggleFiltering(bonus.isFiltering))}
                configTertiaryFunc={() => dispatch(fetchBonusByFilter(bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo, bonus.queryEmployeeId))}
                configSecondaryFunc={() => dispatch(resetBonusFilter())}
            >
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Contains</label>
                                    <input id="queryText" name="queryText" value={bonus.queryText} onChange={(e) => dispatch(updateBonus(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryEmployeeId">Employee</label>
                                    <select id="queryEmployeeId" name="queryEmployeeId" value={bonus.queryEmployeeId} onChange={(e) => dispatch(updateBonus(e))}>
                                        <option value="" hidden>Employee</option>
                                        {bonus.employeeRecord.map((el, i) =>
                                            <option value={el.id} key={i}>ID: {el.id} {el.firstname} {el.lastname}</option>
                                        )}
                                    </select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDateFrom">Date From</label>
                                    <input type="date" id="queryDateFrom" name="queryDateFrom" value={bonus.queryDateFrom} onChange={(e) => dispatch(updateBonus(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryDateTo">Date To</label>
                                    <input type="date" id="queryDateTo" name="queryDateTo" value={bonus.queryDateTo} onChange={(e) => dispatch(updateBonus(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="2">
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountFrom">Amount From</label>
                                    <input id="queryAmountFrom" name="queryAmountFrom" value={bonus.queryAmountFrom} onChange={(e) => dispatch(updateBonus(e))} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryAmountTo">Amount To</label>
                                    <input id="queryAmountTo" name="queryAmountTo" value={bonus.queryAmountTo} onChange={(e) => dispatch(updateBonus(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
            <Config
                isConfigOpen={bonus.isBatchUpdating}
                configType={"Batch Update Bonus Records"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchUpdating(bonus.isBatchUpdating))}
                configSecondaryAction={"Batch Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={() => dispatch(batchUpdateBonus(bonus.selectedRecord, bonus.updateEmployeeId, bonus.updateDate, bonus.updateReason, bonus.updateAmount, bonus.currentPage, bonus.currentLimit, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="updateEmployeeId">Employee</label>
                        <select id="updateEmployeeId" name="updateEmployeeId" value={bonus.updateEmployeeId} onChange={(e) => dispatch(updateBonus(e))}>
                            <option value="" hidden>Employee</option>
                            {bonus.employeeRecord.map((el, i) =>
                                <option key={i} value={el.id}>ID: {el.id} {el.firstname} {el.lastname}</option>
                            )}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateDate">Date</label>
                        <input id="updateDate" name="updateDate" type="date" value={bonus.updateDate} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateAmount">Amount</label>
                        <input id="updateAmount" name="updateAmount" type="number" value={bonus.updateAmount} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="updateReason">Reason</label>
                        <textarea id="updateReason" name="updateReason" value={bonus.updateReason} onChange={(e) => dispatch(updateBonus(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={bonus.isBatchDeleting}
                configType={"Batch Delete Bonus Records"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(bonus.isBatchDeleting))}
                configSecondaryAction={"Batch Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(batchDeleteBonus(bonus.selectedRecord, bonus.currentPage, bonus.currentLimit, bonus.queryText, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo))}
            >
                <p><strong>Are you sure to delete the following records?</strong></p>
                {bonus.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID:</strong> {el}</p>
                )}
            </Config>
        </div>
    )
}

export default Bonus