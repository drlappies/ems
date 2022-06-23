import express from 'express';
import cors from 'cors'
import logger from './logger/logger'
import routeCont from './routes/index.route';

logger.info(`Current env: ${process.env.ENV}`)

const app = express();

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routeCont.allowance.route)
app.use(routeCont.attendance.route)
app.use(routeCont.bonus.route)
app.use(routeCont.deduction.route)
app.use(routeCont.department.route)
app.use(routeCont.employee.route)
app.use(routeCont.leave.route)
app.use(routeCont.login.route)
app.use(routeCont.overtime.route)
app.use(routeCont.payroll.route)
app.use(routeCont.position.route)
app.use(routeCont.reimbursement.route)
app.use(routeCont.allowanceEmployee.route)
app.use(routeCont.user.route)
app.listen(process.env.PORT, process.env.HOST, () => console.log(`running: ${process.env.HOST}:${process.env.PORT}`))