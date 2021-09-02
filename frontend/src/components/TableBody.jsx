import React from 'react';
import { Table, Button } from 'semantic-ui-react';

function TableBody(props) {
    const { data, primaryFunc, secondaryFunc, primaryAction, secondaryAction, tertiaryAction, tertiaryFunc, primaryActionColor, secondaryActionColor, tertiaryActionColor, cellSize, checkFunc, checkedRows } = props

    return (
        <Table.Body>
            {data ? data.map((el, i, arr) =>
                <Table.Row key={i}>
                    <Table.Cell>
                        {checkFunc && checkedRows ?
                            <input
                                type="checkbox"
                                name={arr[i].id}
                                checked={checkedRows.includes(arr[i].id.toString())}
                                onChange={(e) => checkFunc(e)}
                            />
                            : null
                        }
                    </Table.Cell>
                    {Object.keys(el).map((key, j) =>
                        <Table.Cell key={j} width={cellSize ? cellSize[j] : null} >
                            {/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(el[key]) ?
                                `${new Date(el[key]).getFullYear()} - ${(new Date(el[key]).getMonth() + 1)} - ${new Date(el[key]).getDate()}`
                                : el[key]
                            }
                        </Table.Cell>
                    )}
                    <Table.Cell textAlign="left">
                        {primaryAction ? <Button size="mini" color={primaryActionColor} onClick={() => primaryFunc(el)}>{primaryAction}</Button> : null}
                        {secondaryAction ? <Button size="mini" color={secondaryActionColor} onClick={() => secondaryFunc(el)}>{secondaryAction}</Button> : null}
                        {tertiaryAction ? <Button size="mini" color={tertiaryActionColor} onClick={() => tertiaryFunc(el)}>{tertiaryAction}</Button> : null}
                    </Table.Cell>
                </Table.Row>
            ) : null}
        </Table.Body >
    )
}

export default TableBody