import React, { useRef, useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Chart(props) {
    return (
        <Grid>
            <Grid.Row>
                <Header
                    size="large"
                    content={props.header}
                    subheader={props.subheader}
                />
            </Grid.Row>
            <Grid.Row>
                <BarChart
                    width={1000}
                    height={300}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </BarChart>
            </Grid.Row>
        </Grid>
    )
}

export default Chart