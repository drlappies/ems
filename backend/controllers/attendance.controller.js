class AttendanceController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    checkIn = async (req, res) => {
        try {
            //TODO get employeeId from user middleware
            const employeeId = req.body.employee_id

            //TODO check if employee exists
            const currentTime = new Date()
            const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`

            const todayAttendance = await this.services.attendance.getOneByEmployeeIdAndDate(employeeId, date)

            if (todayAttendance) {
                res.status(400).json({ error: "already checked in" })
                return
            }

            const result = await this.services.attendance.checkIn(employeeId)

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    checkOut = async (req, res) => {
        try {
            const employeeId = req.body.employee_id
            //TODO get employeeId from user middleware
            //TODO check if employee exists
            const currentTime = new Date()
            const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`

            const todayAttendance = await this.services.attendance.getOneByEmployeeIdAndDate(employeeId, date)

            if (!todayAttendance) {
                res.status(400).json({ error: "Haven't checked in today!" })
                return;
            } else if (todayAttendance.check_out) {
                res.status(400).json({ error: "Already checked out today!" })
                return
            }

            const result = await this.services.attendance.checkOut(employeeId)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.attendance.getOneById(id)

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
            const search = req.query.search
            const status = req.query.status
            const mindate = req.query.mindate
            const maxdate = req.query.maxdate
            const employeeId = req.query.employee_id
            const orderBy = req.query.sort

            const params = {
                offset: offset,
                limit: limit,
                search: search,
                status: status,
                mindate: mindate,
                maxdate: maxdate,
                employeeId: employeeId,
                orderBy: orderBy
            }

            const result = await this.services.attendance.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            await this.services.attendance.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const checkIn = req.body.check_in
            const checkOut = req.body.check_out

            if (checkIn || checkOut) {
                const result = await this.services.attendance.getOneById(id)

                if (!result) {
                    res.status(400).json({ error: "attendance not found" })
                    return
                }

                if (checkIn > result.check_out && result.check_out) {
                    res.status(400).json({ error: "Check in cannot be later than check out time!" })
                    return
                }

                if (checkOut < result.check_in && result.check_in) {
                    res.status(400).json({ error: "Check out cannot be earlier than check in time!" })
                    return
                }
            }

            const result = await this.services.attendance.updateOneById(id, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            await this.services.attendance.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            const checkIn = req.body.check_in
            const checkOut = req.body.check_out
            delete req.body.ids

            const attendances = await this.services.attendance.getManyByIds(ids)

            if (attendances.length > 0) {
                for (let i = 0; i < attendances.length; i++) {
                    if (checkOut < attendances[i].check_in) {
                        res.status(400).json({ error: "Check out cannot be earlier than check in time!" })
                        return
                    }

                    if (checkIn > attendances[i].check_out) {
                        res.status(400).json({ error: "Check in cannot be later than check out time!" })
                        return
                    }
                }
            }

            const result = await this.services.attendance.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    createOne = async (req, res) => {
        try {
            //TODO retrieve employee from middleware
            const employeeId = req.body.employee_id
            const date = req.body.date
            const checkIn = req.body.check_in
            const checkOut = req.body.check_out
            const status = req.body.status

            if (checkIn >= checkOut) {
                res.status(400).json({
                    error: 'Check in time cannot be greater than or equal to the check out time!'
                })

                return
            }

            const attendance = await this.services.attendance.getOneByEmployeeIdAndDate(employeeId, date)

            if (attendance) {
                res.status(400).json({
                    error: "Overlapped"
                })
                return
            }

            const result = await this.services.attendance.createOne(employeeId, date, checkIn, checkOut, status)

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default AttendanceController