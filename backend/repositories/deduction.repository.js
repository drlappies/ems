import Repository from './repository'

class DeductionRepository extends Repository {
    constructor(knex, tableName) {
        super(knex, tableName)
        this.knex = knex
        this.tableName = tableName
    }
}

export default DeductionRepository