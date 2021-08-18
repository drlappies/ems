import React from 'react';
import { Table } from 'semantic-ui-react'

function TableHeader(props) {
    const { header } = props

    return (
        <Table.Header>
            <Table.Row>
                {header.map((el, i) =>
                    <Table.HeaderCell key={i}>
                        {el}
                    </Table.HeaderCell>
                )}
            </Table.Row>
        </Table.Header>
    )
}

export default TableHeader