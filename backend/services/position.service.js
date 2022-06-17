class PositionService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (post) => {
        try {
            const model = this.models.position.create(post)
            const result = await this.repositories.position.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const post = params.post

            const data = {}
            if (post) data.post = post

            const result = await this.repositories.position.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const post = params.post

            const data = {}
            if (post) data.post = post

            const result = await this.repositories.position.updateManyByIds(ids, data, ['*'])

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

            const query = qb => {
                qb.select(['id', 'post'])
                if (search) qb.whereRaw(`to_tsvector(id || ' ' || post) @@ plainto_tsquery('${search}')`)
                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.position.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.position.getOneById(id)

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.position.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.position.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }
}

export default PositionService