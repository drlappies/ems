class DepartmentService {
    constructor(knex) {
        this.knex = knex
    }

    getDepartment = async (id) => {
        const [dept] = await this.knex.select().from('departments').where({ id: id })
        return dept;
    }

    getAllDepartment = async () => {
        const dept = await this.knex.select().from('departments');
        return dept
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
        }, ['id', 'name'])
        return dept
    }

    deleteDepartment = async (id) => {
        const [dept] = await this.knex('departments').where({ id: id }).del(['id', 'name'])
        return dept
    }
}

module.exports = DepartmentService