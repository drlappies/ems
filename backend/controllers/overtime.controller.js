class OvertimeController {
    constructor({ logger, services, utils }) {
        this.logger = logger
        this.services = services
        this.utils = utils
    }

    checkIn = async (req, res) => {
        try {
            const employee = req.user

            const hasCheckedIn = await this.services.overtime.getOneByEmployeeIdAndDate(employee.id, this.utils.time.getDate())

            if (hasCheckedIn) {
                res.status(400).json({
                    error: 'Already checked in for overtime today.'
                })
                return;
            }

            const result = await this.services.overtime.checkIn(employee)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    checkOut = async (req, res) => {
        try {
            const employee = req.user

            const checkIn = await this.services.overtime.getOneByEmployeeIdAndDate(employee.id, this.utils.time.getDate())


            if (checkIn) {
                if (checkIn.to) {
                    res.status(400).json({ error: "Already timed out for overtime today" })
                    return
                }
            }

            const result = await this.services.overtime.checkOut(employee)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    createOne = async (req, res) => {
        try {
            const employeeId = req.body.employee_id
            const date = req.body.date
            const from = req.body.from
            const to = req.body.to
            const status = req.body.status

            if (!employeeId || !date || !from || !to) {
                res.status(400).json({
                    error: 'Missing required fields!'
                })
                return
            }

            const currentDate = this.utils.time.getDate()

            if (date > currentDate) {
                res.status(400).json({
                    error: 'Cannot time in future dates!'
                })
                return
            }

            const hasCheckedIn = await this.services.overtime.getOneByEmployeeIdAndDate(employeeId, date)

            if (hasCheckedIn) {
                res.status(400).json({
                    error: 'Already timed in that day!'
                })
                return
            }

            if (from >= to) {
                res.status(400).json({
                    error: 'Check in time cannot be greater than or equal to check out time!'
                })
                return
            }

            const result = await this.services.overtime.createOne(employeeId, date, from, to, status)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.overtime.updateOneById(id, req.body)

            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            const result = await this.services.overtime.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            await this.services.overtime.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            await this.services.overtime.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getMany = async (req, res) => {
        try {
            const offset = req.query.offset ? parseInt(req.query.offset) : null
            const limit = req.query.limit ? parseInt(req.query.limit) : null

            const params = {
                offset: offset,
                limit: limit,
                search: req.query.search,
                mindate: req.query.mindate,
                maxdate: req.query.maxdate,
                employee_id: req.query.employee_id,
                status: req.query.status
            }

            const result = await this.services.overtime.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.overtime.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            const result = await this.services.overtime.deleteManyByIds(ids)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getCheckInStatusByUser = async (req, res) => {
        try {
            const employee = req.user

            const currentTime = new Date()
            const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`

            const result = await this.services.overtime.getOneByEmployeeIdAndDate(employee.id, date)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default OvertimeController