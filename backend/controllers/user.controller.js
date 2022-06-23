class UserController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    getUser = async (req, res) => {
        try {
            const user = req.user

            res.status(200).json(user)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getAttendanceByUser = async (req, res) => {
        try {
            const employee = req.user
            const mindate = req.query.mindate
            const maxdate = req.query.maxdate

            const params = {
                mindate: mindate,
                maxdate: maxdate,
                employeeId: employee.id
            }

            const result = await this.services.attendance.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getLeaveByUser = async (req, res) => {
        try {
            const employee = req.user
            const mindate = req.query.mindate
            const maxdate = req.query.maxdate

            const params = {
                mindate: mindate,
                maxdate: maxdate,
                employeeId: employee.id
            }

            const result = await this.services.leave.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOvertimeByUser = async (req, res) => {
        try {
            const employee = req.user
            const mindate = req.query.mindate
            const maxdate = req.query.maxdate

            const params = {
                mindate: mindate,
                maxdate: maxdate,
                employee_id: employee.id
            }

            const result = await this.services.overtime.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getPayrollByUser = async (req, res) => {
        try {
            const employee = req.user
            const offset = parseInt(req.query.offset)
            const limit = parseInt(req.query.limit)

            const params = {
                offset: offset,
                liimt: limit,
                employee_id: employee.id
            }

            const result = await this.services.overtime.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getReimbursementByUser = async (req, res) => {
        try {
            const employee = req.user
            const offset = parseInt(req.query.offset)
            const limit = parseInt(req.query.limit)

            const params = {
                offset: offset,
                liimt: limit,
                employee_id: employee.id
            }

            const result = await this.services.reimbursement.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getAllowanceByUser = async (req, res) => {
        try {
            const employee = req.user
            const offset = parseInt(req.query.offset)
            const limit = parseInt(req.query.limit)

            const params = {
                offset: offset,
                liimt: limit,
                employeeId: employee.id
            }

            const result = await this.services.allowanceEmployee.getManyByEmployeeId(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getBonusByUser = async (req, res) => {
        try {
            const employee = req.user
            const offset = parseInt(req.query.offset)
            const limit = parseInt(req.query.limit)

            const params = {
                offset: offset,
                liimt: limit,
                employee_id: employee.id
            }

            const result = await this.services.bonus.getBonusByEmployee(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getDeductionByUser = async (req, res) => {
        try {
            const employee = req.user
            const offset = parseInt(req.query.offset)
            const limit = parseInt(req.query.limit)

            const params = {
                offset: offset,
                liimt: limit,
                employee_id: employee.id
            }

            const result = await this.services.deduction.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default UserController