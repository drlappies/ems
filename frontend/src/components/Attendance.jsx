import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import Punch from './Punch'
import Popup from './Popup';

function Attendance() {
    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <Popup />
                </Grid.Row>
                <Grid.Row>
                    <Punch />
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Attendance