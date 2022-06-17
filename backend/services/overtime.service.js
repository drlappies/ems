class OvertimeService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    checkIn = async (employee) => {
        try {
            const currentTime = new Date();
            const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
            const from = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`

            const model = this.models.overtime.create(employee.id, date, from, null, 'pending')
            const result = await this.repositories.overtime.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    checkOut = async (employee) => {
        try {
            const currentTime = new Date();
            const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
            const to = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`

            const query = (qb) => {
                qb.where('date', date)
                qb.andWhere('employee_id', employee.id)
            }

            const data = {
                to: to,
            }

            const result = await this.repositories.overtime.updateOne(query, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    createOne = async (employee_id, date, from, to, status) => {
        try {
            const model = this.models.overtime.create(employee_id, date, from, to, status)

            const result = await this.repositories.overtime.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const from = params.from
            const to = params.to
            const status = params.status

            const data = {}

            if (from) data.from = from
            if (to) data.to = to
            if (status) data.status = status

            const result = await this.repositories.overtime.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const from = params.from
            const to = params.to
            const status = params.status

            const data = {}
            if (from) data.from = from
            if (to) data.to = to
            if (status) data.status = status

            const result = await this.repositories.overtime.updateManyByIds(ids, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.overtime.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.overtime.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    getMany = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const search = params.search
            const mindate = params.mindate
            const maxdate = params.maxdate
            const employee_id = params.employee_id
            const status = params.status

            const query = (qb) => {
                qb.join('employee', 'overtime.employee_id', 'employee.id')
                qb.select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
                if (search) qb.whereRaw(`to_tsvector(overtime.id || ' ' || overtime.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || overtime.from || ' ' || overtime.to || ' ' || overtime.date || ' ' || overtime.status) @@ plainto_tsquery('${search}')`)
                if (mindate && maxdate) qb.whereBetween('overtime.date', [mindate, maxdate])
                if (status) qb.where('overtime.status', '=', status)
                if (employee_id) qb.where('overtime.employee_id', '=', employee_id)
                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.overtime.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const query = (qb) => {
                qb.select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
                qb.join('employee', 'overtime.employee_id', 'employee.id')
                qb.where('overtime.id', id)
            }

            const result = await this.repositories.overtime.getOne(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getOneByEmployeeIdAndDate = async (employeeId, date) => {
        try {
            const query = (qb) => {
                qb.where('employee_id', employeeId)
                qb.andWhere('date', date)
            }

            const result = await this.repositories.overtime.getOne(query)

            return result
        } catch (error) {
            throw error
        }
    }
}

export default OvertimeService