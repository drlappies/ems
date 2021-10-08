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
        if (!Array.isArray(id)) id = [id]
        const bonus = await this.knex('bonus').whereIn('id', id).del(['id'])
        return bonus
    }

    editBonus = async (id, employeeId, reason, amount, date) => {
        if (!Array.isArray(id)) id = [id]
        let update = {};
        if (employeeId) update.employee_id = employeeId
        if (date) update.date = date;
        if (reason) update.reason = reason;
        if (amount) update.amount = amount;
        const [bonus] = await this.knex('bonus')
            .whereIn('id', id)
            .update(update, ['id'])
        return bonus
    }

    getAllBonus = async (offset, limit, search, employeeId, amountFrom, amountTo) => {
        const [count] = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .modify(qb => {
                if (amountFrom && amountTo) qb.whereBetween('bonus.amount', [amountFrom, amountTo])
                if (employeeId) qb.where('bonus.employee_id', '=', employeeId)
                if (search) qb.whereRaw(`to_tsvector(bonus.id || ' ' || bonus.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || bonus.date || ' ' || bonus.reason || ' ' || bonus.amount) @@ plainto_tsquery('${search}')`)
            })
            .count()

        const bonus = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.id', 'bonus.employee_id', 'employee.firstname', 'employee.lastname', 'bonus.date', 'bonus.reason', 'bonus.amount'])
            .modify(qb => {
                if (amountFrom && amountTo) qb.whereBetween('bonus.amount', [amountFrom, amountTo])
                if (employeeId) qb.where('bonus.employee_id', '=', employeeId)
                if (search) qb.whereRaw(`to_tsvector(bonus.id || ' ' || bonus.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || bonus.date || ' ' || bonus.reason || ' ' || bonus.amount) @@ plainto_tsquery('${search}')`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(limit) * parseInt(offset))
            .orderBy('bonus.id')

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])

        return { count: count, bonus: bonus, employee: employee }
    }

    getBonus = async (id) => {
        const [bonus] = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.employee_id', 'bonus.id', 'bonus.reason', 'bonus.amount', 'bonus.date', 'employee.firstname', 'employee.lastname'])
            .where('bonus.id', id)

        return bonus
    }

    getBonusByEmployee = async (id, offset, limit) => {
        const [count] = await this.knex('bonus').where('employee_id', id).count()

        const bonus = await this.knex('bonus')
            .select(['bonus.id', 'bonus.reason', 'bonus.amount', 'bonus.date'])
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .where('employee_id', id)

        return { bonus: bonus, count: count }
    }
}

module.exports = BonusService