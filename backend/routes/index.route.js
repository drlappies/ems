import { Router } from 'express'
import middlewares from '../middlewares/index.middleware'
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
import UserRoute from './user.route'

const container = {
    allowanceEmployee: new AllowanceEmployeeRoute({ router: Router, controller: controllerCont.allowanceEmployee, middlewares }),
    allowance: new AllowanceRoute({ router: Router, controller: controllerCont.allowance, middlewares }),
    attendance: new AttendanceRoute({ router: Router, controller: controllerCont.attendence, middlewares }),
    bonus: new BonusRoute({ router: Router, controller: controllerCont.bonus, middlewares }),
    deduction: new DeductionRoute({ router: Router, controller: controllerCont.deduction, middlewares }),
    department: new DepartmentRoute({ router: Router, controller: controllerCont.department, middlewares }),
    employee: new EmployeeRoute({ router: Router, controller: controllerCont.employee, middlewares }),
    leave: new LeaveRoute({ router: Router, controller: controllerCont.leave, middlewares }),
    login: new LoginRoute({ router: Router, controller: controllerCont.login, middlewares }),
    overtime: new OvertimeRoute({ router: Router, controller: controllerCont.overtime, middlewares }),
    payroll: new PayrollRoute({ router: Router, controller: controllerCont.payroll, middlewares }),
    position: new PositionRoute({ router: Router, controller: controllerCont.position, middlewares }),
    reimbursement: new ReimbursementRoute({ router: Router, controller: controllerCont.reimbursement, middlewares }),
    user: new UserRoute({ router: Router, controller: controllerCont.user, middlewares })
}

export default container