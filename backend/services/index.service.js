import modelCont from '../models/index.model'
import repositoryCont from '../repositories/index.repository'
import AllowanceService from "./allowance.service";
import AllowanceEmployeeService from './allowance_employee.service';
import AttendanceService from './attendance.service';
import BonusService from './bonus.service';
import DeductionService from './deduction.service';
import DepartmentService from './department.service';
import LeaveService from './leave.service';
import LoginService from './login.service';
import OvertimeService from './overtime.service';
import PayrollService from './payroll.service';
import PositionService from './position.service';
import ReimbursementService from './reimbursement.service';
import EmployeeService from './employee.service';

const container = {
    allowanceEmployee: new AllowanceEmployeeService(modelCont, repositoryCont),
    allowance: new AllowanceService(modelCont, repositoryCont),
    attendance: new AttendanceService(modelCont, repositoryCont),
    bonus: new BonusService(modelCont, repositoryCont),
    deduction: new DeductionService(modelCont, repositoryCont),
    department: new DepartmentService(modelCont, repositoryCont),
    leave: new LeaveService(modelCont, repositoryCont),
    login: new LoginService(modelCont, repositoryCont),
    overtime: new OvertimeService(modelCont, repositoryCont),
    payroll: new PayrollService(modelCont, repositoryCont),
    position: new PositionService(modelCont, repositoryCont),
    reimbursement: new ReimbursementService(modelCont, repositoryCont),
    employee: new EmployeeService(modelCont, repositoryCont),
}

export default container