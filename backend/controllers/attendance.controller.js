class AttendanceController {
    constructor(AttendanceService) {
        this.AttendanceService = AttendanceService
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
            const { text, status, dateFrom, dateTo, checkinFrom, checkinTo, checkoutFrom, checkoutTo, page, limit } = req.query
            const query = await this.AttendanceService.getAllAttendance(text, status, dateFrom, dateTo, checkinFrom, checkinTo, checkoutFrom, checkoutTo, page, limit);

            return res.status(200).json({
                attendance: query.attendance,
                employeeList: query.employeeList,
                count: query.count,
                currentPage: query.currentPage,
                pageStart: query.pageStart,
                pageEnd: query.pageEnd,
                currentLimit: query.currentLimit
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
            const { ids } = req.query
            const attendance = await this.AttendanceService.deleteAttendance(ids)
            return res.status(200).json({
                success: `Successfully deleted attendance record`
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
            const { ids, check_in, check_out, status } = req.body
            const attendance = await this.AttendanceService.updateAttendance(ids, check_in, check_out, status)
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
}

module.exports = AttendanceController