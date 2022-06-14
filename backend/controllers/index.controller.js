import logger from '../logger/logger';
import serviceCont from '../services/index.service';
import AllowanceController from './allowance.controller';
import AllowanceEmployeeController from './allowance_employee.controller';
import AttendanceController from './attendance.controller';
import BonusController from './bonus.controller';
import DeductionController from './deduction.controller';
import EmployeeController from './employee.controller';
import LeaveController from './leave.controller';
import LoginController from './login.controller';
import OvertimeController from './overtime.controller';
import PayrollController from './payroll.controller';
import PositionController from './position.controller';
import ReimbursementController from './reimbursement.controller';
import DepartmentController from './department.controller';

const container = {
    allowance: new AllowanceController(logger, serviceCont),
    attenddence: new AttendanceController(logger, serviceCont),
    allowanceEmployee: new AllowanceEmployeeController(logger, serviceCont),
    bonus: new BonusController(logger, serviceCont),
    deduction: new DeductionController(logger, serviceCont),
    employee: new EmployeeController(logger, serviceCont),
    leave: new LeaveController(logger, serviceCont),
    login: new LoginController(logger, serviceCont),
    overtime: new OvertimeController(logger, serviceCont),
    payroll: new PayrollController(logger, serviceCont),
    position: new PositionController(logger, serviceCont),
    reimbursement: new ReimbursementController(logger, serviceCont),
    department: new DepartmentController(logger, serviceCont),
    allowanceEmployee: new AllowanceEmployeeController(logger, serviceCont)
}

export default container