class DepartmentService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (name, desc) => {
        try {
            const model = this.models.department.create(name, desc)
            const result = await this.repositories.department.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = this.repositories.department.getOneById(id)
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

            const query = (qb) => {
                if (search) qb.whereRaw(`to_tsvector(name || ' ' || description) @@ plainto_tsquery('${search}')`)
                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.department.getMany(query)

            return { result }
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const name = params.name
            const description = params.description

            const data = {}
            if (name) data.name = name
            if (description) data.description = description

            const result = await this.repositories.department.updateOneById(id, data)

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const name = params.name
            const description = params.description

            const data = {}
            if (name) data.name = name
            if (description) data.description = description

            const result = await this.repositories.department.updateManyByIds(ids, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.department.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.department.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }
}

export default DepartmentService