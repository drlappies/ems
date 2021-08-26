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
        const [bonus] = await this.knex('bonus').where('id', id).update({
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }, ['id', 'reason', 'amount', 'date'])
        return bonus
    }

    getAllBonus = async (page, dateFrom, dateTo, amountFrom, amountTo, text) => {
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + 15

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
                    })
                    .as('count')
            })

        const bonus = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.id', 'bonus.employee_id', 'employee.firstname', 'employee.lastname', 'bonus.date', 'bonus.reason', 'bonus.amount'])
            .limit(15)
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
            })

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        return { bonus: bonus, employee: employee, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count }
    }

    getBonus = async (id) => {
        const [bonus] = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.employee_id', 'bonus.id', 'bonus.reason', 'bonus.amount', 'bonus.date', 'employee.firstname', 'employee.lastname'])
            .where('bonus.id', id)

        return bonus
    }
}

module.exports = BonusService