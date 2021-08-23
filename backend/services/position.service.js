class PositionService {
    constructor(knex) {
        this.knex = knex
    }

    createPosition = async (name) => {
        const [position] = await this.knex('positions').insert({
            post: name
        }, ['id', 'post'])
        return position
    }

    updatePosition = async (id, name) => {
        const [position] = await this.knex('positions')
            .where('id', id)
            .update({
                post: name
            }, ['id', 'post'])
        return position
    }

    getAllPosition = async () => {
        const position = await this.knex('positions').select()
        return position
    }

    getPosition = async (id) => {
        const [position] = await this.knex('positions').select().where('id', id)
        return position
    }

    deletePosition = async (id) => {
        const [position] = await this.knex('positions')
            .where('id', id)
            .del(['id', 'post'])
        return position
    }
}

module.exports = PositionService