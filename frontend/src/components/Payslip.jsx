import React from 'react';
import { Grid, Table } from 'semantic-ui-react'
import '../css/main.css'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class Payslip extends React.Component {
    render() {
        return (
            <div className="payslip" >
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <div className="payslip-heading">PAYSLIP</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="right">
                            <div className="payslip-subheading">Payroll ID</div>
                            <div>{this.props.payrollId}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="right">
                            <div className="payslip-subheading">Payday</div>
                            <div>{new Date(this.props.payday).getDate()} {months[new Date(this.props.payday).getMonth()]} {new Date(this.props.payday).getFullYear()}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="right">
                            <div className="payslip-subheading">Payroll Period</div>
                            <div>{new Date(this.props.payrollFrom).getDate()} {months[new Date(this.props.payrollFrom).getMonth()]} {new Date(this.props.payrollFrom).getFullYear()} -  {new Date(this.props.payrollTo).getDate()} {months[new Date(this.props.payrollTo).getMonth()]} {new Date(this.props.payrollTo).getFullYear()}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table size='small' celled>
                                <Table.Header>
                                    <Table.HeaderCell width="13">Earnings</Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Basic Salary</Table.Cell>
                                        <Table.Cell>{this.props.basicAmount} </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Overtime Salary</Table.Cell>
                                        <Table.Cell>{this.props.overtimeAmount}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Reimbursement</Table.Cell>
                                        <Table.Cell>{this.props.reimbursementAmount}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Allowance</Table.Cell>
                                        <Table.Cell>{this.props.allowanceAmount}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Bonus</Table.Cell>
                                        <Table.Cell>{this.props.bonusAmount}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Deduction</Table.Cell>
                                        <Table.Cell>{this.props.deductionAmount}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>MPF - Employee Voluntary</Table.Cell>
                                        <Table.Cell>{this.props.mpf}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Total</Table.Cell>
                                        <Table.Cell>{this.props.totalAmount}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="2">
                        <Grid.Column className="payslip-signature-box">
                            <div className="payslip-signature-area">
                                <div>_______________________________________________________________</div>
                                <div><span className="payslip-signature">Recipient Employee:</span> ID: {this.props.employeeId} {this.props.employeeFirstname} {this.props.employeeLastname}</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="payslip-signature-box">
                            <div className="payslip-signature-area">
                                <div>_______________________________________________________________</div>
                                <div><span className="payslip-signature">Approved By:</span> {this.props.approvalFirstname} {this.props.approvalLastname}</div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Payslip