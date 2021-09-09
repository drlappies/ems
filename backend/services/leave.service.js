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

    getAllLeave = async (page, from, to, type, status, text, limit) => {
        if (!page || page < 0) page = 0;
        if (!limit) limit = 10;
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + parseInt(limit)
        let currentLimit = parseInt(limit)

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])

        const [count] = await this.knex('leave')
            .count()
            .from(queryBuilder => {
                queryBuilder
                    .select(['employee.firstname', 'employee.lastname', 'leave.reason', 'leave.from', 'leave.to', 'leave.type', 'leave.status'])
                    .from('leave')
                    .join('employee', 'leave.employee_id', 'employee.id')
                    .modify(queryBuilder => {
                        if (from) {
                            queryBuilder.where('leave.from', '>=', from)
                        }
                        if (to) {
                            queryBuilder.where('leave.to', '<=', to)
                        }
                        if (type) {
                            queryBuilder.where('leave.type', type)
                        }
                        if (text) {
                            queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || leave.id || ' ' || leave.employee_id || ' ' || leave.reason) @@ plainto_tsquery('${text}')`)
                        }
                        if (status) {
                            queryBuilder.where('leave.status', status)
                        }
                    })
                    .as('count')
            })

        const leave = await this.knex('leave')
            .join('employee', 'leave.employee_id', 'employee.id')
            .select(['leave.id', 'leave.employee_id', 'employee.firstname', 'employee.lastname', 'leave.from', 'leave.to', 'leave.type', 'leave.status'])
            .limit(currentLimit)
            .offset(currentPage)
            .orderBy('id')
            .modify(queryBuilder => {
                if (from) {
                    queryBuilder.where('leave.from', '>=', from)
                }
                if (to) {
                    queryBuilder.where('leave.to', '<=', to)
                }
                if (type) {
                    queryBuilder.where('leave.type', type)
                }
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || leave.id || ' ' || leave.employee_id || ' ' || leave.reason) @@ plainto_tsquery('${text}')`)
                }
                if (status) {
                    queryBuilder.where('leave.status', status)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        return { leave: leave, employee: employee, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count, currentLimit: currentLimit }
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

    updateLeave = async (ids, duration, type, status) => {
        const update = {}
        if (duration) update.duration = duration;
        if (type) update.type = type;
        if (status) update.status = status;

        const [leave] = await this.knex('leave')
            .select()
            .whereIn('id', ids)
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

    leaveRate = async () => {
        const [attendance] = await this.knex('attendance').count('id')
        const [leave] = await this.knex('leave').count('id')
        const rate = Math.round((leave.count / attendance.count) * 100)
        return rate
    }
}

module.exports = LeaveService