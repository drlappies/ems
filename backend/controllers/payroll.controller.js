class PayrollController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createOne = async (req, res) => {
        try {
            const employee_id = req.body.employee_id
            const from = req.body.from
            const to = req.body.to
            const payday = req.body.payday
            const is_deduction_calculated = req.body.is_deduction_calculated
            const is_bonus_calculated = req.body.is_bonus_calculated
            const is_allowance_calculated = req.body.is_allowance_calculated
            const is_overtime_calculated = req.body.is_overtime_calculated
            const is_reimbursement_calculated = req.body.is_reimbursement_calculated
            const is_leave_calculated = req.body.is_leave_calculated

            if (!employee_id || !from || !to) {
                res.status(400).json({
                    error: 'Missing required fields.'
                })
                return
            }

            if (from > to) {
                res.status(400).json({
                    error: 'Starting date of a payroll period cannot be later than its ending date!'
                })
                return
            }

            const overlappedPayroll = await this.services.payroll.checkIfPayrollOverlapped(employee_id, from, to)

            if (overlappedPayroll.length > 0) {
                res.status(400).json({
                    error: `Payroll period overlapped`
                })
                return
            }

            const result = await this.services.payroll.createOne(employee_id, from, to, payday, is_deduction_calculated, is_bonus_calculated, is_allowance_calculated, is_overtime_calculated, is_reimbursement_calculated, is_leave_calculated)

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.payroll.getManyApprovedByIds([id])

            for (let i = 0; i < result.length; i++) {
                if (result.status === "approved") {
                    res.status(400).json({ error: "Cannot delete a confirmed payroll!" })
                }
            }


            await this.services.payroll.deleteOneById(id)

            res.status(401).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            const result = await this.services.payroll.getManyApprovedByIds(ids)

            for (let i = 0; i < result.length; i++) {
                if (result.status === "approved") {
                    res.status(400).json({ error: "Cannot delete a confirmed payroll!" })
                }
            }

            await this.services.payroll.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getMany = async (req, res) => {
        try {
            const offset = req.query.offset ? parseInt(req.query.offset) : undefined
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined

            const params = {
                offset: offset,
                limit: limit,
                search: req.query.search,
                employee_id: req.query.employee_id,
                status: req.query.status,
                mindate: req.query.mindate,
                maxdate: req.query.maxdate,
                minamount: req.query.minamount,
                maxamount: req.query.maxamount,
            }

            const result = await this.services.payroll.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.payroll.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.payroll.updateOneById(id, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            const result = await this.services.payroll.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default PayrollController