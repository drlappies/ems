import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPositions, updatePosition, confirmPositionUpdate, confirmPositionDelete, gotoNextPositionPage, gotoPreviousPositionPage, fetchPositionByQuery, createPosition, toggleCreating, handleSelect, handleSelectAll, toggleBatchDeleting, batchDeletePosition, toggleUpdating, toggleDeleting, fetchByEntries, toggleFiltering, resetPositionQuery } from '../actions/position'
import { Table, Grid, Form, Header, Button } from 'semantic-ui-react';
import TableBody from './TableBody';
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import Config from './Config'
import '../css/main.css'

function Position() {
    const dispatch = useDispatch()
    const position = useSelector(state => state.position)

    useEffect(() => {
        dispatch(fetchPositions())
    }, [dispatch])

    return (
        <div className="record">
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header>Position Management</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column textAlign="right">
                        <Button size="tiny" color="red" onClick={() => dispatch(toggleBatchDeleting(position.isBatchDeleting))}>Batch Delete</Button>
                        <Button size="tiny" color="teal" onClick={() => dispatch(toggleFiltering(position.isFiltering))}>Filter</Button>
                        <Button size="tiny" color="green" onClick={() => dispatch(toggleCreating(position.isCreating))}>Create Position</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled compact selectable size="small">
                            <TableHeader
                                header={['id', 'Position', 'Actions']}
                                checkFunc={(e) => dispatch(handleSelectAll(e, position.record))}
                            />
                            <TableBody
                                data={position.record}
                                primaryAction={"Update"}
                                primaryFunc={(e) => dispatch(toggleUpdating(e.target.value))}
                                primaryActionColor={"blue"}
                                secondaryAction={"Delete"}
                                secondaryFunc={(e) => dispatch(toggleDeleting(e.target.value))}
                                secondaryActionColor={"red"}
                                checkedRows={position.selectedRecord}
                                checkFunc={(e) => dispatch(handleSelect(e))}
                            />
                            <TableFooter
                                colSpan={4}
                                pageStart={position.currentPageStart}
                                pageEnd={position.currentPageEnd}
                                pageTotal={position.pageLength}
                                onNext={() => dispatch(gotoNextPositionPage(position.currentPage, position.pageLength, position.currentLimit, position.queryText))}
                                onPrevious={() => dispatch(gotoPreviousPositionPage(position.currentPage, position.currentLimit, position.queryText))}
                                entriesFunc={(e, result) => dispatch(fetchByEntries(result.value, position.currentPage, position.pageLength, position.queryText))}
                                entriesNum={position.currentLimit}
                            />
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Config
                isConfigOpen={position.isUpdating}
                configType={"Update Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleUpdating())}
                configSecondaryAction={"Update"}
                configSecondaryFunc={() => dispatch(confirmPositionUpdate(position.positionId, position.positionName))}
                configSecondaryColor={"green"}
            >
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
            </Config>
            <Config
                isConfigOpen={position.isDeleting}
                configType={"Delete Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleDeleting())}
                configSecondaryAction={"Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(confirmPositionDelete(position.positionId))}
            >
                <p><strong>Are you sure to delete the following position record?</strong></p>
                <p><strong>ID:</strong> {position.positionId}</p>
                <p><strong>Name:</strong> {position.positionName}</p>
            </Config>
            <Config
                isConfigOpen={position.isCreating}
                configType={"Create Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleCreating(position.isCreating))}
                configSecondaryAction={"Create"}
                configSecondaryFunc={() => dispatch(createPosition(position.createPositionName))}
                configSecondaryColor={"green"}
            >
                <Form>
                    <Form.Field>
                        <label htmlFor="createPositionNamee">Position Name:</label>
                        <input id="createPositionName" name="createPositionName" value={position.createPositionName} onChange={(e) => dispatch(updatePosition(e))} />
                    </Form.Field>
                </Form>
            </Config>
            <Config
                isConfigOpen={position.isBatchDeleting}
                configType={"Batch Delete Position"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleBatchDeleting(position.isBatchDeleting))}
                configSecondaryAction={"Batch Delete"}
                configSecondaryColor={"red"}
                configSecondaryFunc={() => dispatch(batchDeletePosition(position.selectedRecord))}
            >
                <p><strong>Are you sure to delete the following records?</strong></p>
                {position.selectedRecord.map((el, i) =>
                    <p key={i}><strong>ID:</strong> {el}</p>
                )}
            </Config>
            <Config
                isConfigOpen={position.isFiltering}
                configType={"Search and Filter"}
                configPrimaryAction={"Cancel"}
                configPrimaryFunc={() => dispatch(toggleFiltering(position.isFiltering))}
                configTertiaryAction={"Search"}
                configTertiaryColor={"green"}
                configTertiaryFunc={() => dispatch(fetchPositionByQuery(position.currentPage, position.currentLimit, position.queryText))}
                configSecondaryAction={"Reset"}
                configSecondaryColor={"grey"}
                configSecondaryFunc={() => dispatch(resetPositionQuery(position.currentPage, position.currentLimit))}
            >
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label htmlFor="queryText">Contains</label>
                                    <input id="queryText" name="queryText" placeholder="Position" value={position.queryText} onChange={(e) => dispatch(updatePosition(e))} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Config>
        </div>
    )
}

export default Position