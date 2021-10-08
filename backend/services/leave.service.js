class LeaveService {
    constructor(knex) {
        this.knex = knex
    }

    getLeave = async (id) => {
        const [leave] = await this.knex('leave')
            .join('employee', 'leave.employee_id', 'employee.id')
            .select(['leave.id', 'leave.employee_id', 'leave.reason', 'leave.status', 'leave.duration', 'leave.from', 'leave.to', 'employee.firstname', 'employee.lastname', 'leave.type'])
            .where('leave.id', id)
        return leave
    }

    getAllLeave = async (offset, limit, search, employeeId, dateFrom, dateTo, status) => {
        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])

        const [count] = await this.knex('leave')
            .join('employee', 'leave.employee_id', 'employee.id')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(leave.id || ' ' || leave.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || leave.from || ' ' || leave.to || ' ' || leave.type || ' ' || leave.duration || ' ' || leave.status) @@ plainto_tsquery('${search}')`)
                if (employeeId) qb.where('leave.employee_id', '=', employeeId);
                if (dateFrom && dateTo) qb.whereBetween('leave.from', [dateFrom, dateTo])
                if (dateFrom && dateTo) qb.whereBetween('leave.to', [dateFrom, dateTo])
                if (status) qb.where('leave.status', '=', status)
            })
            .count()

        const leave = await this.knex('leave')
            .join('employee', 'leave.employee_id', 'employee.id')
            .select(['leave.id', 'leave.employee_id', 'employee.firstname', 'employee.lastname', 'leave.from', 'leave.to', 'leave.type', 'leave.duration', 'leave.status'])
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(leave.id || ' ' || leave.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || leave.from || ' ' || leave.to || ' ' || leave.type || ' ' || leave.duration || ' ' || leave.status) @@ plainto_tsquery('${search}')`)
                if (employeeId) qb.where('leave.employee_id', '=', employeeId);
                if (dateFrom && dateTo) qb.whereBetween('leave.from', [dateFrom, dateTo])
                if (dateFrom && dateTo) qb.whereBetween('leave.to', [dateFrom, dateTo])
                if (status) qb.where('leave.status', '=', status)
            })
            .orderBy('id')

        return { leave: leave, count: count, employee: employee }
    }

    createLeave = async (employeeId, reason, from, to, duration, type) => {
        const [leave] = await this.knex.insert({
            employee_id: employeeId,
            reason: reason,
            from: from,
            to: to,
            duration: duration,
            type: type
        })
            .into('leave')
            .returning(['reason', 'from', 'to', 'duration', 'type'])
        return leave
    }

    updateLeave = async (id, duration, type, status) => {
        if (!Array.isArray(id)) id = [id];
        let update = {}
        if (duration) update.duration = duration;
        if (type) update.type = type;
        if (status) update.status = status;
        const [leave] = await this.knex('leave')
            .whereIn('id', id)
            .update(update, ['id'])
        return leave
    }

    deleteLeave = async (ids) => {
        const [leave] = await this.knex('leave')
            .whereIn('id', ids)
            .del(['id'])
        return leave
    }

    checkLeaveConflict = async (employeeId, from, to) => {
        const leave = await this.knex('leave')
            .where(queryBuilder => queryBuilder.where('from', '<=', to).andWhere('to', '>=', from))
            .andWhere('employee_id', employeeId)
        return leave
    }

    checkAnnualLeave = async (employeeId) => {
        const [employeeAL] = await this.knex('employee')
            .select('annual_leave_count')
            .where('id', employeeId)

        return employeeAL
    }

    getAllLeaveByEmployee = async (employeeId, dateFrom, dateTo) => {
        const leave = await this.knex('leave')
            .where('employee_id', '=', employeeId)
            .whereBetween('from', [dateFrom, dateTo])
            .whereBetween('to', [dateFrom, dateTo])

        return leave
    }
}

module.exports = LeaveService