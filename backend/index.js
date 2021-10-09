require('dotenv').config()

const express = require('express');
const cors = require('cors')
const app = express();
const Knex = require('knex');
const config = require('./knexfile');
const knex = Knex(process.env.NODE_ENV === 'development' ? config.development : config.production);
const { verify } = require('./utils/verification')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(verify)

const { EmployeeRoute } = require('./routes/employee.route');
const EmployeeController = require('./controllers/employee.controller');
const EmployeeService = require('./services/employee.service');

const employeeService = new EmployeeService(knex);
const employeeController = new EmployeeController(employeeService);
const employeeRoute = EmployeeRoute(employeeController);
app.use('/api/employee', employeeRoute)

const { DepartmentRoute } = require('./routes/department.route');
const DepartmentController = require('./controllers/department.controller');
const DepartmentService = require('./services/department.service');

const departmentService = new DepartmentService(knex);
const departmentController = new DepartmentController(departmentService);
const departmentRoute = DepartmentRoute(departmentController);
app.use('/api/department', departmentRoute)

const { AttendanceRoute } = require('./routes/attendance.route');
const AttendanceController = require('./controllers/attendance.controller');
const AttendanceService = require('./services/attendance.service');

const attendanceService = new AttendanceService(knex);
const attendanceController = new AttendanceController(attendanceService);
const attendanceRoute = AttendanceRoute(attendanceController);
app.use('/api/attendance', attendanceRoute)

const { LeaveRoute } = require('./routes/leave.route');
const LeaveController = require('./controllers/leave.controller');
const LeaveService = require('./services/leave.service');

const leaveService = new LeaveService(knex);
const leaveController = new LeaveController(leaveService);
const leaveRoute = LeaveRoute(leaveController);
app.use('/api/leave', leaveRoute);

const { ReimbursementRoute } = require('./routes/reimbursement.route');
const ReimbursementController = require('./controllers/reimbursement.controller');
const ReimbursementService = require('./services/reimbursement.service');

const reimbursementService = new ReimbursementService(knex);
const reimbursementController = new ReimbursementController(reimbursementService);
const reimbursementRoute = ReimbursementRoute(reimbursementController);
app.use('/api/reimbursement', reimbursementRoute)

const { DeductionRoute } = require('./routes/deduction.route');
const DeductionController = require('./controllers/deduction.controller');
const DeductionService = require('./services/deduction.service');

const deductionService = new DeductionService(knex);
const deductionController = new DeductionController(deductionService);
const deductionRoute = DeductionRoute(deductionController);
app.use('/api/deduction', deductionRoute);

const { AllowanceRoute } = require('./routes/allowance.route');
const AllowanceController = require('./controllers/allowance.controller');
const AllowanceService = require('./services/allowance.service');

const allowanceService = new AllowanceService(knex);
const allowanceController = new AllowanceController(allowanceService);
const allowanceRoute = AllowanceRoute(allowanceController);
app.use('/api/allowance', allowanceRoute);

const { BonusRoute } = require('./routes/bonus.route');
const BonusController = require('./controllers/bonus.controller')
const BonusService = require('./services/bonus.service');

const bonusService = new BonusService(knex);
const bonusController = new BonusController(bonusService);
const bonusRoute = BonusRoute(bonusController);
app.use('/api/bonus', bonusRoute)

const { PayrollRoute } = require('./routes/payroll.route');
const PayrollController = require('./controllers/payroll.controller');
const PayrollService = require('./services/payroll.service');

const payrollService = new PayrollService(knex);
const payrollController = new PayrollController(payrollService);
const payrollRoute = PayrollRoute(payrollController);
app.use('/api/payroll', payrollRoute)

const { OvertimeRoute } = require('./routes/overtime.route');
const OvertimeController = require('./controllers/overtime.controller');
const OvertimeService = require('./services/overtime.service');

const overtimeService = new OvertimeService(knex);
const overtimeController = new OvertimeController(overtimeService);
const overtimeRoute = OvertimeRoute(overtimeController);
app.use('/api/overtime', overtimeRoute)

const { LoginRoute } = require('./routes/login.route');
const LoginController = require('./controllers/login.controller');
const LoginService = require('./services/login.service');

const loginService = new LoginService(knex);
const loginController = new LoginController(loginService)
const loginRoute = LoginRoute(loginController)
app.use('/api/auth', loginRoute)

const { PositionRoute } = require('./routes/position.route')
const PositionController = require('./controllers/position.controller')
const PositionService = require('./services/position.service');

const positionService = new PositionService(knex);
const positionController = new PositionController(positionService)
const positionRoute = PositionRoute(positionController)
app.use('/api/position', positionRoute)

app.listen(5000, () => console.log('localhost:5000'))

