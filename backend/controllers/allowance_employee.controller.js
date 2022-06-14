class AllowanceEmployeeController {
    constructor(logger, services) {
        this.logger = logger
        this.services = services
    }

    entitle = async (req, res) => {
        try {
            const employeeId = req.body.employee_id
            const allowanceId = req.body.allowance_id

            const employeeInAllowance = await this.services.allowanceEmployee.getOneByAllowanceAndEmployeeId(allowanceId, employeeId)

            if (employeeInAllowance.length >= 1) {
                res.status(400).json({
                    error: "already entitled to allowance"
                })
                return
            }

            const result = await this.services.allowanceEmployee.createOne(employeeId, allowanceId)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    disentitle = async (req, res) => {
        try {
            const allowanceId = req.body.allowance_id
            const employeeId = req.body.employee_id

            await this.services.allowanceEmployee.deleteOneByAllowanceAndEmployeeId(allowanceId, employeeId)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getMany = async (req, res) => {
        try {
            const type = req.query.type
            const offset = parseInt(req.query.offset)
            const limit = parseInt(req.query.limit)

            if (type === "employee_id") {
                const employeeId = req.query.employee_id

                const query = {
                    employeeId: employeeId,
                    offset: offset,
                    limit: limit
                }

                const result = await this.services.allowanceEmployee.getManyByEmployeeId(query)

                res.status(200).json(result)
                return;
            }

            if (type === "allowance_id") {
                const allowanceId = req.query.allowance_id

                const query = {
                    allowanceId: allowanceId,
                    offset: offset,
                    limit: limit
                }

                const result = await this.services.allowanceEmployee.getManyByAllowanceId(query)

                res.status(200).json(result)
                return;
            }

            res.status(400).json({ error: "unknown query type" })
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default AllowanceEmployeeController