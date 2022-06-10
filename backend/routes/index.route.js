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

const container = {
    allowanceRoute: new AllowanceRoute(Router, "/api/allowance", controllerCont.allowanceController),
    attendanceRoute: new AttendanceRoute(Router, "/api/attendance", controllerCont.attenddenceController),
    bonusRoute: new BonusRoute(Router, "/api/bonus", controllerCont.bonusController),
    deductionRoute: new DeductionRoute(Router, "/api/deduction", controllerCont.deductionController),
    departmentRoute: new DepartmentRoute(Router, "/api/department", controllerCont.departmentController),
    employeeRoute: new EmployeeRoute(Router, "/api/employee", controllerCont.employeeController),
    leaveRoute: new LeaveRoute(Router, "/api/leave", controllerCont.leaveController),
    loginRoute: new LoginRoute(Router, "/api/login", controllerCont.loginController),
    overtimeRoute: new OvertimeRoute(Router, "/api/overtime", controllerCont.overtimeController),
    payrollRoute: new PayrollRoute(Router, "/api/payroll", controllerCont.payrollController),
    positionRoute: new PositionRoute(Router, "/api/position", controllerCont.positionController),
    reimbursementRoute: new ReimbursementRoute(Router, "/api/reimbursement", controllerCont.reimbursementController)
}

export default container