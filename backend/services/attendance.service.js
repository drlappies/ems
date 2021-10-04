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

    getAllAttendance = async (offset, limit, search, employeeId, status, dateFrom, dateTo) => {
        offset = parseInt(offset) * parseInt(limit)
        limit = parseInt(limit)

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])
            .orderBy('id')

        const attendance = await this.knex('attendance')
            .select(['attendance.id', 'attendance.employee_id', 'employee.firstname', 'employee.lastname', 'attendance.date', 'attendance.check_in', 'attendance.check_out', 'attendance.status'])
            .join('employee', 'attendance.employee_id', 'employee.id')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(attendance.id || ' ' || attendance.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || attendance.date || ' ' || attendance.check_in || ' ' || attendance.check_out || ' ' || attendance.status) @@ plainto_tsquery('${search}')`)
                if (employeeId) qb.where('attendance.employee_id', '=', employeeId);
                if (status) qb.where('attendance.status', '=', status);
                if (dateFrom && dateTo) qb.whereBetween('attendance.date', [dateFrom, dateTo])
            })
            .offset(offset)
            .limit(limit)
            .orderBy('id')

        const [rowCount] = await this.knex('attendance')
            .join('employee', 'attendance.employee_id', 'employee.id')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(attendance.id || ' ' || attendance.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || attendance.date || ' ' || attendance.check_in || ' ' || attendance.check_out || ' ' || attendance.status) @@ plainto_tsquery('${search}')`)
                if (employeeId) qb.where('attendance.employee_id', '=', employeeId);
                if (status) qb.where('attendance.status', '=', status);
                if (dateFrom && dateTo) qb.whereBetween('attendance.date', [dateFrom, dateTo])
            }).count()

        return { attendance: attendance, rowCount: rowCount, employee: employee }
    }

    deleteAttendance = async (id) => {
        const [attendance] = await this.knex('attendance')
            .where('id', id)
            .del(['id'])
        return attendance
    }

    updateAttendance = async (id, check_in, check_out, status) => {
        let update = {};
        if (check_in) update.check_in = check_in;
        if (check_out) update.check_out = check_out;
        if (status) update.status = status;
        const attendance = await this.knex('attendance')
            .where('id', id)
            .update(update, ['id'])
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