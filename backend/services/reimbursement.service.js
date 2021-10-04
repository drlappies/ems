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

    updateReimbursement = async (id, status, reason, date, amount) => {
        const [reimbursement] = await this.knex('reimbursement')
            .where('id', id)
            .update({
                status: status,
                reason: reason,
                date: date,
                amount: amount
            }, ['id', 'amount', 'reason', 'date', 'status'])
        return reimbursement
    }

    getAllReimbursement = async (page, limit, text, dateFrom, dateTo, amountFrom, amountTo, status, employee_id) => {
        if (!page || page < 0) page = 0;
        if (!limit || limit < 0) limit = 10;
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + parseInt(limit)
        let currentLimit = parseInt(limit)

        const [count] = await this.knex('reimbursement')
            .count()
            .from(queryBuilder => {
                queryBuilder
                    .select(['employee.firstname', 'employee.lastname', 'reimbursement.reason '])
                    .from('reimbursement')
                    .join('employee', 'reimbursement.employee_id', 'employee.id')
                    .modify((queryBuilder) => {
                        if (text) {
                            queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason || ' ' || reimbursement.id || ' ' || reimbursement.employee_id) @@ plainto_tsquery('${text}')`)
                        }
                        if (dateFrom) {
                            queryBuilder.where('reimbursement.date', '>=', dateFrom)
                        }
                        if (dateTo) {
                            queryBuilder.where('reimbursement.date', '<=', dateTo)
                        }
                        if (amountFrom) {
                            queryBuilder.where('reimbursement.amount', '>=', amountFrom)
                        }
                        if (amountTo) {
                            queryBuilder.where('reimbursement.amount', '<=', amountTo)
                        }
                        if (status) {
                            queryBuilder.where('reimbursement.status', status)
                        }
                        if (employee_id) {
                            queryBuilder.where('reimbursement.employee_id', employee_id)
                        }
                    })
                    .as('count')
            })


        const reimbursement = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.employee_id', 'employee.firstname', 'employee.lastname', 'reimbursement.reason', 'reimbursement.date', 'reimbursement.amount', 'reimbursement.status',])
            .limit(currentLimit)
            .offset(currentPage)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason || ' ' || reimbursement.id || ' ' || reimbursement.employee_id) @@ plainto_tsquery('${text}')`)
                }
                if (dateFrom) {
                    queryBuilder.where('reimbursement.date', '>=', dateFrom)
                }
                if (dateTo) {
                    queryBuilder.where('reimbursement.date', '<=', dateTo)
                }
                if (amountFrom) {
                    queryBuilder.where('reimbursement.amount', '>=', amountFrom)
                }
                if (amountTo) {
                    queryBuilder.where('reimbursement.amount', '<=', amountTo)
                }
                if (status) {
                    queryBuilder.where('reimbursement.status', status)
                }
                if (employee_id) {
                    queryBuilder.where('reimbursement.employee_id', employee_id)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        const employee = await this.knex('employee').select(['id', 'firstname', 'lastname']).where('status', 'available')

        return { reimbursement: reimbursement, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count, currentLimit: currentLimit, employeeList: employee }
    }

    getReimbursement = async (id) => {
        const [reimbursement] = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.reason', 'reimbursement.status', 'reimbursement.amount', 'reimbursement.date', 'employee.firstname', 'employee.lastname'])
            .where('reimbursement.id', id)
        return reimbursement
    }

    getReimbursementByEmployee = async (id) => {
        const reimbursement = await this.knex('reimbursement')
            .select(['id', 'reason', 'status', 'amount', 'date'])
            .where('employee_id', id)
        return reimbursement
    }

    getReimbursementCount = async () => {
        const [count] = await this.knex('reimbursement')
            .count()
            .where('status', 'pending')
        return count.count
    }

    deleteReimbursement = async (id) => {
        const [reimbursement] = await this.knex('reimbursement').where('id', id).del(['id'])
        return reimbursement
    }

    batchUpdateReimbursement = async (id, amount, date, reason, status) => {
        if (!Array.isArray(id)) id = [id]
        let update = {}
        if (amount) update.amount = amount;
        if (date) update.date = date;
        if (reason) update.reason = reason;
        if (status) update.status = status;

        const reimbursement = await this.knex('reimbursement').whereIn('id', id).update(update, ['id', 'amount', 'date', 'reason', 'status'])
        return reimbursement
    }

    batchDeleteReimbursement = async (id) => {
        if (!Array.isArray(id)) id = [id]
        const reimbursement = await this.knex('reimbursement').whereIn('id', id).del(['id'])
        return reimbursement
    }
}

module.exports = ReimbursementService