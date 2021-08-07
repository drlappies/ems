class LeaveService {
    constructor(knex) {
        this.knex = knex
    }

    getLeave = async (id) => {
        const [leave] = await this.knex('leave')
            .join('employee', 'leave.employee_id', 'employee.id')
            .select(['leave.id', 'leave.employee_id', 'leave.reason', 'leave.status', 'leave.duration', 'leave.from', 'leave.to', 'employee.firstname', 'employee.lastname'])
            .where('leave.id', id)
        return leave
    }

    getAllLeave = async () => {
        const leave = await this.knex('leave')
            .join('employee', 'leave.employee_id', 'employee.id')
            .select(['leave.id', 'leave.employee_id', 'leave.reason', 'leave.status', 'leave.duration', 'leave.from', 'leave.to', 'employee.firstname', 'employee.lastname'])
        return leave
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

    approveLeave = async (id, status) => {
        const [leave] = await this.knex('leave').select()
            .where('id', id)
            .update({
                status: status
            }, ['id', 'status'])
        return leave
    }
}

module.exports = LeaveService