class LeaveController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.leave.getOneById(id)

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
                mindate: req.query.mindate,
                maxdate: req.query.maxdate,
                status: req.query.status
            }

            const result = await this.services.leave.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    createOne = async (req, res) => {
        try {
            const employeeId = req.body.employee_id
            const reason = req.body.reason
            const from = req.body.from
            const to = req.body.to
            const duration = req.body.duration
            const type = req.body.type

            if (!employeeId || !reason || !from || !to || !duration || !type) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }

            if (from > to) {
                return res.status(400).json({
                    error: 'Leave starting date cannot be greater than its ending date!'
                })
            }

            const params = {
                mindate: from,
                maxdate: to,
                employee_id: employeeId
            }

            const leaves = await this.services.leave.getMany(params)

            if (leaves.length >= 1) {
                res.status(400).json({
                    error: 'Found conflicting leave record.'
                })
                return
            }

            const result = await this.services.leave.createOne(employeeId, reason, from, to, duration, type)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.leave.updateOneById(id, req.body)

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

            const result = await this.services.leave.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            const leave = await this.services.leave.getOneById(id)

            if (leave.status === "approved") {
                res.status(400).json({
                    error: 'Cannot delete an approved leave!'
                })
                return;
            }

            await this.services.leave.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            const leaves = await this.services.leave.getManyByIds(ids)

            if (leaves.length > 0) {
                for (let i = 0; i < leaves.length; i++) {
                    if (leaves[i].status === "approved") {
                        res.status(400).json({ error: "Cannot delete an approved leave" })
                        return
                    }
                }
            }

            await this.services.leave.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    applyForLeave = async (req, res) => {
        try {
            const employee = req.user
            const reason = req.body.reason
            const from = req.body.from
            const to = req.body.to
            const duration = req.body.duration
            const type = req.body.type

            const result = await this.services.leave.createOne(employee.id, reason, from, to, duration, type)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default LeaveController