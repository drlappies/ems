import React from 'react';
import { Table } from 'semantic-ui-react'

function TableHeader(props) {
    const { header, checkFunc, checkName, isChecked } = props

    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>
                    <input type="checkbox" name={checkName} checked={isChecked} onChange={checkFunc} />
                </Table.HeaderCell>
                {header ? header.map((el, i) =>
                    <Table.HeaderCell key={i}>
                        {el}
                    </Table.HeaderCell>
                ) : null}
            </Table.Row>
        </Table.Header>
    )
}

export default TableHeader