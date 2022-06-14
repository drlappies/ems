class AllowanceService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (name, description, amount, status) => {
        try {
            const model = this.models.allowance.create(name, description, amount, status)
            const result = await this.repositories.allowance.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.allowance.getOneById(id)
            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.allowance.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.allowance.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, data) => {
        try {
            const result = await this.repositories.allowance.updateOneById(id, data, ['*'])
            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, data = {}) => {
        try {
            const updates = {}
            if (data.name) updates.name = data.name
            if (data.description) updates.description = data.description
            if (data.amount) updates.amount = data.amount
            if (data.status) updates.update = data.update

            const result = await this.repositories.allowance.updateManyByIds(ids, updates, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getMany = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const orderBy = params.orderBy ? params.orderBy : 'id'

            const status = params.status
            const minamount = params.minamount
            const maxamount = params.maxamount
            const search = params.search

            const query = (qb) => {
                if (status) qb.where('status', '=', status)
                if (minamount && maxamount) qb.whereBetween('amount', [minamount, maxamount])
                if (search) qb.whereRaw(`to_tsvector(name || ' ' || description || ' ' || amount || ' ' || status) @@ plainto_tsquery('${search}')`)

                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
                if (orderBy) qb.orderBy(orderBy)
            }

            const result = await this.repositories.allowance.getMany(query)

            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default AllowanceService 