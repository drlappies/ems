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

    updateReimbursement = async (id, status) => {
        const [reimbursement] = await this.knex('reimbursement').update({
            status: status
        }, ['id', 'status'])
            .where('id', id)
        return reimbursement
    }

    getAllReimbursement = async (page, text, from, to, status) => {
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + 15

        const [count] = await this.knex('reimbursement')
            .count('id')
            .modify((queryBuilder) => {
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason) @@ plainto_tsquery('${text}')`)
                }
                if (from) {
                    queryBuilder.where('reimbursement.date', '>=', from)
                }
                if (to) {
                    queryBuilder.where('reimbursement.date', '<=', to)
                }
                if (status) {
                    queryBuilder.where('reimbursement.status', status)
                }
            })

        const reimbursement = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.employee_id', 'employee.firstname', 'employee.lastname', 'reimbursement.reason', 'reimbursement.date', 'reimbursement.amount', 'reimbursement.status',])
            .limit(15)
            .offset(currentPage)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason) @@ plainto_tsquery('${text}')`)
                }
                if (from) {
                    queryBuilder.where('reimbursement.date', '>=', from)
                }
                if (to) {
                    queryBuilder.where('reimbursement.date', '<=', to)
                }
                if (status) {
                    queryBuilder.where('reimbursement.status', status)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        return { reimbursement: reimbursement, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count }
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