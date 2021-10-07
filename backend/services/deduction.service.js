class DeductionService {
    constructor(knex) {
        this.knex = knex
    }

    createDeduction = async (employeeId, reason, amount, date) => {
        const [deduction] = await this.knex('deduction').insert({
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }).returning(['id', 'reason', 'amount', 'date'])
        return deduction
    }

    deleteDeduction = async (id) => {
        if (!Array.isArray(id)) id = [id]
        const [deduction] = await this.knex('deduction').whereIn('id', id).del(['id'])
        return deduction
    }

    updateDeduction = async (id, employeeId, reason, amount, date) => {
        if (!Array.isArray(id)) id = [id]
        let update = {}
        if (employeeId) update.employee_id = employeeId
        if (reason) update.reason = reason
        if (amount) update.amount = amount
        if (date) update.date = date

        const deduction = await this.knex('deduction')
            .whereIn('id', id).update(update, ['id'])
        return deduction
    }

    getAllDeduction = async (offset, limit, search, employeeId, amountFrom, amountTo) => {
        const employee = await this.knex('employee').select(['id', 'firstname', 'lastname']).where('status', '=', 'available')

        const [count] = await this.knex('deduction')
            .join('employee', 'deduction.employee_id', 'employee.id')
            .modify(qb => {
                if (employeeId) qb.where('deduction.employee_id', '=', employeeId)
                if (amountFrom && amountTo) qb.whereBetween('deduction.amount', [amountFrom, amountTo])
                if (search) qb.whereRaw(`to_tsvector(deduction.id || ' ' || deduction.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || deduction.date || ' ' || deduction.reason || ' ' || deduction.amount) @@ plainto_tsquery('${search}')`)
            })
            .count()

        const deduction = await this.knex('deduction')
            .join('employee', 'deduction.employee_id', 'employee.id')
            .select(['deduction.id', 'deduction.employee_id', 'employee.firstname', 'employee.lastname', 'deduction.date', 'deduction.reason', 'deduction.amount'])
            .modify(qb => {
                if (amountFrom && amountTo) qb.whereBetween('deduction.amount', [amountFrom, amountTo])
                if (employeeId) qb.where('deduction.employee_id', '=', employeeId)
                if (search) qb.whereRaw(`to_tsvector(deduction.id || ' ' || deduction.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || deduction.date || ' ' || deduction.reason || ' ' || deduction.amount) @@ plainto_tsquery('${search}')`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(limit) * parseInt(offset))
            .orderBy('deduction.id')

        return { employee: employee, count: count, deduction: deduction }
    }

    getDeduction = async (id) => {
        const [deduction] = await this.knex('deduction')
            .join('employee', 'deduction.employee_id', 'employee.id')
            .select(['deduction.id', 'deduction.employee_id', 'deduction.reason', 'deduction.amount', 'deduction.date', 'employee.firstname', 'employee.lastname'])
            .where('deduction.id', id)
        return deduction
    }

    getDeductionByEmployee = async (id) => {
        const deduction = await this.knex('deduction')
            .select(['deduction.id', 'deduction.reason', 'deduction.amount', 'deduction.date'])
            .where('employee_id', id)
        return deduction
    }

    batchUpdateDeduction = async (id, employee_id, date, reason, amount) => {
        if (!Array.isArray(id)) id = [id]
        let update = {};
        if (employee_id) update.employee_id = employee_id
        if (date) update.date = date
        if (reason) update.reason = reason
        if (amount) update.amount = amount
        const deduction = await this.knex('deduction')
            .whereIn('id', id)
            .update(update)

        return deduction
    }
}

module.exports = DeductionService