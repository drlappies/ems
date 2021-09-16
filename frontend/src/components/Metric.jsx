import React from 'react';
import { Statistic, Segment } from 'semantic-ui-react'

function Metric(props) {
    return (
        <Segment inverted raised color={props.color} padded='very' textAlign="center">
            <Statistic>
                <Statistic.Value>{props.number}</Statistic.Value>
                <Statistic.Label>{props.label}</Statistic.Label>
            </Statistic>
        </Segment>
    )
}

export default Metric