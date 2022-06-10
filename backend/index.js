import express from 'express';
import cors from 'cors'
import routeCont from './routes/index.route';

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routeCont.allowanceRoute.path, routeCont.allowanceRoute.route)
app.use(routeCont.attendanceRoute.path, routeCont.attendanceRoute.route)
app.use(routeCont.bonusRoute.path, routeCont.bonusRoute.route)
app.use(routeCont.deductionRoute.path, routeCont.deductionRoute.route)
app.use(routeCont.departmentRoute.path, routeCont.departmentRoute.route)
app.use(routeCont.employeeRoute.path, routeCont.employeeRoute.route)
app.use(routeCont.leaveRoute.path, routeCont.leaveRoute.route)
app.use(routeCont.loginRoute.path, routeCont.loginRoute.route)
app.use(routeCont.overtimeRoute.path, routeCont.overtimeRoute.route)
app.use(routeCont.payrollRoute.path, routeCont.payrollRoute.route)
app.use(routeCont.positionRoute.path, routeCont.positionRoute.route)
app.use(routeCont.reimbursementRoute.path, routeCont.reimbursementRoute.route)
app.listen(5000, () => console.log(`running: localhost:${5000}`))