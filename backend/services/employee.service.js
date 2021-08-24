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

    getAllEmployee = async (employeeFirstName, employeeLastName, joinStart, joinEnd, status, page) => {
        let currentPage = parseInt(page)
        let currnetPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + 15

        const [count] = await this.knex('employee')
            .count('id')
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
                    queryBuilder.whereRaw(`to_tsvector(firstname) @@ plainto_tsquery('${employeeFirstName}')`)
                }
                if (employeeLastName) {
                    queryBuilder.whereRaw(`to_tsvector(lastname) @@ plainto_tsquery('${employeeLastName}')`)
                }
            })

        const employee = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.post_id', 'employee.dept_id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'departments.name', 'positions.post'])
            .limit(15)
            .offset(currentPage)
            .orderBy('employee.id')
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
                    queryBuilder.whereRaw(`to_tsvector(firstname) @@ plainto_tsquery('${employeeFirstName}')`)
                }
                if (employeeLastName) {
                    queryBuilder.whereRaw(`to_tsvector(lastname) @@ plainto_tsquery('${employeeLastName}')`)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }

        return { employee: employee, count: count.count, currentPage: currentPage, currentPageStart: currnetPageStart, currentPageEnd: currentPageEnd }
    }

    createEmployee = async (username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled) => {
        if (!post_id) post_id = null;
        if (!dept_id) dept_id = null;
        if (!ot_hourly_salary) ot_hourly_salary = 0;
        const [employee] = await this.knex.insert({
            username: username,
            password: password,
            role: role,
            post_id: post_id,
            dept_id: dept_id,
            firstname: firstname,
            lastname: lastname,
            address: address,
            start_hour: start_hour,
            end_hour: end_hour,
            phone_number: phone_number,
            emergency_contact_person: emergency_contact_person,
            emergency_contact_number: emergency_contact_number,
            onboard_date: onboard_date,
            salary_monthly: salary_monthly,
            ot_pay_entitled: ot_pay_entitled,
            ot_hourly_salary: ot_hourly_salary
        }).into('employee').returning(['id'])
        return employee
    }

    updateEmployee = async (id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status, ot_entitled, ot_pay, salary, starting, ending, role) => {
        const employee = await this.knex('employee')
            .where({ id: id })
            .update({
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