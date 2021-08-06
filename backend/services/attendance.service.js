const EmployeeService = require("./employee.service");

class AttendanceService extends EmployeeService {
    constructor(knex) {
        super()
        this.knex = knex
    }

    createTimeIn = async (employeeId) => {
        const currentTime = new Date()
        const check_in = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const employee = await this.getEmployee(employeeId)
        let status;
        if (check_in > employee.start_hour) {
            status = 'late'
        } else {
            status = 'on_time'
        }
        const [attendance] = await this.knex('attendance').insert({
            employee_id: employeeId,
            check_in: check_in,
            date: date,
            status: status,
        }).returning(['check_in', 'date'])
        return attendance
    }

    createTimeOut = async (employeeId) => {
        const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        const currentTime = new Date()
        const check_out = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const [attendance] = await this.knex('attendance')
            .where('date', currentDate)
            .andWhere('employee_id', employeeId)
            .update({
                check_out: check_out
            }, ['check_out', 'date'])
        return attendance
    }

    createSpecificTimeIn = async (employeeId, checkInTime, checkInDate) => {
        const employee = await this.getEmployee(employeeId);
        let status;
        if (checkInTime > employee.start_hour) {
            status = 'late'
        } else {
            status = 'on_time'
        }
        const [attendance] = await this.knex('attendance').insert({
            employee_id: employeeId,
            check_in: checkInTime,
            date: checkInDate,
            status: status
        }).returning(['check_in', 'date'])
        return attendance
    }

    checkIfAlreadyTimedIn = async (employeeId) => {
        const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        const attendance = await this.knex.select()
            .from('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', currentDate);
        return attendance
    }

    checkIfAlreadyTimedOut = async (employeeId) => {
        const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        const attendance = await this.knex.select()
            .from('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', currentDate)
            .whereNotNull('check_out')
        return attendance;
    }
}

module.exports = AttendanceService