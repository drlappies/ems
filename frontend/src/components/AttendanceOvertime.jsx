import React from 'react';
import Popup from './Popup';
import { Container, Grid } from 'semantic-ui-react'
import Overtime from './Overtime';

function AttendanceOvertime() {
    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <Popup />
                </Grid.Row>
                <Grid.Row>
                    <Overtime />
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default AttendanceOvertime