class AttendanceService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    checkIn = async (employee) => {
        try {
            const currentTime = new Date()
            const checkInTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
            const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`

            const model = this.models.attendance.create(employee.id, date, checkInTime, null, null)

            if (checkInTime > employee.start_hour) {
                model.status = "late"
            } else {
                model.status = "on_time"
            }

            const result = await this.repositories.attendance.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    checkOut = async (employee) => {
        try {
            const currentTime = new Date()
            const checkOutTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
            const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`

            const query = (qb) => {
                qb.where('employee_id', employee.id)
                qb.andWhere('date', date)
            }

            const result = await this.repositories.attendance.updateOne(query, { check_out: checkOutTime }, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.attendance.getOneById(id)

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
            const status = params.status
            const mindate = params.mindate
            const maxdate = params.maxdate
            const employeeId = params.employeeId

            const query = (qb) => {
                qb.join('employee', 'attendance.employee_id', 'employee.id')
                qb.select(['attendance.id', 'attendance.employee_id', 'employee.firstname', 'employee.lastname', 'attendance.date', 'attendance.check_in', 'attendance.check_out', 'attendance.status'])

                if (search) qb.whereRaw(`to_tsvector(attendance.id || ' ' || attendance.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || attendance.date || ' ' || attendance.check_in || ' ' || attendance.check_out || ' ' || attendance.status) @@ plainto_tsquery('${search}')`)
                if (employeeId) qb.where('attendance.employee_id', '=', employeeId);
                if (status) qb.where('attendance.status', '=', status);
                if (mindate && maxdate) qb.whereBetween('attendance.date', [mindate, maxdate])
            }

            const result = await this.repositories.attendance.getMany(query, { offset, limit })

            return result
        } catch (error) {
            throw error
        }
    }

    getManyByIds = async (ids) => {
        try {
            const query = (qb) => {
                qb.whereIn('id', ids)
            }

            const result = await this.repositories.attendance.getMany(query)

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

            const result = await this.repositories.attendance.getOne(query)

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.attendance.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, data) => {
        try {
            const result = await this.repositories.attendance.updateOneById(id, data, ['*'])
            return result
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.attendance.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, data) => {
        try {
            const result = await this.repositories.attendance.updateManyByIds(ids, data, ['*'])
            return result
        } catch (error) {
            throw error
        }
    }

    createOne = async (employeeId, date, checkInTime, checkOutTime, status) => {
        try {
            const model = this.models.attendance.create(employeeId, date, checkInTime, checkOutTime, status)
            const result = await this.repositories.attendance.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }
}

export default AttendanceService