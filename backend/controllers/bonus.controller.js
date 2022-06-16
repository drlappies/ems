class BonusController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createOne = async (req, res) => {
        try {
            const employeeId = req.body.employee_id
            const reason = req.body.reason
            const amount = req.body.amount
            const date = req.body.date

            if (!employeeId || !reason || !amount || !date) {
                res.status(400).json({ error: "missing required fields" })
                return
            }

            const result = await this.services.bonus.createOne(employeeId, reason, amount, date)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            await this.services.bonus.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.bonus.updateOneById(id, req.body)

            res.status(200).json(result)
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
                minamount: req.query.minamount,
                maxamount: req.query.maxamount,
            }

            const result = await this.services.bonus.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.bonus.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default BonusController