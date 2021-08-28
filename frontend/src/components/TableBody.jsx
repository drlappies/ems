import React from 'react';
import { Table, Button } from 'semantic-ui-react';

function TableBody(props) {
    const { data, primaryFunc, secondaryFunc, primaryAction, secondaryAction, tertiaryAction, tertiaryFunc, primaryActionColor, secondaryActionColor, tertiaryActionColor, cellSize } = props

    return (
        <Table.Body>
            {data ? data.map((el, i) =>
                <Table.Row key={i}>
                    {Object.keys(el).map((key, j) =>
                        <React.Fragment key={j}>
                            <Table.Cell width={cellSize ? cellSize[j] : null}>
                                {/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(el[key]) ?
                                    `${new Date(el[key]).getFullYear()} - ${(new Date(el[key]).getMonth() + 1)} - ${new Date(el[key]).getDate()}`
                                    : el[key]
                                }
                            </Table.Cell>
                        </React.Fragment>
                    )}
                    <Table.Cell textAlign="center">
                        {primaryAction ? <Button color={primaryActionColor} onClick={() => primaryFunc(el)}>{primaryAction}</Button> : null}
                        {secondaryAction ? <Button color={secondaryActionColor} onClick={() => secondaryFunc(el)}>{secondaryAction}</Button> : null}
                        {tertiaryAction ? <Button color={tertiaryActionColor} onClick={() => tertiaryFunc(el)}>{tertiaryAction}</Button> : null}
                    </Table.Cell>
                </Table.Row>
            ) : null}
        </Table.Body >
    )
}

export default TableBody