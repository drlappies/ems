import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Segment, Header, Table, Tab } from 'semantic-ui-react'
import Calendar from './Calendar';
import UserLeave from './UserLeave';
import UserPayroll from './UserPayroll';
import UserOvertime from './UserOvertime';
import '../css/main.css'


function User() {
    const auth = useSelector(state => state.auth)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const panes = [
        { menuItem: 'Attendance', render: () => <Tab.Pane><Calendar /></Tab.Pane> },
        { menuItem: 'Leave', render: () => <Tab.Pane><UserLeave /></Tab.Pane> },
        { menuItem: 'Overtime', render: () => <Tab.Pane><UserOvertime /></Tab.Pane> },
        { menuItem: 'Payroll', render: () => <Tab.Pane><UserPayroll /></Tab.Pane> },
        { menuItem: 'Reimbursement', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        { menuItem: 'Allowance', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    return (
        <div className="record">
            <Header>User Dashboard</Header>
            <Grid>
                <Grid.Row columns="2">
                    <Grid.Column width="6">
                        <Segment>
                            <Segment.Inline>
                                <Header as="h4">Employee Profile</Header>
                            </Segment.Inline>
                            <Table size="small">
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Employee ID</Header></Table.Cell>
                                    <Table.Cell>{auth.id}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Firstname</Header></Table.Cell>
                                    <Table.Cell>{auth.firstname}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Lastname</Header></Table.Cell>
                                    <Table.Cell>{auth.lastname}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Account Role</Header></Table.Cell>
                                    <Table.Cell>{auth.role}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Department</Header></Table.Cell>
                                    <Table.Cell>{auth.department ? auth.department : "unassigned"}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Position</Header></Table.Cell>
                                    <Table.Cell>{auth.position ? auth.position : "unassigned"}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Working Hour</Header></Table.Cell>
                                    <Table.Cell>{auth.start_hour} to {auth.end_hour}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Address</Header></Table.Cell>
                                    <Table.Cell>{auth.address}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Phone Number</Header></Table.Cell>
                                    <Table.Cell>{auth.phone_number}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Onboard Date</Header></Table.Cell>
                                    <Table.Cell>{new Date(auth.onboard_date).getDate()} {months[new Date(auth.onboard_date).getMonth()]}  {new Date(auth.onboard_date).getFullYear()} </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Annual Leave</Header></Table.Cell>
                                    <Table.Cell>{auth.annual_leave_count}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Overtime Pay Entitlement</Header></Table.Cell>
                                    <Table.Cell>{auth.ot_pay_entitled ? "Yes" : "No"}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Overtime Pay (Hourly)</Header></Table.Cell>
                                    <Table.Cell>{auth.ot_hourly_salary}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Emergency Contact Person</Header></Table.Cell>
                                    <Table.Cell>{auth.emergency_contact_person}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing><Header as="h5">Emergency Contact Number</Header></Table.Cell>
                                    <Table.Cell>{auth.emergency_contact_number}</Table.Cell>
                                </Table.Row>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width="10">
                        <Tab panes={panes} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}

export default User