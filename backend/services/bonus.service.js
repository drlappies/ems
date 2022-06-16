class BonusService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (employeeId, reason, amount, date) => {
        try {
            const model = this.models.bonus.create(employeeId, reason, amount, date)
            const result = await this.repositories.bonus.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.bonus.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const data = {};

            if (params.employeeId) data.employee_id = params.employee_id
            if (params.reason) data.reason = params.reason
            if (params.amount) data.amount = params.amount
            if (params.date) data.date = params.date

            const result = await this.repositories.bonus.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getMany = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const search = params.search
            const employee_id = params.employee_id
            const minamount = params.minamount
            const maxamount = params.maxamount

            const query = qb => {
                qb.join('employee', 'bonus.employee_id', 'employee.id')
                qb.select(['bonus.id', 'bonus.employee_id', 'employee.firstname', 'employee.lastname', 'bonus.date', 'bonus.reason', 'bonus.amount'])
                if (minamount && maxamount) qb.whereBetween('bonus.amount', [minamount, maxamount])
                if (employee_id) qb.where('bonus.employee_id', '=', employee_id)
                if (search) qb.whereRaw(`to_tsvector(bonus.id || ' ' || bonus.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || bonus.date || ' ' || bonus.reason || ' ' || bonus.amount) @@ plainto_tsquery('${search}')`)
                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.bonus.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.bonus.getOneById(id)

            return result
        } catch (error) {
            throw error
        }
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

export default BonusService