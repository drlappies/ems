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
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const check_out = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const [attendance] = await this.knex('attendance')
            .where('date', date)
            .andWhere('employee_id', employeeId)
            .update({
                check_out: check_out
            }, ['check_out', 'date'])
        return attendance
    }

    createSpecificTimeIn = async (employeeId, checkInTime, checkOutTime, checkInDate) => {
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
            check_out: checkOutTime,
            date: checkInDate,
            status: status
        }).returning(['check_in', 'date'])
        return attendance
    }

    createSpecificTimeOut = async (employeeId, checkOutTime, checkInDate) => {
        const [attendance] = await this.knex('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', checkInDate)
            .whereNull('check_out')
            .update({
                check_out: checkOutTime
            }, ['check_out', 'date'])
        return attendance
    }

    checkIfSpecificAlreadyTimedIn = async (employeeId, checkInDate) => {
        const attendance = await this.knex.select()
            .from('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', checkInDate)
        return attendance;
    }

    checkIfSpecificAlreadyTimedOut = async (employeeId, checkInDate) => {
        const attendance = await this.knex.select()
            .from('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', checkInDate)
            .whereNull('check_out')
        return attendance
    }

    checkIfAlreadyTimedIn = async (employeeId) => {
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const attendance = await this.knex.select()
            .from('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', date);
        return attendance
    }

    checkIfAlreadyTimedOut = async (employeeId) => {
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const attendance = await this.knex.select()
            .from('attendance')
            .where('employee_id', employeeId)
            .andWhere('date', date)
            .whereNotNull('check_out')
        return attendance;
    }
}

module.exports = AttendanceService