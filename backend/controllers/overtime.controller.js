class OvertimeController {
    constructor(OvertimeService) {
        this.OvertimeService = OvertimeService
    }

    createOvertimeTimein = async (req, res) => {
        try {
            const { employee_id } = req.body;
            if (!employee_id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const isTimedin = await this.OvertimeService.checkIfTimedin(employee_id)
            if (isTimedin.length >= 1) {
                return res.status(400).json({
                    error: 'Already checked in for overtime today.'
                })
            }
            const timein = await this.OvertimeService.createOvertimeTimein(employee_id, 'now');
            return res.status(200).json({
                success: `Successfully checked in (OT) at ${timein.from} on ${timein.date.getFullYear()}-${timein.date.getMonth() + 1}-${timein.date.getDate()}`,
                timein: timein.from
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    createOvertimeTimeout = async (req, res) => {
        try {
            const { employee_id } = req.body;
            if (!employee_id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const isTimedout = await this.OvertimeService.checkIfTimedout(employee_id)
            if (isTimedout.length >= 1) {
                return res.status(400).json({
                    error: 'Already timed out for overtime today.'
                })
            }
            const timeout = await this.OvertimeService.createOvertimeTimeout(employee_id);
            return res.status(200).json({
                success: `Successfully checked out (OT) at ${timeout.to} on ${timeout.date.getFullYear()}-${timeout.date.getMonth() + 1}-${timeout.date.getDate()}`,
                timeout: timeout.to
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    createOvertime = async (req, res) => {
        try {
            const { employee_id, date, from, to, status } = req.body;
            if (!employee_id || !date || !from || !to) {
                return res.status(400).json({
                    error: 'Missing required fields!'
                })
            }
            const currentDate = new Date(new Date().setHours(0, 0, 0, 0))
            if (new Date(date) > currentDate) {
                return res.status(400).json({
                    error: 'Cannot time in future dates!'
                })
            }
            if (await this.OvertimeService.checkForConflict(employee_id, date)) {
                return res.status(400).json({
                    error: 'Already timed in that day!'
                })
            }

            if (from >= to) {
                return res.status(400).json({
                    error: 'Check in time cannot be greater than or equal to check out time!'
                })
            }

            const overtime = await this.OvertimeService.createOvertime(employee_id, date, from, to, status)
            return res.status(200).json({
                success: `Succsesfully created specific overtime record on ${overtime[0].date.getFullYear()}-${overtime[0].date.getMonth() + 1}-${overtime[0].date.getDate()}`,
                overtime: overtime
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    updateOvertime = async (req, res) => {
        try {
            const { id } = req.params;
            const { from, to, status } = req.body;
            const overtime = await this.OvertimeService.updateOvertime(id, from, to, status);
            return res.status(200).json({
                success: `Successfully updated overtime record ID: ${overtime.map(el => `${el.id}`)}`,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    deleteOvertime = async (req, res) => {
        try {
            const { id } = req.params
            const overtime = await this.OvertimeService.deleteOvertime(id);
            return res.status(200).json({
                success: `Successfully deleted overtime record ${overtime.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllOvertime = async (req, res) => {
        try {
            const { offset, limit, search, dateTo, dateFrom, status, employee } = req.query
            const query = await this.OvertimeService.getAllOvertime(offset, limit, search, dateFrom, dateTo, employee, status);
            return res.status(200).json({
                overtime: query.overtime,
                employee: query.employee,
                count: query.count
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getOvertime = async (req, res) => {
        try {
            const { id } = req.params
            const overtime = await this.OvertimeService.getOvertime(id)
            return res.status(200).json({
                overtime: overtime
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getEmployeeOvertimeStatus = async (req, res) => {
        try {
            const { employeeId } = req.params;
            const overtimeStatus = await this.OvertimeService.getEmployeeOvertimeStatus(employeeId);
            return res.status(200).json({
                checkIn: overtimeStatus.from,
                checkOut: overtimeStatus.to
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchDeleteOvertime = async (req, res) => {
        try {
            const { id } = req.query;
            const overtime = await this.OvertimeService.batchDeleteOvertime(id)
            return res.status(200).json({
                success: 'Successfully batch deleted overtime records.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchUpdateOvertime = async (req, res) => {
        try {
            const { id, from, to, status } = req.body
            const overtime = await this.OvertimeService.batchUpdateOvertime(id, from, to, status)
            return res.status(200).json({
                success: 'Successfully batch updated overtime records.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = OvertimeController