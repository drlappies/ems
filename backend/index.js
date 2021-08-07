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

app.listen(3000, () => console.log('localhost:3000'))

