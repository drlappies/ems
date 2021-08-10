const express = require('express');
const cors = require('cors')
const app = express();
const Knex = require('knex');
const config = require('./knexfile');
const knex = Knex(config.development);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { EmployeeRoute } = require('./routes/employee.route');
const EmployeeController = require('./controllers/employee.controller');
const EmployeeService = require('./services/employee.service');

const employeeService = new EmployeeService(knex);
const employeeController = new EmployeeController(employeeService);
const employeeRoute = EmployeeRoute(employeeController);
app.use('/employee', employeeRoute)

const { DepartmentRoute } = require('./routes/department.route');
const DepartmentController = require('./controllers/department.controller');
const DepartmentService = require('./services/department.service');

const departmentService = new DepartmentService(knex);
const departmentController = new DepartmentController(departmentService);
const departmentRoute = DepartmentRoute(departmentController);
app.use('/department', departmentRoute)

const { AttendanceRoute } = require('./routes/attendance.route');
const AttendanceController = require('./controllers/attendance.controller');
const AttendanceService = require('./services/attendance.service');

const attendanceService = new AttendanceService(knex);
const attendanceController = new AttendanceController(attendanceService);
const attendanceRoute = AttendanceRoute(attendanceController);
app.use('/attendance', attendanceRoute)

const { LeaveRoute } = require('./routes/leave.route');
const LeaveController = require('./controllers/leave.controller');
const LeaveService = require('./services/leave.service');

const leaveService = new LeaveService(knex);
const leaveController = new LeaveController(leaveService);
const leaveRoute = LeaveRoute(leaveController);
app.use('/leave', leaveRoute);

const { ReimbursementRoute } = require('./routes/reimbursement.route');
const ReimbursementController = require('./controllers/reimbursement.controller');
const ReimbursementService = require('./services/reimbursement.service');

const reimbursementService = new ReimbursementService(knex);
const reimbursementController = new ReimbursementController(reimbursementService);
const reimbursementRoute = ReimbursementRoute(reimbursementController);
app.use('/reimbursement', reimbursementRoute)

const { DeductionRoute } = require('./routes/deduction.route');
const DeductionController = require('./controllers/deduction.controller');
const DeductionService = require('./services/deduction.service');

const deductionService = new DeductionService(knex);
const deductionController = new DeductionController(deductionService);
const deductionRoute = DeductionRoute(deductionController);
app.use('/deduction', deductionRoute);

const { AllowanceRoute } = require('./routes/allowance.route');
const AllowanceController = require('./controllers/allowance.controller');
const AllowanceService = require('./services/allowance.service');

const allowanceService = new AllowanceService(knex);
const allowanceController = new AllowanceController(allowanceService);
const allowanceRoute = AllowanceRoute(allowanceController);
app.use('/allowance', allowanceRoute);

const { BonusRoute } = require('./routes/bonus.route');
const BonusController = require('./controllers/bonus.controller')
const BonusService = require('./services/bonus.service');

const bonusService = new BonusService(knex);
const bonusController = new BonusController(bonusService);
const bonusRoute = BonusRoute(bonusController);
app.use('/bonus', bonusRoute)

app.listen(3000, () => console.log('localhost:3000'))

