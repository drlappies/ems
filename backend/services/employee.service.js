class EmployeeService {
    constructor(knex) {
        this.knex = knex
    }

    getEmployee = async (id) => {
        const [employee] = await this.knex.select().from('employee').where({ id: id });
        return employee
    }

    getAllEmployee = async () => {
        const employee = await this.knex.select().from('employee');
        return employee
    }

    createEmployee = async (firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date) => {
        const [employee] = await this.knex.insert({
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone_number: phone_number,
            emergency_contact_person: emergency_contact_person,
            emergency_contact_number: emergency_contact_number,
            onboard_date: onboard_date
        }).into('employee').returning(['firstname', 'lastname'])
        return employee
    }

    updateEmployee = async (id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status) => {
        const [employee] = await this.knex('employee').where({ id: id }).update({
            department: department,
            position: position,
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone_number: phone_number,
            emergency_contact_person: emergency_contact_person,
            emergency_contact_number: emergency_contact_number,
            onboard_date: onboard_date,
            status: status
        }, ['id', 'firstname', 'lastname'])
        return employee
    }

    deleteEmployee = async (id) => {
        const [employee] = await this.knex('employee').where({ id: id }).del(['id', 'firstname', 'lastname']);
        return employee
    }
}

module.exports = EmployeeService