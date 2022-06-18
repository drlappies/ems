class ReimbursementService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (employee_id, date, amount, reason, status) => {
        try {
            const model = this.models.reimbursement.create(employee_id, date, amount, reason, status)
            const result = await this.repositories.reimbursement.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const status = params.status
            const reason = params.reason
            const amount = params.amount
            const date = params.date

            const data = {}
            if (status) data.status = status
            if (reason) data.reason = reason
            if (amount) data.amount = amount
            if (date) data.date = date

            const result = await this.repositories.reimbursement.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const status = params.status
            const reason = params.reason
            const amount = params.amount
            const date = params.date

            const data = {}
            if (status) data.status = status
            if (reason) data.reason = reason
            if (amount) data.amount = amount
            if (date) data.date = date

            const result = await this.repositories.reimbursement.updateManyByIds(ids, data, ['*'])

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
            const status = params.status
            const mindate = params.mindate
            const maxdate = params.maxdate
            const minamount = params.minamount
            const maxamount = params.maxamount

            const query = (qb) => {
                qb.join('employee', 'reimbursement.employee_id', 'employee.id')
                qb.select(['reimbursement.id', 'reimbursement.employee_id', 'employee.firstname', 'employee.lastname', 'reimbursement.reason', 'reimbursement.date', 'reimbursement.amount', 'reimbursement.status',])
                if (employee_id) qb.where('reimbursement.employee_id', employee_id)
                if (search) qb.whereRaw(`to_tsvector(reimbursement.id || ' ' || reimbursement.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || reimbursement.reason || ' ' || reimbursement.date || ' ' || reimbursement.amount || reimbursement.status) @@ plainto_tsquery('${search}')`)
                if (status) qb.where('reimbursement.status', '=', status)
                if (mindate && maxdate) qb.whereBetween('reimbursement.date', [mindate, maxdate])
                if (minamount && maxamount) qb.whereBetween('reimbursement.amount', [minamount, maxamount])
                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.reimbursement.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.reimbursement.getOneById(id)

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.reimbursement.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.reimbursement.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }
}

export default ReimbursementService