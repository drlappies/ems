class EmployeeService {
    constructor(knex) {
        this.knex = knex
    }

    getEmployee = async (id) => {
        const [employee] = await this.knex.select().from('employee').where({ id: id });
        return employee
    }

    getAllEmployee = async () => {
        const employee = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'departments.name', 'positions.post'])
        return employee
    }

    createEmployee = async (username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date) => {
        const [employee] = await this.knex.insert({
            username: username,
            password: password,
            role: role,
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

    checkDuplicate = async (username) => {
        const isUsernameTaken = await this.knex('employee').where('username', username);
        return isUsernameTaken
    }
}

module.exports = EmployeeService