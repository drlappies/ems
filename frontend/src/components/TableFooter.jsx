import React from 'react';
import { Table, Menu, Icon, Dropdown } from 'semantic-ui-react';

function TableFooter(props) {
    const { pageStart, pageEnd, pageTotal, onPrevious, onNext, colSpan, entriesNum, entriesFunc, entriesName } = props

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={colSpan}>
                    <Menu floated='right' pagination>
                        <Menu.Item>
                            <Dropdown
                                selection
                                compact
                                name={entriesName}
                                value={entriesNum}
                                onChange={(e, result) => entriesFunc(e, result)}
                                options={[
                                    { key: "10", value: 10, text: "10" },
                                    { key: "25", value: 25, text: "25" },
                                    { key: "50", value: 50, text: "50" },
                                    { key: "100", value: 100, text: "100" },
                                    { key: "250", value: 250, text: "250" },
                                    { key: "500", value: 500, text: "500" }
                                ]}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            {pageStart} - {pageEnd} of {pageTotal}
                        </Menu.Item>
                        <Menu.Item as='a' icon onClick={onPrevious}>
                            <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a' icon onClick={onNext}>
                            <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    )
}

export default TableFooter