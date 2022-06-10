import serviceCont from '../services/index.service';
import AllowanceController from './allowance.controller';
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
    allowanceController: new AllowanceController(serviceCont.allowanceService),
    attenddenceController: new AttendanceController(serviceCont.attendanceService),
    bonusController: new BonusController(serviceCont.bonusService),
    deductionController: new DeductionController(serviceCont.deductionService),
    employeeController: new EmployeeController(serviceCont.employeeService),
    leaveController: new LeaveController(serviceCont.leaveController),
    loginController: new LoginController(serviceCont.loginService),
    overtimeController: new OvertimeController(serviceCont.overtimeService),
    payrollController: new PayrollController(serviceCont.payrollController),
    positionController: new PositionController(serviceCont.positionService),
    reimbursementController: new ReimbursementController(serviceCont.reimbursementService),
    departmentController: new DepartmentController(serviceCont.departmentService)
}

export default container