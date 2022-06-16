class EmployeeService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled) => {
        try {
            const model = this.models.employee.create(username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled)
            const result = await this.repositories.employee.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const data = {}
            if (params.username) data.username = params.username
            if (params.onboard_date) data.onboard_date = params.onboard_date
            if (params.firstname) data.firstname = params.firstname
            if (params.lastname) data.lastname = params.lastname
            if (params.address) data.address = params.address
            if (params.phone_number) data.phone_number = params.phone_number
            if (params.emergency_contact_person) data.emergency_contact_person = params.emergency_contact_person
            if (params.emergency_contact_number) data.emergency_contact_number = params.emergency_contact_number
            if (params.start_hour) data.start_hour = params.start_hour
            if (params.end_hour) data.end_hour = params.end_hour
            if (params.dept_id) data.dept_id = params.dept_id
            if (params.post_id) data.post_id = params.post_id
            if (params.password) data.password = params.password
            if (params.start_hour) data.start_hour = params.start_hour;
            if (params.end_hour) data.end_hour = params.end_hour;
            if (params.status) data.status = params.status;
            if (params.role) data.role = params.role;
            if (params.ot_pay_entitled) data.ot_pay_entitled = params.ot_pay_entitled;
            if (params.ot_hourly_salary) data.ot_hourly_salary = params.ot_hourly_salary;
            if (params.salary_monthly) data.salary_monthly = params.salary_monthly;

            const result = await this.repositories.employee.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const data = {}
            if (params.username) data.username = params.username
            if (params.onboard_date) data.onboard_date = params.onboard_date
            if (params.firstname) data.firstname = params.firstname
            if (params.lastname) data.lastname = params.lastname
            if (params.address) data.address = params.address
            if (params.phone_number) data.phone_number = params.phone_number
            if (params.emergency_contact_person) data.emergency_contact_person = params.emergency_contact_person
            if (params.emergency_contact_number) data.emergency_contact_number = params.emergency_contact_number
            if (params.start_hour) data.start_hour = params.start_hour
            if (params.end_hour) data.end_hour = params.end_hour
            if (params.dept_id) data.dept_id = params.dept_id
            if (params.post_id) data.post_id = params.post_id
            if (params.password) data.password = params.password
            if (params.start_hour) data.start_hour = params.start_hour;
            if (params.end_hour) data.end_hour = params.end_hour;
            if (params.status) data.status = params.status;
            if (params.role) data.role = params.role;
            if (params.ot_pay_entitled) data.ot_pay_entitled = params.ot_pay_entitled;
            if (params.ot_hourly_salary) data.ot_hourly_salary = params.ot_hourly_salary;
            if (params.salary_monthly) data.salary_monthly = params.salary_monthly;

            const result = await this.repositories.employee.updateManyByIds(ids, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.employee.getOneById(id)
            return result
        } catch (error) {
            throw error
        }
    }

    getMany = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const minpay = params.minpay
            const maxpay = params.maxpay
            const role = params.role
            const dept = params.dept_id
            const pos = params.pos_id
            const search = params.search
            const status = params.status
            const otPayEntitled = params.ot_pay_entitled

            const query = (qb) => {
                qb.leftJoin('departments', 'employee.dept_id', 'departments.id')
                qb.leftJoin('positions', 'employee.post_id', 'positions.id')
                qb.select(['employee.id', 'employee.post_id', 'employee.dept_id', 'employee.firstname', 'employee.lastname', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.status', 'employee.created_at', 'employee.updated_at', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.salary_monthly', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'employee.annual_leave_count', 'departments.name', 'positions.post'])

                if (otPayEntitled || otPayEntitled === false) qb.where('employee.ot_pay_entitled', '=', otPayEntitled)
                if (minpay && maxpay) qb.whereBetween('employee.salary_monthly', [minpay, maxpay])
                if (status) qb.where('employee.status', '=', status)
                if (role) qb.where('employee.role', '=', role)
                if (dept) qb.where('employee.dept_id', '=', dept)
                if (pos) qb.where('employee.post_id', '=', pos)
                if (search) qb.whereRaw(`to_tsvector(employee.id || ' ' || employee.post_id || ' ' || employee.dept_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || employee.address || ' ' || employee.phone_number || ' ' || employee.emergency_contact_person || ' ' || employee.emergency_contact_number || ' ' || employee.onboard_date || ' ' || employee.status || ' ' || employee.created_at || ' ' || employee.updated_at || ' ' || employee.role || ' ' || employee.start_hour || ' ' || employee.end_hour || ' ' || employee.salary_monthly || ' ' || employee.ot_pay_entitled || ' ' || employee.ot_hourly_salary || ' ' || employee.annual_leave_count || ' ' || departments.name || ' ' || positions.post) @@ plainto_tsquery(${search})`)

                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.employee.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.employee.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.employee.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    getOneByUsername = async (username) => {
        try {
            const query = (qb) => {
                qb.where('username', '=', username)
            }

            const result = await this.repositories.employee.getOne(query)

            return result
        } catch (error) {
            throw error
        }
    }
}

export default EmployeeService