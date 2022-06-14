class AllowanceEmployeeService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (employeeId, allowanceId) => {
        try {
            const model = this.models.allowanceEmployee.create(employeeId, allowanceId)
            const result = await this.repositories.allowanceEmployee.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getOneByAllowanceAndEmployeeId = async (allowanceId, employeeId) => {
        try {
            const query = (qb) => {
                qb.where('allowance_id', allowanceId)
                qb.andWhere('employee_id', employeeId)
            }

            const result = await this.repositories.allowanceEmployee.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getManyByEmployeeId = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const employeeId = params.employeeId

            const query = (qb) => {
                qb.join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
                qb.select('allowance.id', 'allowance.name', 'allowance.description', 'allowance.amount', 'allowance.status')
                qb.where('allowance_employee.employee_id', employeeId)

                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.allowanceEmployee.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getManyByAllowanceId = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const allowanceId = params.allowanceId

            const query = (qb) => {
                qb.join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
                qb.select('allowance.id', 'allowance.name', 'allowance.description', 'allowance.amount', 'allowance.status')
                qb.where('allowance_employee.allowance_id', allowanceId)

                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.allowanceEmployee.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneByAllowanceAndEmployeeId = async (allowanceId, employeeId) => {
        try {
            await this.repositories.allowanceEmployee.deleteOneByAllowanceAndEmployeeId(allowanceId, employeeId)
        } catch (error) {
            throw error
        }
    }
}

export default AllowanceEmployeeService