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

    getAllAttendance = async (text, status, dateFrom, dateTo, checkinFrom, checkinTo, checkoutFrom, checkoutTo, page, limit, employee_id) => {
        if (!page || page < 0) page = 0;
        if (!limit) limit = 10;
        let pageStart = parseInt(page) + 1;
        let pageEnd = parseInt(page) + parseInt(limit);
        let currentPage = parseInt(page)
        let currentLimit = parseInt(limit)

        const [count] = await this.knex('attendance')
            .count()
            .from(queryBuilder => {
                queryBuilder
                    .select(['employee.firstname', 'employee.lastname', 'attendance.status', 'attendance.check_in', 'attendance.check_out', 'attendance.date'])
                    .from('attendance')
                    .join('employee', 'attendance.employee_id', 'employee.id')
                    .modify((queryBuilder) => {
                        if (text) {
                            queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || attendance.employee_id) @@ plainto_tsquery('${text}')`)
                        }
                        if (dateFrom) {
                            queryBuilder.where('attendance.date', '>=', dateFrom)
                        }
                        if (dateTo) {
                            queryBuilder.where('attendance.date', '<=', dateTo)
                        }
                        if (checkinFrom) {
                            queryBuilder.where('attendance.check_in', '>=', checkinFrom)
                        }
                        if (checkinTo) {
                            queryBuilder.where('attendance.check_in', '<=', checkinTo)
                        }
                        if (checkoutFrom) {
                            queryBuilder.where('attendance.check_out', '>=', checkoutFrom)
                        }
                        if (checkoutTo) {
                            queryBuilder.where('attendance.check_out', '<=', checkoutTo)
                        }
                        if (status) {
                            queryBuilder.where('attendance.status', status)
                        }
                        if (employee_id) {
                            queryBuilder.where('attendance.employee_id', employee_id)
                        }
                    })
                    .as('count')
            })

        const attendance = await this.knex('attendance')
            .select(['attendance.id', 'attendance.employee_id', 'employee.firstname', 'employee.lastname', 'attendance.date', 'attendance.check_in', 'attendance.check_out', 'attendance.status'])
            .join('employee', 'attendance.employee_id', 'employee.id')
            .limit(currentLimit)
            .offset(page)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || attendance.employee_id) @@ plainto_tsquery('${text}')`)
                }
                if (dateFrom) {
                    queryBuilder.where('attendance.date', '>=', dateFrom)
                }
                if (dateTo) {
                    queryBuilder.where('attendance.date', '<=', dateTo)
                }
                if (checkinFrom) {
                    queryBuilder.where('attendance.check_in', '>=', checkinFrom)
                }
                if (checkinTo) {
                    queryBuilder.where('attendance.check_in', '<=', checkinTo)
                }
                if (checkoutFrom) {
                    queryBuilder.where('attendance.check_out', '>=', checkoutFrom)
                }
                if (checkoutTo) {
                    queryBuilder.where('attendance.check_out', '<=', checkoutTo)
                }
                if (status) {
                    queryBuilder.where('attendance.status', status)
                }
                if (employee_id) {
                    queryBuilder.where('attendance.employee_id', employee_id)
                }
            })

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])
            .where('status', 'available')

        if (pageEnd > count.count) {
            pageEnd = parseInt(count.count)
        }

        return { attendance: attendance, count: count, currentPage: currentPage, pageStart: pageStart, pageEnd: pageEnd, employeeList: employee, currentLimit: currentLimit }
    }

    deleteAttendance = async (id) => {
        const [attendance] = await this.knex('attendance')
            .where('id', id)
            .del(['id'])
        return attendance
    }

    updateAttendance = async (id, check_in, check_out, status) => {
        const attendance = await this.knex('attendance')
            .where('id', id)
            .update({
                check_in: check_in,
                check_out: check_out,
                status: status
            }, ['id'])
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

        return attendance
    }

    checkForConflicts = async (employeeId, date) => {
        const attendance = await this.knex('attendance')
            .where('date', date)
            .andWhere('employee_id', employeeId)
        return attendance
    }

    getAttendance = async (id) => {
        const [attendance] = await this.knex('attendance')
            .select(['attendance.id', 'attendance.employee_id', 'employee.firstname', 'employee.lastname', 'attendance.check_in', 'attendance.check_out', 'attendance.status', 'attendance.date'])
            .join('employee', 'attendance.employee_id', 'employee.id')
            .where('attendance.id', id)

        return attendance
    }

    batchDeleteAttendance = async (id) => {
        const attendance = await this.knex('attendance')
            .whereIn('id', id)
            .del(['id'])
        return attendance
    }

    batchUpdateAttendance = async (id, check_in, check_out, status) => {
        let update = {};
        if (check_in) update.check_in = check_in;
        if (check_out) update.check_out = check_out;
        if (status) update.status = status;
        const attendance = await this.knex('attendance')
            .whereIn('id', id)
            .update(update)
        return attendance
    }

    getMonthlyAttendanceByEmployee = async (employeeId, month, year) => {
        const attendance = await this.knex('attendance')
            .where('employee_id', employeeId)
            .andWhereRaw(`EXTRACT(MONTH FROM date) = ${month}`)
            .andWhereRaw(`EXTRACT(YEAR FROM date) = ${year}`)

        return attendance
    }
}

module.exports = AttendanceService