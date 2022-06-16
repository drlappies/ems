class LeaveService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    getOneById = async (id) => {
        try {
            const query = (qb) => {
                qb.join('employee', 'leave.employee_id', 'employee.id')
                qb.select(['leave.id', 'leave.employee_id', 'leave.reason', 'leave.status', 'leave.duration', 'leave.from', 'leave.to', 'employee.firstname', 'employee.lastname', 'leave.type'])
                qb.where('leave.id', id)
            }

            const result = await this.repositories.leave.getOne(query)

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
            const mindate = params.mindate
            const maxdate = params.maxdate
            const status = params.status

            const query = (qb) => {
                if (search) qb.whereRaw(`to_tsvector(leave.id || ' ' || leave.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || leave.from || ' ' || leave.to || ' ' || leave.type || ' ' || leave.duration || ' ' || leave.status) @@ plainto_tsquery('${search}')`)
                if (employee_id) qb.where('leave.employee_id', '=', employee_id);
                if (mindate && maxdate) qb.whereBetween('leave.from', [mindate, maxdate])
                if (mindate && maxdate) qb.whereBetween('leave.to', [mindate, maxdate])
                if (status) qb.where('leave.status', '=', status)
                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.leave.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    createOne = async (employeeId, reason, from, to, duration, type) => {
        try {
            const model = this.models.leave.create(employeeId, reason, from, to, duration, type)
            const result = await this.repositories.leave.createOne(model, ['*'])
            return result
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            console.log(params)

            const duration = params.duration
            const type = params.type
            const status = params.status
            const reason = params.reason

            const data = {}
            console.log(reason)

            if (duration) data.duration = duration
            if (type) data.type = type
            if (status) data.status = status
            if (reason) data.reason = reason

            const result = await this.repositories.leave.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const duration = params.duration
            const type = params.type
            const status = params.status
            const reason = params.reason

            const data = {}
            if (duration) data.duration = duration
            if (type) data.type = type
            if (status) data.status = status
            if (reason) data.reason = reason

            const result = await this.repositories.leave.updateManyByIds(ids, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.leave.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.leave.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    getManyByIds = async (ids) => {
        try {
            const query = (qb) => {
                qb.whereIn('id', ids)
            }

            const result = await this.repositories.leave.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }
}

export default LeaveService