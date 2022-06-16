class EmployeeController {
    constructor({ logger, services, utils }) {
        this.logger = logger
        this.services = services
        this.utils = utils
    }

    createOne = async (req, res) => {
        try {
            const username = req.body.username
            const password = req.body.password
            const role = req.body.role
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const address = req.body.address
            const phoneNumber = req.body.phone_number
            const emergencyContactPerson = req.body.emergency_contact_person
            const emergencyContactNumber = req.body.emergency_contact_number
            const onboardDate = req.body.onboard_date
            const salaryMonthly = req.body.salary_monthly
            const startHour = req.body.start_hour
            const endHour = req.body.end_hour
            const posId = req.body.post_id
            const deptId = req.body.dept_id
            const otPayEntitled = req.body.ot_pay_entitled
            const otHourlySalary = req.body.ot_hourly_salary

            if (!username || !password || !role || !firstname || !lastname || !address || !phoneNumber || !emergencyContactPerson || !emergencyContactNumber || !onboardDate) {
                res.status(400).json({ error: 'Missing required fields' });
                return
            }

            if (startHour >= endHour) {
                res.status(400).json({
                    error: 'Employee start work hour cannot be greater than or equal to his/her off hour.'
                })
                return
            }

            const user = await this.services.employee.getOneByUsername(username)

            if (user) {
                res.status(400).json({
                    error: 'Uesrname is taken.'
                })
                return
            }

            const hashedPassword = await this.utils.password.hashPassword(password)

            const result = await this.services.employee.createOne(username, hashedPassword, role, firstname, lastname, address, phoneNumber, emergencyContactPerson, emergencyContactNumber, onboardDate, salaryMonthly, startHour, endHour, posId, deptId, otHourlySalary, otPayEntitled)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.employee.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }

    getMany = async (req, res) => {
        try {
            const offset = req.query.offset ? parseInt(req.query.offset) : req.query.offset
            const limit = req.query.limit ? parseInt(req.query.limit) : req.query.limit

            const params = {
                offset: offset,
                limit: limit,
                search: req.query.search,
                dept_id: req.query.dept_id,
                pos_id: req.query.pos_id,
                search: req.query.search,
                status: req.query.status,
                ot_pay_entitled: req.query.ot_pay_entitled,
            }

            const result = await this.services.employee.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const data = {
                post_id: req.body.post_id,
                dept_id: req.body.dept_id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                phone_number: req.body.phone_number,
                emergency_contact_person: req.body.emergency_contact_person,
                emergency_contact_number: req.body.emergency_contact_number,
                onboard_date: req.body.onboard_date,
                status: req.body.status,
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                start_hour: req.body.start_hour,
                end_hour: req.body.end_hour,
                salary_monthly: req.body.salary_monthly,
                ot_pay_entitled: req.body.ot_pay_entitled,
                ot_hourly_salary: req.body.ot_hourly_salary,
                annual_leave_count: req.body.annual_leave_count
            }

            const result = await this.services.employee.updateOneById(id, data)

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            const result = await this.services.employee.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.employee.deleteOneById(id)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            await this.services.employee.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default EmployeeController