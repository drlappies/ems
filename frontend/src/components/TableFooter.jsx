import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';

function TableFooter(props) {
    const { pageStart, pageEnd, pageTotal, onPrevious, onNext, colSpan } = props
    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={colSpan}>
                    <Menu floated='right' pagination>
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