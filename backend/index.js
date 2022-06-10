import express from 'express';
import cors from 'cors'
import logger from './logger/logger'
import routeCont from './routes/index.route';

logger.info(`Current env: ${process.env.ENV}`)

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
app.listen(process.env.PORT, process.env.HOST, () => console.log(`running: ${process.env.HOST}:${process.env.PORT}`))