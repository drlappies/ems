import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBonus, fetchSpecificBonus, updateBonus, confirmBonusUpdate, deleteBonus, resetBonus, createBonus, fetchNextBonusPage, fetchPreviousBonusPage } from '../actions/bonus';
import { Grid, Table, Form, Button, Menu, Input, Label, Header } from 'semantic-ui-react'
import TableBody from './TableBody';
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import Config from './Config'

function Bonus() {
    const dispatch = useDispatch();
    const bonus = useSelector(state => state.bonus)
    const [state, setState] = useState({
        isUpdating: false,
        isDeleting: false,
        isCreating: false,
    })

    useEffect(() => {
        dispatch(fetchBonus())
    }, [dispatch])

    const toggleUpdaing = (bonus) => {
        if (bonus) {
            dispatch(fetchSpecificBonus(bonus.id))
        } else {
            dispatch(resetBonus())
        }
        setState(prevState => {
            return {
                isUpdating: !prevState.isUpdating
            }
        })
    }

    const toggleDeleting = (bonus) => {
        if (bonus) {
            dispatch(fetchSpecificBonus(bonus.id))
        } else {
            dispatch(resetBonus())
        }
        setState(prevState => {
            return {
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const toggleCreating = () => {
        dispatch(resetBonus())
        setState(prevState => {
            return {
                isCreating: !prevState.isCreating
            }
        })
    }

    const handleUpdate = () => {
        dispatch(confirmBonusUpdate(bonus.bonusId, bonus.employeeId, bonus.reason, bonus.date, bonus.amount))
        return toggleUpdaing()
    }

    const handleDelete = () => {
        dispatch(deleteBonus(bonus.bonusId))
        return toggleDeleting()
    }

    const handleCreate = () => {
        dispatch(createBonus(bonus.employeeId, bonus.reason, bonus.amount, bonus.date))
        return toggleCreating()
    }

    const handleSearch = () => {
        return dispatch(fetchBonus(0, bonus.queryDateFrom, bonus.queryDateTo, bonus.queryAmountFrom, bonus.queryAmountTo, bonus.queryText))
    }

    const gotoNextPage = () => {
        return dispatch(fetchNextBonusPage(bonus.currentPage, bonus.pageLength))
    }

    const gotoPreviousPage = () => {
        return dispatch(fetchPreviousBonusPage(bonus.currentPage))
    }

    return (
        <div>
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Menu>
                            <Menu.Item>
                                <Input labelPosition='right' type="date" name="queryDateFrom" value={bonus.queryDateFrom} onChange={(e) => dispatch(updateBonus(e))}>
                                    <Label basic>From</Label>
                                    <input />
                                </Input>
                                <Input labelPosition='right' type="date" name="queryDateTo" value={bonus.queryDateTo} onChange={(e) => dispatch(updateBonus(e))}>
                                    <Label basic>To</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input labelPosition='right' type="number" name="queryAmountFrom" value={bonus.queryAmountFrom} onChange={(e) => dispatch(updateBonus(e))}>
                                    <Label basic>Amount From</Label>
                                    <input />
                                </Input>
                                <Input labelPosition='right' type="number" name="queryAmountTo" value={bonus.queryAmountTo} onChange={(e) => dispatch(updateBonus(e))}>
                                    <Label basic>To</Label>
                                    <input />
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input icon="search" placeholder="Search" name="queryText" value={bonus.queryText} onChange={(e) => dispatch(updateBonus(e))} />
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Button onClick={() => handleSearch()}>Search</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Header>Employee Bonus Management</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button color="blue" onClick={() => toggleCreating()}>Create Bonus</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled>
                            <TableHeader
                                header={['id', 'Employee Id', 'Firstname', 'Lastname', 'Date', 'Reason', 'Amount', 'Actions']}
                            />
                            <TableBody
                                data={bonus.record}
                                primaryAction={"Update"}
                                primaryActionColor={"blue"}
                                primaryFunc={toggleUpdaing}
                                secondaryAction={"Delete"}
                                secondaryActionColor={"red"}
                                secondaryFunc={toggleDeleting}
                                cellSize={['1', '1', '1', '1', '3', '6', '1', '1']}
                            />
                            <TableFooter
                                colSpan={8}
                                pageTotal={bonus.pageLength}
                                pageStart={bonus.currentPageStart}
                                pageEnd={bonus.currentPageEnd}
                                onNext={gotoNextPage}
                                onPrevious={gotoPreviousPage}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
            <Config
                isConfigOpen={state.isUpdating}
                configType={"Update Bonus Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdaing}
                configSecondaryColor={"green"}
                configSecondaryAction={"Update"}
                configSecondaryFunc={handleUpdate}
                configContent={
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
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Bonus Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={handleDelete}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following bonus record?</strong></p>
                        <p><strong>ID:</strong> {bonus.bonusId}</p>
                        <p><strong>Recipient Employee ID:</strong> {bonus.employeeId}</p>
                        <p><strong>Recipient Employee:</strong> {bonus.firstname} {bonus.lastname}</p>
                        <p><strong>Reason:</strong> {bonus.reason}</p>
                        <p><strong>Amount:</strong> {bonus.amount}</p>
                        <p><strong>Date: </strong> {bonus.date}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configType={"Create Bonus Record"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleCreate}
                configContent={
                    <Form>
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
                }
            />
        </div>
    )
}

export default Bonus