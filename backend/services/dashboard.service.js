class dashboardService {
    constructor(knex) {
        this.knex = knex
    }

    getMetric = async () => {
        const metric = await this.knex
            .unionAll([
                this.knex.select().from('employee').where('status', 'available').count(),
                this.knex.select().from('positions').count(),
                this.knex.select().from('departments').count(),
                this.knex.select().from('reimbursement').where('status', 'pending').count(),
                this.knex.select().from('attendance').where('status', 'on_time').count(),
                this.knex.select().from('leave').where('status', 'approved').count(),
                this.knex.select().from('attendance').count(),
            ])
        return metric
    }
}

module.exports = dashboardService