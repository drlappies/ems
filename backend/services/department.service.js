class DepartmentService {
    constructor(knex) {
        this.knex = knex
    }

    getDepartment = async (id) => {
        const [dept] = await this.knex.select().from('departments').where({ id: id })
        return dept;
    }

    getAllDepartment = async (page, name, description) => {
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + 15

        const [count] = await this.knex('departments')
            .count('id')
            .modify((queryBuilder) => {
                if (name) {
                    queryBuilder.whereRaw(`to_tsvector(name) @@ plainto_tsquery('${name}')`)
                }
                if (description) {
                    queryBuilder.whereRaw(`to_tsvector(description) @@ plainto_tsquery('${description}')`)
                }
            })

        const dept = await this.knex('departments')
            .select()
            .limit(15)
            .offset(currentPage)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (name) {
                    queryBuilder.whereRaw(`to_tsvector(name) @@ plainto_tsquery('${name}')`)
                }
                if (description) {
                    queryBuilder.whereRaw(`to_tsvector(description) @@ plainto_tsquery('${description}')`)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }
        return { dept: dept, count: count.count, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd }
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
            .del(['id'])
        return dept
    }
}

module.exports = DepartmentService