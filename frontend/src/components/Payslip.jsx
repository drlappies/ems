import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class Payslip extends React.Component {
    render() {
        return (
            <Grid container spacing={3} style={{ height: "100%", width: "100%", padding: "30px" }}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h4" style={{ fontWeight: "bold" }}>PAYSLIP</Typography>
                    <Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>Payroll ID</Typography>
                    <Typography gutterBottom variant="body2">{this.props.payrollId}</Typography>
                    <Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>Payday</Typography>
                    <Typography gutterBottom variant="body2">{new Date(this.props.payday).getDate()} {months[new Date(this.props.payday).getMonth()]} {new Date(this.props.payday).getFullYear()}</Typography>
                    <Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>Payroll Period</Typography>
                    <Typography gutterBottom variant="body2">{new Date(this.props.payrollFrom).getDate()} {months[new Date(this.props.payrollFrom).getMonth()]} {new Date(this.props.payrollFrom).getFullYear()} - {new Date(this.props.payrollTo).getDate()} {months[new Date(this.props.payrollTo).getMonth()]} {new Date(this.props.payrollTo).getFullYear()}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>Earnings</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>Amount</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Basic Salary</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.basicAmount}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Overtime Salary</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.overtimeAmount}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Reimbursement</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.reimbursementAmount}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Allowance</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.allowanceAmount}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Bonus</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.bonusAmount}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Deduction</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.deductionAmount}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">MPF - Employee Voluntary</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.mpf}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography gutterBottom variant="body2">Total</Typography></TableCell>
                                <TableCell><Typography gutterBottom variant="body2">{this.props.totalAmount}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 200 }}>
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item>
                            <Typography gutterBottom>_______________________________</Typography>
                            <Typography gutterBottom style={{ fontWeight: "bold" }}>Received By - ID: {this.props.employeeId} {this.props.employeeFirstname} {this.props.employeeLastname}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom>_______________________________</Typography>
                            <Typography gutterBottom style={{ fontWeight: "bold" }}>Approved By - ID: {this.props.approvalId} {this.props.approvalFirstname} {this.props.approvalLastname}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Payslip