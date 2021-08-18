import React from 'react';
import { Table, Button } from 'semantic-ui-react';

function TableBody(props) {
    const { data, primaryFunc, secondaryFunc, primaryAction, secondaryAction, tertiaryAction, tertiaryFunc, primaryActionColor, secondaryActionColor, tertiaryActionColor } = props

    return (
        <Table.Body>
            {data.map((el, i) =>
                <Table.Row key={i}>
                    {Object.keys(el).map((key, j) =>
                        <React.Fragment key={j}>
                            <Table.Cell>
                                {el[key]}
                            </Table.Cell>
                        </React.Fragment>
                    )}
                    <Table.Cell textAlign="center">
                        {primaryAction ? <Button color={primaryActionColor} onClick={() => primaryFunc(el)}>{primaryAction}</Button> : null}
                        {secondaryAction ? <Button color={secondaryActionColor} onClick={() => secondaryFunc(el)}>{secondaryAction}</Button> : null}
                        {tertiaryAction ? <Button color={tertiaryActionColor} onClick={() => tertiaryFunc(el)}>{tertiaryAction}</Button> : null}
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body >
    )
}

export default TableBody