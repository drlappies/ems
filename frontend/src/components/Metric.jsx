import React from 'react';
import { Statistic, Segment } from 'semantic-ui-react'

function Metric(props) {
    return (
        <Segment inverted color={props.color} padded='very' textAlign='center' size="mini">
            <Statistic>
                <Statistic.Value>{props.number}</Statistic.Value>
                <Statistic.Label>{props.label}</Statistic.Label>
            </Statistic>
        </Segment>
    )
}

export default Metric