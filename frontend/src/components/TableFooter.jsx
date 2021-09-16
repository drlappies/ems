import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';

function TableFooter(props) {
    const { pageStart, pageEnd, pageTotal, onPrevious, onNext, colSpan, entriesNum, entriesFunc, entriesName } = props

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={colSpan}>
                    <Menu floated='right' pagination>
                        <Menu.Item>
                            <select onChange={entriesFunc} value={entriesNum} name={entriesName}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="250">250</option>
                                <option value="500">500</option>
                            </select>
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