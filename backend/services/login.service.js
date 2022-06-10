class LoginService {
    constructor(knex) {
        this.knex = knex
    }

    getUserByUsername = async (username) => {
        const [user] = await this.knex('employee')
            .leftJoin('departments', 'employee.dept_id', 'departments.id')
            .leftJoin('positions', 'employee.post_id', 'positions.id')
            .select(['employee.id', 'employee.firstname', 'employee.lastname', 'departments.name', 'positions.post', 'employee.address', 'employee.phone_number', 'employee.emergency_contact_person', 'employee.emergency_contact_number', 'employee.onboard_date', 'employee.role', 'employee.start_hour', 'employee.end_hour', 'employee.ot_pay_entitled', 'employee.ot_hourly_salary', 'employee.annual_leave_count', 'employee.username', 'employee.password'])
            .where('username', username)
        return user
    }
}

export default LoginService