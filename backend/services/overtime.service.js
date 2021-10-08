class OvertimeService {
    constructor(knex) {
        this.knex = knex
    }

    createOvertimeTimein = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const from = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        const [overtimeTimein] = await this.knex('overtime').insert({
            employee_id: employee_id,
            from: from,
            date: date
        }, ['employee_id', 'from', 'date'])
        return overtimeTimein
    }

    createOvertimeTimeout = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const to = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        const [overtimeTimeout] = await this.knex('overtime')
            .where('date', date)
            .andWhere('employee_id', employee_id)
            .update({
                to: to
            }, ['id', 'employee_id', 'date', 'to'])
        return overtimeTimeout
    }

    createOvertime = async (employee_id, date, from, to, status) => {
        const [overtime] = await this.knex('overtime').insert({
            employee_id: employee_id,
            date: date,
            from: from,
            to: to,
            status: status
        }, ['id', 'from', 'to', 'date', 'status', 'employee_id'])

        const created = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .where('overtime.employee_id', overtime.employee_id)
            .andWhere('date', overtime.date)

        return created
    }

    updateOvertime = async (id, from, to, status) => {
        let update = {}
        if (from) update.from = from;
        if (to) update.to = to;
        if (status) update.status = status;
        const overtime = await this.knex('overtime')
            .where('id', id)
            .update(update, ['id'])
        return overtime
    }

    deleteOvertime = async (id) => {
        const [overtime] = await this.knex('overtime')
            .where('id', id)
            .del(['id'])
        return overtime
    }

    getAllOvertime = async (offset, limit, search, dateTo, dateFrom, employeeId, status) => {
        const [count] = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(overtime.id || ' ' || overtime.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || overtime.from || ' ' || overtime.to || ' ' || overtime.date || ' ' || overtime.status) @@ plainto_tsquery('${search}')`)
                if (dateTo && dateFrom) qb.whereBetween('overtime.date', [dateTo, dateFrom])
                if (status) qb.where('overtime.status', '=', status)
                if (employeeId) qb.where('overtime.employee_id', '=', employeeId)
            })
            .count()

        const overtime = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(overtime.id || ' ' || overtime.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || overtime.from || ' ' || overtime.to || ' ' || overtime.date || ' ' || overtime.status) @@ plainto_tsquery('${search}')`)
                if (dateTo && dateFrom) qb.whereBetween('overtime.date', [dateTo, dateFrom])
                if (status) qb.where('overtime.status', '=', status)
                if (employeeId) qb.where('overtime.employee_id', '=', employeeId)
            })
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .orderBy('id')

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])
            .where('status', 'available')

        return { overtime: overtime, employee: employee, count: count }
    }

    getOvertime = async (id) => {
        const [overtime] = await this.knex('overtime')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .join('employee', 'overtime.employee_id', 'employee.id')
            .where('overtime.id', id)

        return overtime
    }

    getEmployeeOvertimeStatus = async (employeeId) => {
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const [overtime] = await this.knex('overtime')
            .where('employee_id', employeeId)
            .andWhere('date', date)
        return overtime
    }

    checkIfTimedin = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
        return overtime
    }

    checkIfTimedout = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
            .whereNotNull('to')
        return overtime
    }

    checkForConflict = async (employee_id, date) => {
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
        if (overtime.length >= 1) {
            return true
        }
        return false
    }

    batchDeleteOvertime = async (id) => {
        const overtime = await this.knex('overtime')
            .whereIn('id', id)
            .del(['id'])
        return overtime
    }

    batchUpdateOvertime = async (id, from, to, status) => {
        let update = {}
        if (from) update.from = from;
        if (to) update.to = to;
        if (status) update.status = status;

        const overtime = await this.knex('overtime')
            .whereIn('id', id)
            .update(update)
        return overtime
    }

    getAllOvertimeByEmployee = async (employeeId, dateFrom, dateTo) => {
        const overtime = await this.knex('overtime')
            .where('employee_id', '=', employeeId)
            .whereBetween('date', [dateFrom, dateTo])
        return overtime
    }
}

module.exports = OvertimeService