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

    getAllPosition = async (page, name, limit) => {
        if (!page || page < 0) page = 0;
        if (!limit || limit < 0) limit = 10;

        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + parseInt(limit)
        let currentLimit = parseInt(limit)

        const [count] = await this.knex('positions')
            .count('id')
            .modify((queryBuilder) => {
                if (name) {
                    queryBuilder.whereRaw(`to_tsvector(post) @@ to_tsquery('${name}')`)
                }
            })

        const position = await this.knex('positions')
            .select()
            .limit(currentLimit)
            .offset(currentPage)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (name) {
                    queryBuilder.whereRaw(`to_tsvector(post) @@ to_tsquery('${name}')`)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        return { position: position, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, count: count.count, currentLimit: currentLimit }
    }

    getPosition = async (id) => {
        const [position] = await this.knex('positions')
            .select()
            .where('id', id)
        return position
    }

    deletePosition = async (id) => {
        const [position] = await this.knex('positions')
            .where('id', id)
            .del(['id', 'post'])
        return position
    }

    getPositionCount = async () => {
        const [count] = await this.knex('positions')
            .count()
        return count.count
    }

    batchDeletePosition = async (id) => {
        const position = await this.knex('positions').whereIn('id', id).del(['id'])
        return position
    }
}

module.exports = PositionService