class ReimbursementService {
    constructor(knex) {
        this.knex = knex
    }

    createReimbursement = async (employeeId, date, amount, reason) => {
        const [reimbursement] = await this.knex('reimbursement').insert({
            employee_id: employeeId,
            date: date,
            amount: amount,
            reason: reason
        }).returning(['date', 'amount', 'reason'])
        return reimbursement
    }

    approveReimbursement = async (id, status) => {
        const [reimbursement] = await this.knex('reimbursement').update({
            status: status
        }, ['id', 'status'])
            .where('id', id)
        return reimbursement
    }

    getAllReimbursement = async (query) => {
        let status;
        if (query) {
            status = query;
            const reimbursement = await this.knex('reimbursement')
                .join('employee', 'reimbursement.employee_id', 'employee.id')
                .select(['reimbursement.id', 'reimbursement.employee_id', 'reimbursement.reason', 'reimbursement.status', 'reimbursement.amount', 'reimbursement.date', 'employee.firstname', 'employee.lastname'])
                .where('status', status)
            return reimbursement
        }
        const reimbursement = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.employee_id', 'reimbursement.reason', 'reimbursement.status', 'reimbursement.amount', 'reimbursement.date', 'employee.firstname', 'employee.lastname'])
        return reimbursement
    }

    getReimbursement = async (id) => {
        const [reimbursement] = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.employee_id', 'reimbursement.reason', 'reimbursement.status', 'reimbursement.amount', 'reimbursement.date', 'employee.firstname', 'employee.lastname'])
            .where('reimbursement.id', id)
        return reimbursement
    }
}

module.exports = ReimbursementService