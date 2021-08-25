import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllowance, fetchSpecificAllowance, updateAllowance, confirmAllowanceUpdate, deleteAllowance, resetAllowance, addToEntitleList, removeFromEntitleList, gotoNextAllowancePage, gotoPreviousAllowancePage, createAllowance, fetchAllowanceByQuery } from '../actions/allowance';
import { Form, Grid, Table, Button, List, Header, Menu, Input } from 'semantic-ui-react'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import Config from './Config';

function Allowance() {
    const dispatch = useDispatch()
    const allowance = useSelector(state => state.allowance)
    const header = ['id', 'Allowance Name', 'Description', 'Amount', 'Status', 'Actions']
    const [state, setState] = useState({
        isUpdating: false,
        isDeleting: false,
        isManaging: false,
        isCreating: false
    })

    const toggleUpdating = (allowance) => {
        if (allowance) {
            dispatch(fetchSpecificAllowance(allowance.id))
        } else {
            dispatch(resetAllowance())
        }
        setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    const toggleCreating = () => {
        dispatch(resetAllowance())
        setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
    }

    const toggleDeleting = (allowance) => {
        if (allowance) {
            dispatch(fetchSpecificAllowance(allowance.id))
        } else {
            dispatch(resetAllowance())
        }
        setState(prevState => {
            return {
                ...prevState,
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const toggleManaging = (allowance) => {
        if (allowance) {
            dispatch(fetchSpecificAllowance(allowance.id))
        } else {
            dispatch(resetAllowance())
        }
        setState(prevState => {
            return {
                ...prevState,
                isManaging: !prevState.isManaging
            }
        })
    }

    const handleUpdate = () => {
        dispatch(confirmAllowanceUpdate(allowance.allowanceId, allowance.allowanceName, allowance.allowanceDescription, allowance.allowanceAmount, allowance.allowanceStatus))
        toggleUpdating()
    }

    const handleDelete = () => {
        dispatch(deleteAllowance(allowance.allowanceId))
        toggleDeleting()
    }

    const handleCreate = () => {
        dispatch(createAllowance(allowance.createAllowanceName, allowance.createAllowanceDescription, allowance.createAllowanceAmount))
        toggleCreating()
    }

    const handleSearch = () => {
        dispatch(fetchAllowanceByQuery(allowance.amountFrom, allowance.amountTo, allowance.status, allowance.search))
    }

    const gotoNextPage = () => {
        dispatch(gotoNextAllowancePage(allowance.currentPage, allowance.pageLength))
    }

    const gotoPreviousPage = () => {
        dispatch(gotoPreviousAllowancePage(allowance.currentPage))
    }

    useEffect(() => {
        dispatch(fetchAllowance())
    }, [dispatch])

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Menu>
                        <Menu.Item>
                            <Input type="number" placeholder="Amount from" name="amountFrom" value={allowance.amountFrom} onChange={(e) => dispatch(updateAllowance(e))} />
                        </Menu.Item>
                        <Menu.Item>
                            <Input type="number" placeholder="Amount to" name="amountTo" value={allowance.amountTo} onChange={(e) => dispatch(updateAllowance(e))} />
                        </Menu.Item>
                        <Menu.Item>
                            <Form>
                                <Form.Field>
                                    <select placeholder="Status" name="status" value={allowance.status} onChange={(e) => dispatch(updateAllowance(e))}>
                                        <option value="" disabled hidden>Status</option>
                                        <option value="active">Active</option>
                                        <option value="disabled">Disabled</option>
                                    </select>
                                </Form.Field>
                            </Form>
                        </Menu.Item>
                        <Menu.Item>
                            <Input placeholder="Search" name="search" value={allowance.search} onChange={(e) => dispatch(updateAllowance(e))} />
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button onClick={() => handleSearch()}>Search</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="right">
                <Grid.Column>
                    <Button color="blue" onClick={() => toggleCreating()}>Create Allowance</Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table celled>
                        <TableHeader header={header} />
                        <TableBody
                            data={allowance.record}
                            primaryAction={"Update"}
                            primaryActionColor={"blue"}
                            primaryFunc={toggleUpdating}
                            secondaryAction={"Delete"}
                            secondaryActionColor={"red"}
                            secondaryFunc={toggleDeleting}
                            tertiaryAction={"Manage"}
                            tertiaryFunc={toggleManaging}
                            tertiaryActionColor={'teal'}
                        />
                        <TableFooter
                            colSpan={6}
                            pageTotal={allowance.pageLength}
                            pageStart={allowance.currentPageStart}
                            pageEnd={allowance.currentPageEnd}
                            onNext={gotoNextPage}
                            onPrevious={gotoPreviousPage}
                        />
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Config
                isConfigOpen={state.isUpdating}
                configType={"Update Allowance"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdating}
                configSecondaryAction={"Update"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleUpdate}
                configContent={
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
                    </Form>
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Allowance"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryFunc={handleDelete}
                configSecondaryColor={'red'}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following allowance record?</strong></p>
                        <p><strong>ID:</strong> {allowance.allowanceId}</p>
                        <p><strong>Name:</strong> {allowance.allowanceName}</p>
                        <p><strong>Description:</strong> {allowance.allowanceDescription}</p>
                        <p><strong>Amount:</strong> {allowance.allowanceAmount}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isManaging}
                configSize={"large"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleManaging}
                configType={"Manage Employee Entitlement"}
                configContent={
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
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configType={"Create Allowance"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configSecondaryAction={"Create"}
                configSecondaryColor={"green"}
                configSecondaryFunc={handleCreate}
                configContent={
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
                    </Form>
                }
            />
        </Grid>
    )
}

export default Allowance