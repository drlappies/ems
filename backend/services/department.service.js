class DepartmentService {
    constructor(knex) {
        this.knex = knex
    }

    getDepartment = async (id) => {
        const [dept] = await this.knex.select().from('departments').where({ id: id })
        return dept;
    }

    getAllDepartment = async (page, limit, text) => {
        if (!page || page < 0) page = 0;
        if (!limit || limit < 0) limit = 10;
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + parseInt(limit)
        let currentLimit = parseInt(limit)

        const [count] = await this.knex('departments')
            .count('id')
            .modify((queryBuilder) => {
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(name || ' ' || description) @@ plainto_tsquery('${text}')`)
                }
            })

        const dept = await this.knex('departments')
            .select()
            .limit(currentLimit)
            .offset(currentPage)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(name || ' ' || description) @@ plainto_tsquery('${text}')`)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }
        return { dept: dept, count: count.count, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, currentLimit: currentLimit }
    }

    createDepartment = async (name, description) => {
        const [dept] = await this.knex.insert({
            name: name,
            description: description
        }).into('departments').returning(['id', 'name'])
        return dept
    }

    updateDepartment = async (id, name, description) => {
        const [dept] = await this.knex('departments').where({ id: id }).update({
            name: name,
            description: description
        }, ['id', 'name', 'description'])
        return dept
    }

    deleteDepartment = async (id) => {
        const [dept] = await this.knex('departments')
            .where({ id: id })
            .del(['id', 'name'])
        return dept
    }

    batchDeleteDepartment = async (id) => {
        const dept = await this.knex('departments')
            .whereIn('id', id)
            .del(['id'])
        return dept
    }

    getDepartmentCount = async () => {
        const [count] = await this.knex('departments')
            .count()
        return count.count
    }
}

module.exports = DepartmentService