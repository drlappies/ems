class DepartmentService {
    constructor(knex) {
        this.knex = knex
    }

    getDepartment = async (id) => {
        const [dept] = await this.knex.select().from('departments').where({ id: id })
        return dept;
    }

    getAllDepartment = async (offset, limit, search) => {
        const [count] = await this.knex('departments')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(name || ' ' || description) @@ plainto_tsquery('${search}')`)
            })
            .count('id')

        const dept = await this.knex('departments')
            .select()
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(name || ' ' || description) @@ plainto_tsquery('${search}')`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(limit) * parseInt(offset))
            .orderBy('id')

        return { dept: dept, count: count }
    }

    createDepartment = async (name, description) => {
        const [dept] = await this.knex.insert({
            name: name,
            description: description
        }).into('departments').returning(['id', 'name'])
        return dept
    }

    updateDepartment = async (id, name, description) => {
        if (!Array.isArray(id)) id = [id];
        let update = {}
        if (name) update.name = name;
        if (description) update.description = description
        const dept = await this.knex('departments').whereIn('id', id).update(update, ['id', 'name', 'description'])
        return dept
    }

    deleteDepartment = async (id) => {
        console.log(id)
        if (!Array.isArray(id)) id = [id]
        const [dept] = await this.knex('departments')
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

export default DepartmentService