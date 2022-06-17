import jwt from 'jsonwebtoken'
import logger from '../logger/logger';
import utils from '../utils/index.util'
import services from '../services/index.service';
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
    allowance: new AllowanceController({ logger, services }),
    attendence: new AttendanceController({ logger, services }),
    allowanceEmployee: new AllowanceEmployeeController({ logger, services }),
    bonus: new BonusController({ logger, services }),
    deduction: new DeductionController({ logger, services }),
    employee: new EmployeeController({ logger, services, utils }),
    leave: new LeaveController({ logger, services }),
    login: new LoginController({ logger, services, jwt, utils }),
    overtime: new OvertimeController({ logger, services, utils }),
    payroll: new PayrollController({ logger, services }),
    position: new PositionController({ logger, services }),
    reimbursement: new ReimbursementController({ logger, services }),
    department: new DepartmentController({ logger, services }),
    allowanceEmployee: new AllowanceEmployeeController({ logger, services })
}

export default container