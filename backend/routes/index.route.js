import { Router } from 'express'
import controllerCont from '../controllers/index.controller'
import AllowanceRoute from "./allowance.route";
import AttendanceRoute from './attendance.route';
import BonusRoute from './bonus.route';
import DeductionRoute from './deduction.route';
import DepartmentRoute from './department.route';
import EmployeeRoute from './employee.route';
import LeaveRoute from './leave.route';
import LoginRoute from './login.route';
import OvertimeRoute from './overtime.route';
import PayrollRoute from './payroll.route';
import PositionRoute from './position.route';
import ReimbursementRoute from './reimbursement.route';
import AllowanceEmployeeRoute from './allowance_employee.route';

const container = {
    allowanceEmployee: new AllowanceEmployeeRoute(Router, controllerCont.allowanceEmployee),
    allowance: new AllowanceRoute(Router, controllerCont.allowance),
    attendance: new AttendanceRoute(Router, controllerCont.attenddence),
    bonus: new BonusRoute(Router, controllerCont.bonus),
    deduction: new DeductionRoute(Router, controllerCont.deduction),
    department: new DepartmentRoute(Router, controllerCont.department),
    employee: new EmployeeRoute(Router, controllerCont.employee),
    leave: new LeaveRoute(Router, controllerCont.leave),
    login: new LoginRoute(Router, controllerCont.login),
    overtime: new OvertimeRoute(Router, controllerCont.overtime),
    payroll: new PayrollRoute(Router, controllerCont.payroll),
    position: new PositionRoute(Router, controllerCont.position),
    reimbursement: new ReimbursementRoute(Router, controllerCont.reimbursement)
}

export default container