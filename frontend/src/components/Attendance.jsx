import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import Punch from './Punch'

function Attendance() {
    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <Punch />
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Attendance