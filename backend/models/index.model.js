import repository from '../repositories/index.repository';
import Allowance from "./allowance.model";
import Attendance from "./attendance.model";
import Bonus from "./bonus.model";
import Deduction from "./deduction.model";
import Department from "./department.model";
import Employee from "./employee.model";
import Leave from "./leave.model";
import Overtime from "./overtime.model";
import Payroll from "./payroll.model";
import Position from "./position.model";
import Reimbursement from "./reimbusement.model";
import AllowanceEmployee from './allowance_employee.model';

const container = {
    allowance: new Allowance(),
    attendance: new Attendance(),
    bonus: new Bonus(),
    deduction: new Deduction(),
    department: new Department(),
    employee: new Employee(),
    leave: new Leave(),
    overtime: new Overtime(),
    payroll: new Payroll(),
    position: new Position(),
    reimbursement: new Reimbursement(),
    allowanceEmployee: new AllowanceEmployee()
}

export default container