import knex from '../database/database';
import AllowanceService from "../services/allowance.service";
import AttendanceService from '../services/attendance.service';
import BonusService from '../services/bonus.service';
import DeductionService from '../services/deduction.service';
import DepartmentService from '../services/department.service';
import LeaveService from './leave.service';
import LoginService from './login.service';
import OvertimeService from './overtime.service';
import PayrollService from './payroll.service';
import PositionService from './position.service';
import ReimbursementService from './reimbursement.service';
import EmployeeService from './employee.service';

const container = {
    allowanceService: new AllowanceService(knex),
    attendanceService: new AttendanceService(knex),
    bonusService: new BonusService(knex),
    deductionService: new DeductionService(knex),
    departmentService: new DepartmentService(knex),
    leaveService: new LeaveService(knex),
    loginService: new LoginService(knex),
    overtimeService: new OvertimeService(knex),
    payrollService: new PayrollService(knex),
    positionService: new PositionService(knex),
    reimbursementService: new ReimbursementService(knex),
    employeeService: new EmployeeService(knex),
}

export default container