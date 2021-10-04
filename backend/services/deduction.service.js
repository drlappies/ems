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
        const [deduction] = await this.knex('deduction').where('id', id).del(['id'])
        return deduction
    }

    updateDeduction = async (id, employeeId, reason, amount, date) => {
        const [deduction] = await this.knex('deduction').where('id', id).update({
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }, ['id', 'employee_id', 'reason', 'amount', 'date'])
        return deduction
    }

    getAllDeduction = async (page, limit, dateFrom, dateTo, amountFrom, amountTo, text, employee_id) => {
        if (!page || page < 0) page = 0;
        if (!limit || limit < 10) limit = 10;
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + 15
        let currentLimit = parseInt(limit)

        const employee = await this.knex('employee').select(['id', 'firstname', 'lastname'])

        const [count] = await this.knex
            .count()
            .from(queryBuilder => {
                queryBuilder
                    .select(['deduction.id', 'deduction.reason', 'deduction.employee_id', 'employee.firstname', 'employee.lastname'])
                    .from('deduction')
                    .join('employee', 'deduction.employee_id', 'employee.id')
                    .modify(queryBuilder => {
                        if (dateFrom) {
                            queryBuilder.where('deduction.date', '>=', dateFrom)
                        }
                        if (dateTo) {
                            queryBuilder.where('deduction.date', '<=', dateTo)
                        }
                        if (amountFrom) {
                            queryBuilder.where('amount', '>=', amountFrom)
                        }
                        if (amountTo) {
                            queryBuilder.where('amount', '<=', amountTo)
                        }
                        if (text) {
                            queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || deduction.reason) @@ plainto_tsquery('${text}')`)
                        }
                        if (employee_id) {
                            queryBuilder.where('deduction.employee_id', employee_id)
                        }
                    })
                    .as('count')
            })

        const deduction = await this.knex('deduction')
            .join('employee', 'deduction.employee_id', 'employee.id')
            .select(['deduction.id', 'deduction.employee_id', 'employee.firstname', 'employee.lastname', 'deduction.date', 'deduction.reason', 'deduction.amount'])
            .limit(currentLimit)
            .offset(currentPage)
            .orderBy('deduction.id')
            .modify(queryBuilder => {
                if (dateFrom) {
                    queryBuilder.where('deduction.date', '>=', dateFrom)
                }
                if (dateTo) {
                    queryBuilder.where('deduction.date', '<=', dateTo)
                }
                if (amountFrom) {
                    queryBuilder.where('amount', '>=', amountFrom)
                }
                if (amountTo) {
                    queryBuilder.where('amount', '<=', amountTo)
                }
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || deduction.reason) @@ plainto_tsquery('${text}')`)
                }
                if (employee_id) {
                    queryBuilder.where('deduction.employee_id', employee_id)
                }
            })

        if (currentPageEnd >= parseInt(count.count)) {
            currentPageEnd = parseInt(count.count)
        }

        return { deduction: deduction, employee: employee, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count, currentLimit: currentLimit }
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