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
        }).returning(['check_in', 'date', 'status'])
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

    getTodayAttendanceByEmployee = async (employeeId) => {
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const [attendance] = await this.knex('attendance')
            .where('date', date)
            .andWhere('employee_id', employeeId)
        return attendance
    }

    getAllAttendance = async (starting, ending, page, employee_id) => {
        let pageStart = parseInt(page) + 1;
        let pageEnd = parseInt(page) + 15;
        let currentPage = parseInt(page)

        const [count] = await this.knex('attendance')
            .count('id')
            .where('date', '>=', starting)
            .andWhere('date', '<=', ending)
            .modify((queryBuilder) => {
                if (employee_id) {
                    queryBuilder.where('employee_id', employee_id)
                }
            })

        const attendance = await this.knex('attendance')
            .select(['attendance.id', 'attendance.employee_id', 'employee.firstname', 'employee.lastname', 'attendance.date', 'attendance.check_in', 'attendance.check_out', 'attendance.status'])
            .join('employee', 'attendance.employee_id', 'employee.id')
            .limit(15)
            .offset(page)
            .orderBy('id')
            .where('date', '>=', starting)
            .andWhere('date', '<=', ending)
            .modify((queryBuilder) => {
                if (employee_id) {
                    queryBuilder.where('employee_id', employee_id)
                }
            })

        if (pageEnd > count.count) {
            pageEnd = parseInt(count.count)
        }
        return { attendance: attendance, count: count, currentPage: currentPage, pageStart: pageStart, pageEnd: pageEnd }
    }

    getOnTimeRate = async () => {
        const [attendance] = await this.knex('attendance').count('status')
        const [on_time] = await this.knex('attendance').count('status').where('status', 'on_time')
        const rate = Math.round((on_time.count / attendance.count) * 100)
        return rate
    }

    deleteAttendance = async (id) => {
        const [attendance] = await this.knex('attendance')
            .where('id', id)
            .del(['id', 'employee_id', 'check_in', 'check_out', 'date', 'status'])
        return attendance
    }

    updateAttendance = async (id, check_in, check_out) => {
        const [attendance] = await this.knex('attendance')
            .where('id', id)
            .update({
                check_in: check_in,
                check_out: check_out
            }, ['id', 'check_in', 'check_out'])
        return attendance
    }

    createAttendance = async (employee_id, date, check_in, check_out, status) => {
        const [attendance] = await this.knex('attendance').insert({
            employee_id: employee_id,
            check_in: check_in,
            check_out: check_out,
            date: date,
            status: status
        }, ['id', 'employee_id', 'date'])

        const create = await this.knex('attendance')
            .join('employee', 'attendance.employee_id', 'employee.id')
            .select(['attendance.id', 'attendance.employee_id', 'employee.firstname', 'employee.lastname', 'attendance.date', 'attendance.check_in', 'attendance.check_out', 'attendance.status'])
            .where('attendance.employee_id', attendance.employee_id)
            .andWhere('attendance.date', attendance.date)
        return create
    }
}

module.exports = AttendanceService