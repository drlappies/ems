class DeductionController {
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

            const result = await this.services.deduction.createOne(employeeId, reason, amount, date)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json({ error: error })
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            await this.services.deduction.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json({ error: error })
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            await this.services.deduction.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json({ error: error })
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.deduction.updateOneById(id, req.body)

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            this.logger.error(error)
            res.status(500).json({ error: error })
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            const result = await this.services.deduction.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json({ error: error })
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
                minamount: req.query.minamount,
                maxamount: req.query.maxamount,
                employee_id: req.query.employee_id
            }

            const result = await this.services.deduction.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json({ error: error })
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.deduction.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json({ error: error })
        }
    }
}

export default DeductionController