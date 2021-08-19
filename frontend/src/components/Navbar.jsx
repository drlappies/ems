import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu, Sidebar, Container } from 'semantic-ui-react'

function Navbar(props) {
    const ui = useSelector(state => state.ui)

    return (
        <Sidebar.Pushable style={{ height: '94vh' }}>
            <Sidebar
                as={Menu}
                animation="overlay"
                inverted
                vertical
                visible={ui.sidebar}
                width='wide'
            >
                <Menu.Item>
                    <Menu.Header>
                        <Icon name='dashboard' />Dashboard
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/dashboard">
                            Dashboard
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="time" />Attendance Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/attendance/time">
                            Employee Time In
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance/overtime">
                            Employee Overtime Time In
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance/history">
                            Attendance History
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance/history/overtime">
                            Overtime History
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money" />Payroll Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/payroll/create">
                            Generate Payroll
                        </Menu.Item>
                        <Menu.Item as={Link} to="/payroll/history">
                            Payroll History
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="users" />HR Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/employee">
                            Employee
                        </Menu.Item>
                        <Menu.Item as={Link} to="/employee/position">
                            Position
                        </Menu.Item>
                        <Menu.Item as={Link} to="/employee/department">
                            Department
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money bill alternate outline" />Allowance Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/allowance">
                            View Allowance
                        </Menu.Item>
                        <Menu.Item as={Link} to="/allowance/create">
                            Create Allowance
                        </Menu.Item>
                        <Menu.Item as={Link} to="/allowance/employee">
                            Employee - Allowance Management
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money bill alternate" />Reimbursement Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/reimbursement/apply">
                            Reimbursement Application
                        </Menu.Item>
                        <Menu.Item as={Link} to="/reimbursement/approve">
                            Reimbursement Approval
                        </Menu.Item>
                        <Menu.Item as={Link} to="reimbursement/history">
                            Reimbursement History
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={ui.sidebar}>
                <Container>
                    {props.children}
                </Container>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

export default Navbar