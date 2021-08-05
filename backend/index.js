const express = require('express');
const cors = require('cors')
const app = express();
const Knex = require('knex');
const config = require('./knexfile');
const knex = Knex(config.development);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { UserRoute } = require('./routes/user.route');
const UserController = require('./controllers/user.controller');
const UserService = require('./services/user.service');

const userService = new UserService(knex)
const userController = new UserController(userService);
const userRoute = UserRoute(userController);
app.use('/user', userRoute);

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

app.listen(3000, () => console.log('localhost:3000'))

