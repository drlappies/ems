import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPositions, fetchSpecificPosition, resetPosition, updatePosition, confirmPositionUpdate, confirmPositionDelete, gotoNextPositionPage, gotoPreviousPositionPage, fetchPositionByQuery, createPosition } from '../actions/position'
import { Table, Grid, Form, Menu, Input, Button } from 'semantic-ui-react';
import TableBody from './TableBody';
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import Config from './Config'

const headers = ['id', 'Position', 'Actions']

function Position() {
    const dispatch = useDispatch()
    const position = useSelector(state => state.position)
    const [state, setState] = useState({
        isUpdating: false,
        isDeleting: false,
        isCreating: false
    })

    const toggleUpdating = (position) => {
        if (position) {
            dispatch(fetchSpecificPosition(position.id))
        } else {
            dispatch(resetPosition())
        }

        setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    const toggleDeleting = (position) => {
        if (position) {
            dispatch(fetchSpecificPosition(position.id))
        } else {
            dispatch(resetPosition())
        }

        setState(prevState => {
            return {
                ...prevState,
                isDeleting: !prevState.isDeleting
            }
        })
    }

    const toggleCreating = () => {
        setState(prevState => {
            return {
                ...prevState,
                isCreating: !prevState.isCreating
            }
        })
    }

    const handleUpdate = () => {
        dispatch(confirmPositionUpdate(position.positionId, position.positionName))
        toggleUpdating()
    }

    const handleDelete = () => {
        dispatch(confirmPositionDelete(position.positionId))
        toggleDeleting()
    }

    const handleSearch = () => {
        dispatch(fetchPositionByQuery(position.positionName))
    }

    const handleCreate = () => {
        dispatch(createPosition(position.createPositionName))
        toggleCreating()
    }

    const gotoNextPage = () => {
        dispatch(gotoNextPositionPage(position.currentPage, position.pageLength))
    }

    const gotoPreviousPage = () => {
        dispatch(gotoPreviousPositionPage(position.currentPage))
    }

    useEffect(() => {
        dispatch(fetchPositions())
    }, [dispatch])

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Menu>
                        <Menu.Item>
                            <label htmlFor="name">Position Name:</label>
                        </Menu.Item>
                        <Menu.Item>
                            <Input id="name" name="positionName" value={position.positionName} onChange={(e) => dispatch(updatePosition(e))} />
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
                    <Button color="blue" onClick={() => toggleCreating()}>Create Position</Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table celled>
                        <TableHeader header={headers} />
                        <TableBody
                            data={position.record}
                            primaryAction={"Update"}
                            primaryFunc={toggleUpdating}
                            primaryActionColor={"blue"}
                            secondaryAction={"Delete"}
                            secondaryFunc={toggleDeleting}
                            secondaryActionColor={"red"}
                        />
                        <TableFooter
                            colSpan={3}
                            pageStart={position.currentPageStart}
                            pageEnd={position.currentPageEnd}
                            pageTotal={position.pageLength}
                            onNext={gotoNextPage}
                            onPrevious={gotoPreviousPage}
                        />
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Config
                isConfigOpen={state.isUpdating}
                configType={"Update Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleUpdating}
                configSecondaryAction={"Update"}
                configSecondaryFunc={handleUpdate}
                configSecondaryColor={"green"}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="positionId">ID:</label>
                            <input id="positionId" name="positionId" value={position.positionId} disabled />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="positionName">Position Name:</label>
                            <input id="positionName" name="positionName" value={position.positionName} onChange={(e) => dispatch(updatePosition(e))} />
                        </Form.Field>
                    </Form>
                }
            />
            <Config
                isConfigOpen={state.isDeleting}
                configType={"Delete Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleDeleting}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={handleDelete}
                configContent={
                    <React.Fragment>
                        <p><strong>Are you sure to delete the following position record?</strong></p>
                        <p><strong>ID:</strong> {position.positionId}</p>
                        <p><strong>Name:</strong> {position.positionName}</p>
                    </React.Fragment>
                }
            />
            <Config
                isConfigOpen={state.isCreating}
                configType={"Create Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={toggleCreating}
                configSecondaryAction={"Create"}
                configSecondaryFunc={handleCreate}
                configSecondaryColor={"green"}
                configContent={
                    <Form>
                        <Form.Field>
                            <label htmlFor="createPositionNamee">Position Name:</label>
                            <input id="createPositionName" name="createPositionName" value={position.createPositionName} onChange={(e) => dispatch(updatePosition(e))} />
                        </Form.Field>
                    </Form>
                }
            />
        </Grid>
    )
}

export default Position