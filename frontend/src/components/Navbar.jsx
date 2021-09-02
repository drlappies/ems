import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import { toggleSidebar } from '../actions/ui'

function Navbar(props) {
    const dispatch = useDispatch()
    const ui = useSelector(state => state.ui)

    return (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="push"
                inverted
                vertical
                visible={ui.sidebar}
                width='wide'
            >
                <Menu.Item></Menu.Item>
                <Menu.Item></Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name='dashboard' />Dashboard
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/dashboard" onClick={() => dispatch((toggleSidebar()))}>
                            Dashboard
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="time" />Attendance Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/attendance/punch" onClick={() => dispatch((toggleSidebar()))}>
                            Employee Check In
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance/overtime/check_in" onClick={() => dispatch((toggleSidebar()))}>
                            Employee Overtime Check In
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance/leave" onClick={() => dispatch((toggleSidebar()))}>
                            Employee Leave Application
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance" onClick={() => dispatch((toggleSidebar()))}>
                            Attendance History
                        </Menu.Item>
                        <Menu.Item as={Link} to="/overtime" onClick={() => dispatch((toggleSidebar()))}>
                            Overtime History
                        </Menu.Item>
                        <Menu.Item as={Link} to="/attendance/leave/history" onClick={() => dispatch((toggleSidebar()))}>
                            Leave History
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money" />Payroll Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/payroll/management" onClick={() => dispatch((toggleSidebar()))}>
                            Payroll Management
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="users" />HR Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/employee/record" onClick={() => dispatch((toggleSidebar()))}>
                            Employee
                        </Menu.Item>
                        <Menu.Item as={Link} to="/employee/position" onClick={() => dispatch((toggleSidebar()))}>
                            Position
                        </Menu.Item>
                        <Menu.Item as={Link} to="/employee/department" onClick={() => dispatch((toggleSidebar()))}>
                            Department
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money bill alternate outline" />Allowance Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/allowance" onClick={() => dispatch((toggleSidebar()))}>
                            Allowance Management
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money bill alternate" />Reimbursement Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/reimbursement/apply" onClick={() => dispatch((toggleSidebar()))}>
                            Reimbursement Application
                        </Menu.Item>
                        <Menu.Item as={Link} to="/reimbursement/management" onClick={() => dispatch((toggleSidebar()))}>
                            Reimbursement Management
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="gift" />Bonus Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/bonus/management" onClick={() => dispatch((toggleSidebar()))}>
                            Bonus Management
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        <Icon name="money" />
                        Deduction Management
                    </Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link} to="/deduction/management" onClick={() => dispatch((toggleSidebar()))}>
                            Deduction Management
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={ui.sidebar}>
                {props.children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

export default Navbar