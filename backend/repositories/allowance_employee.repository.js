import Repository from './repository'

class AllowanceEmployeeRepository extends Repository {
    constructor(knex, tableName) {
        super(knex, tableName)
        this.knex = knex
        this.tableName = tableName
    }
}

export default AllowanceEmployeeRepository