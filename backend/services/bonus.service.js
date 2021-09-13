class BonusService {
    constructor(knex) {
        this.knex = knex
    }

    createBonus = async (employeeId, reason, amount, date) => {
        const [bonus] = await this.knex('bonus').insert({
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }).returning(['id', 'employee_id', 'reason', 'amount', 'date'])
        return bonus
    }

    deleteBonus = async (id) => {
        const [bonus] = await this.knex('bonus').where('id', id).del(['id'])
        return bonus
    }

    editBonus = async (id, employeeId, reason, amount, date) => {
        const [bonus] = await this.knex('bonus')
            .where('id', id)
            .update({
                employee_id: employeeId,
                reason: reason,
                amount: amount,
                date: date
            }, ['id'])
        return bonus
    }

    getAllBonus = async (page, limit, dateFrom, dateTo, amountFrom, amountTo, text, employee_id) => {
        if (!page || page < 0) page = 0;
        if (!limit || limit < 0) limit = 10;
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + parseInt(limit)
        let currentLimit = parseInt(limit)

        const [count] = await this.knex
            .count()
            .from(queryBuilder => {
                queryBuilder
                    .select(['bonus.id', 'bonus.employee_id', 'employee.firstname', 'employee.lastname', 'bonus.date', 'bonus.reason', 'bonus.amount'])
                    .from('bonus')
                    .join('employee', 'bonus.employee_id', 'employee.id')
                    .modify((queryBuilder) => {
                        if (dateFrom) {
                            queryBuilder.where('date', '>=', dateFrom)
                        }
                        if (dateTo) {
                            queryBuilder.where('date', '<=', dateTo)
                        }
                        if (amountFrom) {
                            queryBuilder.where('amount', '>=', amountFrom)
                        }
                        if (amountTo) {
                            queryBuilder.where('amount', '<=', amountTo)
                        }
                        if (text) {
                            queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || bonus.reason ) @@ plainto_tsquery('${text}')`)
                        }
                        if (employee_id) {
                            queryBuilder.where('bonus.employee_id', employee_id)
                        }
                    })
                    .as('count')
            })

        const bonus = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.id', 'bonus.employee_id', 'employee.firstname', 'employee.lastname', 'bonus.date', 'bonus.reason', 'bonus.amount'])
            .limit(currentLimit)
            .offset(currentPage)
            .orderBy('bonus.id')
            .modify((queryBuilder) => {
                if (dateFrom) {
                    queryBuilder.where('date', '>=', dateFrom)
                }
                if (dateTo) {
                    queryBuilder.where('date', '<=', dateTo)
                }
                if (amountFrom) {
                    queryBuilder.where('amount', '>=', amountFrom)
                }
                if (amountTo) {
                    queryBuilder.where('amount', '<=', amountTo)
                }
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || bonus.reason ) @@ plainto_tsquery('${text}')`)
                }
                if (employee_id) {
                    queryBuilder.where('bonus.employee_id', employee_id)
                }
            })

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        return { bonus: bonus, employee: employee, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count, currentLimit: currentLimit }
    }

    getBonus = async (id) => {
        const [bonus] = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.employee_id', 'bonus.id', 'bonus.reason', 'bonus.amount', 'bonus.date', 'employee.firstname', 'employee.lastname'])
            .where('bonus.id', id)

        return bonus
    }

    batchUpdateBonus = async (id, employee_id, date, reason, amount) => {
        if (!Array.isArray(id)) id = [id]

        let update = {};
        if (employee_id) update.employee_id = employee_id;
        if (date) update.date = date;
        if (reason) update.reason = reason;
        if (amount) update.amount = amount;

        const bonus = await this.knex('bonus').whereIn('id', id).update(update)

        return bonus
    }

    batchDeleteBonus = async (id) => {
        if (!Array.isArray(id)) id = [id]
        const bonus = await this.knex('bonus').whereIn('id', id).del()
        return bonus
    }
}

module.exports = BonusService