class EmployeeService {
    constructor(knex) {
        this.knex = knex
    }

    getEmployee = async (id) => {
        const [employee] = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.post_id', 'employee.dept_id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'departments.name', 'positions.post'])
            .where('employee.id', id)
        return employee
    }

    getAllEmployee = async (employeeFirstName, employeeLastName, joinStart, joinEnd, status) => {
        const employee = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.post_id', 'employee.dept_id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'departments.name', 'positions.post'])
            .modify((queryBuilder) => {
                if (joinEnd) {
                    queryBuilder.where('employee.onboard_date', '<=', joinEnd)
                }
                if (joinStart) {
                    queryBuilder.where('employee.onboard_date', '>=', joinStart)
                }
                if (status) {
                    queryBuilder.where('employee.status', status)
                }
                if (employeeFirstName) {
                    queryBuilder.whereRaw(`employee.employee_index @@ to_tsquery('${employeeFirstName}')`)
                }
                if (employeeLastName) {
                    queryBuilder.whereRaw(`employee.employee_index @@ to_tsquery('${employeeLastName}')`)
                }
            })
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

    updateEmployee = async (id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status, ot_entitled, ot_pay, salary, starting, ending, role) => {
        const [employee] = await this.knex('employee').where({ id: id }).update({
            dept_id: department,
            post_id: position,
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone_number: phone_number,
            emergency_contact_person: emergency_contact_person,
            emergency_contact_number: emergency_contact_number,
            onboard_date: onboard_date,
            status: status,
            ot_pay_entitled: ot_entitled,
            ot_hourly_salary: ot_pay,
            salary_monthly: salary,
            start_hour: starting,
            end_hour: ending,
            role: role
        }, ['id', 'firstname', 'lastname', 'dept_id', 'post_id', 'address', 'phone_number', 'emergency_contact_person', 'emergency_contact_number', 'onboard_date', 'status', 'ot_pay_entitled', 'ot_hourly_salary', 'salary_monthly', 'start_hour', 'end_hour', 'role'])
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