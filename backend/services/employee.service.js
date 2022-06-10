class EmployeeService {
    constructor(knex) {
        this.knex = knex
    }

    getEmployee = async (id) => {
        const [employee] = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.post_id', 'employee.dept_id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'employee.annual_leave_count', 'departments.name', 'positions.post', 'employee.username'])
            .where('employee.id', id)
        return employee
    }

    getAllEmployee = async (offset, limit, search, position, department, role, status, salaryFrom, salaryTo, hasOTpay) => {
        const [count] = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .modify(qb => {
                if (hasOTpay || hasOTpay === false) qb.where('employee.ot_pay_entitled', '=', hasOTpay)
                if (salaryFrom && salaryTo) qb.whereBetween('employee.salary_monthly', [salaryFrom, salaryTo])
                if (status) qb.where('employee.status', '=', status)
                if (role) qb.where('employee.role', '=', role)
                if (department) qb.where('employee.dept_id', '=', department)
                if (position) qb.where('employee.post_id', '=', position)
                if (search) qb.whereRaw(`to_tsvector(employee.id || ' ' || employee.post_id || ' ' || employee.dept_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || employee.address || ' ' || employee.phone_number || ' ' || employee.emergency_contact_person || ' ' || employee.emergency_contact_number || ' ' || employee.onboard_date || ' ' || employee.status || ' ' || employee.created_at || ' ' || employee.updated_at || ' ' || employee.role || ' ' || employee.start_hour || ' ' || employee.end_hour || ' ' || employee.salary_monthly || ' ' || employee.ot_pay_entitled || ' ' || employee.ot_hourly_salary || ' ' || employee.annual_leave_count || ' ' || departments.name || ' ' || positions.post) @@ plainto_tsquery(${search})`)
            })
            .count()

        const employee = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.post_id', 'employee.dept_id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'employee.annual_leave_count', 'departments.name', 'positions.post'])
            .modify(qb => {
                if (hasOTpay || hasOTpay === false) qb.where('employee.ot_pay_entitled', '=', hasOTpay)
                if (salaryFrom && salaryTo) qb.whereBetween('employee.salary_monthly', [salaryFrom, salaryTo])
                if (status) qb.where('employee.status', '=', status)
                if (role) qb.where('employee.role', '=', role)
                if (department) qb.where('employee.dept_id', '=', department)
                if (position) qb.where('employee.post_id', '=', position)
                if (search) qb.whereRaw(`to_tsvector(employee.id || ' ' || employee.post_id || ' ' || employee.dept_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || employee.address || ' ' || employee.phone_number || ' ' || employee.emergency_contact_person || ' ' || employee.emergency_contact_number || ' ' || employee.onboard_date || ' ' || employee.status || ' ' || employee.created_at || ' ' || employee.updated_at || ' ' || employee.role || ' ' || employee.start_hour || ' ' || employee.end_hour || ' ' || employee.salary_monthly || ' ' || employee.ot_pay_entitled || ' ' || employee.ot_hourly_salary || ' ' || employee.annual_leave_count || ' ' || departments.name || ' ' || positions.post) @@ plainto_tsquery(${search})`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .orderBy('employee.id')

        const positions = await this.knex('positions').select()
        const departments = await this.knex('departments').select(['id', 'name'])

        return { employee: employee, count: count, positions: positions, departments: departments }
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
        }).into('employee').returning(['id', 'firstname', 'lastname'])
        return employee
    }

    updateEmployee = async (id, post_id, dept_id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, status, username, password, role, start_hour, end_hour, salary_monthly, ot_pay_entitled, ot_hourly_salary, annual_leave_count) => {
        let update = {}
        if (username) update.username = username
        if (onboard_date) update.onboard_date = onboard_date
        if (firstname) update.firstname = firstname
        if (lastname) update.lastname = lastname
        if (address) update.address = address
        if (phone_number) update.phone_number = phone_number
        if (emergency_contact_person) update.emergency_contact_person = emergency_contact_person
        if (emergency_contact_number) update.emergency_contact_number = emergency_contact_number
        if (start_hour) update.start_hour = start_hour
        if (end_hour) update.end_hour = end_hour
        if (dept_id) update.dept_id = dept_id
        if (post_id) update.post_id = post_id
        if (password) update.password = password
        if (start_hour) update.start_hour = start_hour;
        if (end_hour) update.end_hour = end_hour;
        if (status) update.status = status;
        if (role) update.role = role;
        if (ot_pay_entitled) update.ot_pay_entitled = ot_pay_entitled;
        if (ot_hourly_salary) update.ot_hourly_salary = ot_hourly_salary;
        if (salary_monthly) update.salary_monthly = salary_monthly;

        if (!Array.isArray(id)) id = [id]
        const employee = await this.knex('employee')
            .whereIn('id', id)
            .update(update, ['id'])
        return employee
    }

    deleteEmployee = async (id) => {
        if (!Array.isArray(id)) id = [id];
        const [employee] = await this.knex('employee').whereIn('id', id).del(['id']);
        return employee
    }

    checkDuplicate = async (username) => {
        const isUsernameTaken = await this.knex('employee').where('username', username);
        return isUsernameTaken
    }

    getEmployeeCount = async () => {
        const [count] = await this.knex('employee')
            .count('id')
            .where('status', 'available')
        return count.count
    }
}

export default EmployeeService