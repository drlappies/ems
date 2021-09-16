class dashboardService {
    constructor(knex) {
        this.knex = knex
    }

    getMetric = async () => {
        const metric = await this.knex.select([
            this.knex('employee').where('status', 'available').count().as('employee_count'),
            this.knex('positions').count('id').as('positions_count'),
            this.knex('departments').count('id').as('departments_count'),
            this.knex('reimbursement').where('status', 'pending').count('id').as('pending_reimbursement_count'),
            this.knex('attendance').where('status', 'on_time').count('id').as('on_time_attendance_count'),
            this.knex('leave').where('status', 'approved').count('id').as('approved_leave_count'),
            this.knex('attendance').count('id').as('attendance_count'),
        ])

        return metric
    }
}

module.exports = dashboardService