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
        }, ['id'])
        return bonus
    }

    getAllBonus = async () => {
        const bonus = await this.knex('bonus')
            .join('employee', 'bonus.employee_id', 'employee.id')
            .select(['bonus.employee_id', 'bonus.id', 'bonus.reason', 'bonus.amount', 'bonus.date', 'employee.firstname', 'employee.lastname'])
        return bonus
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