import Repository from './repository'

class AllowanceRepository extends Repository {
    constructor(knex, tableName) {
        super(knex, tableName)
        this.knex = knex
        this.tableName = tableName
    }
}

export default AllowanceRepository