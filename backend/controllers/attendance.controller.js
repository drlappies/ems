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
                success: `Successfully timed in at ${timeIn.check_in} on ${timeIn.date}`
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
                success: `Successfully time out at ${timeOut.check_out} on ${timeOut.date}`
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
            const { employeeId, checkInTime, checkInDate } = req.body
            if (!employeeId && !checkInTime && !checkInDate) {
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
            console.log(employeeId)
            console.log(this.createSpecificTimeIn)
            const attendance = await this.AttendanceService.createSpecificTimeIn(employeeId, checkInTime, checkInDate);
            return res.status(200).json({
                success: `Successfully re-timed in at ${attendance.check_in} on ${attendance.date}`
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