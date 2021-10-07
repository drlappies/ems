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
        if (!Array.isArray(id)) id = [id];
        const position = await this.knex('positions')
            .whereIn('id', id)
            .update({ post: name }, ['id'])
        return position
    }

    getAllPosition = async (offset, limit, search) => {
        const [count] = await this.knex('positions')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(id || ' ' || post) @@ plainto_tsquery('${search}')`)
            })
            .count('id')

        const position = await this.knex('positions')
            .select(['id', 'post'])
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(id || ' ' || post) @@ plainto_tsquery('${search}')`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .orderBy('id')

        return { count: count, position: position }
    }

    getPosition = async (id) => {
        const [position] = await this.knex('positions')
            .select()
            .where('id', id)
        return position
    }

    deletePosition = async (id) => {
        if (!Array.isArray(id)) id = [id];
        const position = await this.knex('positions')
            .whereIn('id', id)
            .del(['id'])
        return position
    }

    getPositionCount = async () => {
        const [count] = await this.knex('positions')
            .count()
        return count.count
    }
}

module.exports = PositionService