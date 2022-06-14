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

            if (todayAttendance.length > 0) {
                res.status(400).json({ error: "already checked in" })
                return
            }

            const result = await this.services.attendance.checkIn(employeeId)

        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    createTimeIn = async (req, res) => {
        try {
            const { employeeId } = req.body;
            if (!employeeId) {
                return res.status(400).json({ error: 'Missing required Employee id' })
            }

            const attendance = await this.AttendanceService.checkIfAlreadyTimedIn(employeeId);
            if (attendance.length > 0) {
                return res.status(400).json({ error: 'Already timed in today!' })
            }

            const timeIn = await this.AttendanceService.createTimeIn(employeeId);
            return res.status(200).json({
                success: `Successfully checked in at ${timeIn.check_in} on ${new Date(timeIn.date).getFullYear()}-${new Date(timeIn.date).getMonth()}-${new Date(timeIn.date).getDate()}`,
                timeIn: timeIn
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    createTimeOut = async (req, res) => {
        try {
            const { employeeId } = req.body;
            if (!employeeId) {
                return res.status(400).json({ error: 'Missing required Employee id' })
            }
            const isTimedIn = await this.AttendanceService.checkIfAlreadyTimedIn(employeeId)
            if (isTimedIn.length <= 0) {
                return res.status(400).json({ error: `Haven't timed in yet!` })
            }
            const isTimedOut = await this.AttendanceService.checkIfAlreadyTimedOut(employeeId);
            if (isTimedOut.length > 0) {
                return res.status(400).json({ error: 'Already timed out today!' });
            }
            const timeOut = await this.AttendanceService.createTimeOut(employeeId);
            return res.status(200).json({
                success: `Successfully checked out at ${timeOut.check_out} on ${new Date(timeOut.date).getFullYear()}-${new Date(timeOut.date).getMonth() + 1}-${new Date(timeOut.date).getDate()}`,
                timeout: timeOut.check_out
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllAttendanceByEmployee = async (req, res) => {
        try {
            const { employeeId } = req.params;
            const { dateFrom, dateTo } = req.query;
            const attendance = await this.AttendanceService.getAllAttendanceByEmployee(employeeId, dateFrom, dateTo);
            return res.status(200).json({
                attendance: attendance
            })
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }

    getTodayAttendanceByEmployee = async (req, res) => {
        try {
            const { employeeId } = req.params;
            const attendance = await this.AttendanceService.getTodayAttendanceByEmployee(employeeId)
            return res.status(200).json(attendance)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getAllAttendance = async (req, res) => {
        try {
            const { offset, limit, search, employeeId, status, dateFrom, dateTo } = req.query;
            const query = await this.AttendanceService.getAllAttendance(offset, limit, search, employeeId, status, dateFrom, dateTo);
            return res.status(200).json({
                attendance: query.attendance,
                employee: query.employee,
                rowCount: query.rowCount
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getOnTimeRate = async (req, res) => {
        try {
            const { startingDate, endingDate } = req.query
            const metric = await this.AttendanceService.getOnTimeRate(startingDate, endingDate);
            return res.status(200).json({
                rate: metric.rate,
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    deleteAttendance = async (req, res) => {
        try {
            const { id } = req.params
            const attendance = await this.AttendanceService.deleteAttendance(id)
            return res.status(200).json({
                success: `Successfully deleted attendance record ID ${attendance.id}`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    updateAttendance = async (req, res) => {
        try {
            const { id } = req.params
            const { check_in, check_out, status } = req.body
            const attendance = await this.AttendanceService.updateAttendance(id, check_in, check_out, status)
            return res.status(200).json({
                success: 'Successfully updated attendance record'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    createAttendance = async (req, res) => {
        try {
            const { employee_id, date, check_in, check_out, status } = req.body

            if (!employee_id || !date || !check_in || !check_out || !status) {
                return res.status(400).json({
                    error: 'Missing required fields!'
                })
            }

            if (check_in >= check_out) {
                return res.status(400).json({
                    error: 'Check in time cannot be greater than or equal to the check out time!'
                })
            }

            const overlaps = await this.AttendanceService.checkForConflicts(employee_id, date)
            if (overlaps.length > 0) {
                const overlappedRecords = overlaps.map(el => {
                    return {
                        id: el.id,
                        check_in: el.check_in,
                        check_out: el.check_out,
                        date: `${new Date(el.date).getFullYear()}-${new Date(el.date).getMonth() + 1}-${new Date(el.date).getDate()}`,
                        employee_id: el.employee_id
                    }
                })
                return res.status(400).json({
                    error: `Overlapped Attendance: ${overlappedRecords.map(el => `ID: ${el.id} Date: ${el.date} Employee ID: ${el.employee_id}`)}`
                })
            }

            const attendance = await this.AttendanceService.createAttendance(employee_id, date, check_in, check_out, status)
            return res.status(200).json({
                success: `Successfully created attendance record ${attendance.id} for Employee ${attendance.employee_id}`,
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getAttendance = async (req, res) => {
        try {

            console.log("getting attendnace")
            const { id } = req.params;
            const attendance = await this.AttendanceService.getAttendance(id);
            return res.status(200).json({
                attendance: attendance
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchDeleteAttendance = async (req, res) => {
        try {
            const { id } = req.query;
            console.log(id)
            const attendance = await this.AttendanceService.batchDeleteAttendance(id)
            return res.status(200).json({
                success: 'Successfully batch deleted attendance record.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchUpdateAttendance = async (req, res) => {
        try {
            const { id, check_in, check_out, status } = req.body
            const attendance = await this.AttendanceService.batchUpdateAttendance(id, check_in, check_out, status)
            return res.status(200).json({
                success: 'Successfully batch updated attendance record.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

export default AttendanceController