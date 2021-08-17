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
            if (attendance.length >= 1) {
                return res.status(400).json({ error: 'Already timed in today!' })
            }
            const timeIn = await this.AttendanceService.createTimeIn(employeeId);
            return res.status(200).json({
                success: `Successfully timed in at ${timeIn.check_in} on ${timeIn.date}`,
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
            if (isTimedOut.length >= 1) {
                return res.status(400).json({ error: 'Already timed out today!' });
            }
            const timeOut = await this.AttendanceService.createTimeOut(employeeId);
            return res.status(200).json({
                success: `Successfully time out at ${timeOut.check_out} on ${timeOut.date}`,
                timeout: timeOut.check_out
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    createSpecificTimeIn = async (req, res) => {
        try {
            const { employeeId, checkInTime, checkOutTime, checkInDate } = req.body
            if (!employeeId && !checkInTime && !checkOutTime && !checkInDate) {
                return res.status(400).json({
                    error: 'Missing required fields!'
                })
            }
            const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
            if (checkInDate >= currentDate) {
                return res.status(400).json({
                    error: 'Cannot create specific time-in on future dates'
                })
            }
            const attendance = await this.AttendanceService.checkIfSpecificAlreadyTimedIn(employeeId, checkInDate);
            if (attendance.length >= 1) {
                return res.status(400).json({
                    error: 'Already timed in/ out on such specific date.'
                })
            }
            const timeIn = await this.AttendanceService.createSpecificTimeIn(employeeId, checkInTime, checkOutTime, checkInDate);
            return res.status(200).json({
                success: `Successfully re-timed in at ${timeIn.check_in} on ${timeIn.date}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    createSpecificTimeOut = async (req, res) => {
        try {
            const { employeeId, checkOutTime, checkInDate } = req.body;
            if (!employeeId && !checkOutTime && !checkInDate) {
                return res.status(400).json({
                    error: 'Missing required fields'
                })
            }
            const currentTime = new Date();
            const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
            if (date === checkInDate) {
                return res.status(400).json({
                    error: 'Cannot create specific time out on that specific date. Please use the usual time out feature.'
                })
            }
            const attendance = await this.AttendanceService.checkIfAlreadyTimedOut(employeeId, checkInDate);
            if (attendance.length >= 1) {
                return res.status(400).json({
                    error: 'Alread timed out on such specific date'
                })
            }
            const timeOut = await this.AttendanceService.createSpecificTimeOut(employeeId, checkOutTime, checkInDate);
            return res.status(200).json({
                success: `Successfully re-timed out at ${timeOut.check_out} on ${timeOut.date}`
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
            const { starting, ending, employee_id, page } = req.query
            const attendance = await this.AttendanceService.getAllAttendance(starting, ending, page, employee_id);
            return res.status(200).json(attendance)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getOnTimeRate = async (req, res) => {
        try {
            const rate = await this.AttendanceService.getOnTimeRate();
            return res.status(200).json({ rate: rate })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = AttendanceController