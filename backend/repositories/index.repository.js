import knex from '../database/database'
import AllowanceEmployeeRepository from "./allowance_employee.repository";
import AllowanceRepository from "./allowance.repository";
import AttendanceRepository from './attendance.repository';
import BonusRepository from './bonus.repository';
import DeductionRepository from './deduction.repository';
import EmployeeRepository from './employee.repository';
import LeaveRepository from './leave.repository';
import OvertimeRepository from './overtime.repository';
import PositionRepository from './position.repository';
import ReimbursementRepository from './reimbursement.repository';
import DepartmentRepository from './department.repository';
import PayrollRepository from './payroll.repository';

const container = {
    allowanceEmployee: new AllowanceEmployeeRepository(knex, "allowance_employee"),
    allowance: new AllowanceRepository(knex, "allowance"),
    attendance: new AttendanceRepository(knex, "attendance"),
    bonus: new BonusRepository(knex, "bonus"),
    deduction: new DeductionRepository(knex, "deduction"),
    employee: new EmployeeRepository(knex, "employee"),
    leave: new LeaveRepository(knex, "leave"),
    overtime: new OvertimeRepository(knex, "overtime"),
    position: new PositionRepository(knex, "positions"),
    reimbursement: new ReimbursementRepository(knex, "reimbursement"),
    department: new DepartmentRepository(knex, "departments"),
    payroll: new PayrollRepository(knex, "payroll")
}

export default container