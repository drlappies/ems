import Repository from './repository'

class AllowanceEmployeeRepository extends Repository {
    constructor(knex, tableName) {
        super(knex, tableName)
        this.knex = knex
        this.tableName = tableName
    }

    deleteOneByAllowanceAndEmployeeId = async (allowanceId, employeeId) => {
        try {
            await this.knex(this.tableName)
                .where('allowance_id', allowanceId)
                .andWhere('employee_id', employeeId)
                .del()
        } catch (error) {
            throw error
        }
    }
}

export default AllowanceEmployeeRepository