class DeductionService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (employeeId, reason, amount, date) => {
        try {
            const model = this.models.deduction.create(employeeId, reason, amount, date)
            const result = await this.repositories.deduction.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.deduction.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.deduction.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const reason = params.reason
            const amount = params.amount
            const date = params.date
            const employee_id = params.employee_id

            console.log(amount)

            const data = {}

            if (reason) data.reason = reason
            if (amount) data.amount = amount
            if (date) data.date = date
            if (employee_id) data.employee_id = employee_id

            const result = await this.repositories.deduction.updateOneById(id, data, ['*'])

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
            const employeeId = params.employee_id
            const minamount = params.minamount
            const maxamount = params.maxamount

            const query = (qb) => {
                qb.join('employee', 'deduction.employee_id', 'employee.id')
                qb.select(['deduction.id', 'deduction.employee_id', 'employee.firstname', 'employee.lastname', 'deduction.date', 'deduction.reason', 'deduction.amount'])

                if (employeeId) qb.where('deduction.employee_id', employeeId)
                if (search) qb.whereRaw(`to_tsvector(deduction.id || ' ' || deduction.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || deduction.date || ' ' || deduction.reason || ' ' || deduction.amount) @@ plainto_tsquery('${search}')`)
                if (minamount && maxamount) qb.whereBetween('deduction.amount', [minamount, maxamount])

                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.deduction.getMany(query)

            return { result }
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const query = qb => {
                qb.join('employee', 'deduction.employee_id', 'employee.id')
                qb.select(['deduction.id', 'deduction.employee_id', 'deduction.reason', 'deduction.amount', 'deduction.date', 'employee.firstname', 'employee.lastname'])
                qb.where('deduction.id', id)
            }

            const result = await this.repositories.deduction.getOne(query)

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const employeeId = params.employee_id
            const date = params.date
            const reason = params.reason
            const amount = params.amount

            const data = {}
            if (employeeId) data.employee_id = employeeId
            if (date) data.date = date
            if (reason) data.reason = reason
            if (amount) data.amount = amount

            const result = await this.repositories.deduction.updateManyByIds(ids, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }
}

export default DeductionService