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
        if (!Array.isArray(id)) id = [id]
        let update = { id: id };
        if (status) update.status = status
        if (reason) update.reason = reason
        if (amount) update.amount = amount
        if (date) update.date = date

        const reimbursement = await this.knex('reimbursement')
            .whereIn('id', id)
            .update(update, ['id'])
        return reimbursement
    }

    getAllReimbursement = async (offset, limit, search, employeeId, status, dateFrom, dateTo, amountFrom, amountTo) => {
        const [count] = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .modify(qb => {
                if (amountFrom && amountTo) qb.whereBetween('reimbursement.amount', [amountFrom, amountTo])
                if (dateFrom && dateTo) qb.whereBetween('reimbursement.date', [dateFrom, dateTo])
                if (status) qb.where('reimbursement.status', '=', status)
                if (employeeId) qb.where('reimbursement.employee_id', '=', employeeId)
                if (search) qb.whereRaw(`to_tsvector(reimbursement.id || ' ' || reimbursement.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason || ' ' || reimbursement.date || ' ' || reimbursement.amount || reimbursement.status) @@ plainto_tsquery('${search}')`)
            })
            .count()

        const reimbursement = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.employee_id', 'employee.firstname', 'employee.lastname', 'reimbursement.reason', 'reimbursement.date', 'reimbursement.amount', 'reimbursement.status',])
            .modify(qb => {
                if (amountFrom && amountTo) qb.whereBetween('reimbursement.amount', [amountFrom, amountTo])
                if (dateFrom && dateTo) qb.whereBetween('reimbursement.date', [dateFrom, dateTo])
                if (status) qb.where('reimbursement.status', '=', status)
                if (employeeId) qb.where('reimbursement.employee_id', '=', employeeId)
                if (search) qb.whereRaw(`to_tsvector(reimbursement.id || ' ' || reimbursement.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason || ' ' || reimbursement.date || ' ' || reimbursement.amount || reimbursement.status) @@ plainto_tsquery('${search}')`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(limit) * parseInt(offset))
            .orderBy('id')

        const employee = await this.knex('employee').select(['id', 'firstname', 'lastname']).where('status', 'available')

        return { count: count, reimbursement: reimbursement, employee: employee }
    }

    getReimbursement = async (id) => {
        const [reimbursement] = await this.knex('reimbursement')
            .join('employee', 'reimbursement.employee_id', 'employee.id')
            .select(['reimbursement.id', 'reimbursement.reason', 'reimbursement.status', 'reimbursement.amount', 'reimbursement.date', 'employee.firstname', 'employee.lastname', 'reimbursement.employee_id'])
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
        if (!Array.isArray(id)) id = [id]
        const reimbursement = await this.knex('reimbursement').whereIn('id', id).del(['id'])
        return reimbursement
    }
}

module.exports = ReimbursementService