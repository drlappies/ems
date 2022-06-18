class ReimbursementController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createOne = async (req, res) => {
        try {
            const employeeId = req.body.employee_id
            const date = req.body.date
            const amount = req.body.amount
            const reason = req.body.reason
            const status = req.body.status

            const result = await this.services.reimbursement.createOne(employeeId, date, amount, reason, status)

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.reimbursement.updateOneById(id, req.body)

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            const result = await this.services.reimbursement.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
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
                employee_id: req.query.employee_id,
                status: req.query.status,
                mindate: req.query.mindate,
                maxdate: req.query.maxdate,
                minamount: req.query.minamount,
                maxamount: req.query.maxamount
            }

            const result = await this.services.reimbursement.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.reimbursement.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            await this.services.reimbursement.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            await this.services.reimbursement.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default ReimbursementController