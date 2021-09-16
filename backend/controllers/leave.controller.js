class LeaveController {
    constructor(LeaveService) {
        this.LeaveService = LeaveService
    }

    getLeave = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields'
                })
            }
            const leave = await this.LeaveService.getLeave(id);
            return res.status(200).json({
                leave: leave
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getAllLeave = async (req, res) => {
        try {
            const { page, from, to, type, status, text, limit, employee_id } = req.query
            const data = await this.LeaveService.getAllLeave(page, from, to, type, status, text, limit, employee_id);
            return res.status(200).json({
                leave: data.leave,
                employee: data.employee,
                currentPage: data.currentPage,
                currentPageStart: data.currentPageStart,
                currentPageEnd: data.currentPageEnd,
                pageLength: data.pageLength,
                currentLimit: data.currentLimit
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    createLeave = async (req, res) => {
        try {
            const { employeeId, reason, from, to, duration, type } = req.body;
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

            const leaveConflict = await this.LeaveService.checkLeaveConflict(employeeId, from, to)
            if (leaveConflict.length >= 1) {
                return res.status(400).json({
                    error: 'Found conflicting leave record.'
                })
            }

            const leave = await this.LeaveService.createLeave(employeeId, reason, from, to, duration, type);
            res.status(200).json({
                success: `Successfully applied for leave from ${new Date(leave.from).getFullYear()} - ${new Date(leave.from).getMonth() + 1} - ${new Date(leave.from).getDate()} to ${new Date(leave.to).getFullYear()} - ${new Date(leave.to).getMonth() + 1} - ${new Date(leave.to).getDate()} Reason: ${leave.reason}`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    updateLeave = async (req, res) => {
        try {
            let { status, duration, type, ids } = req.body;
            if (!Array.isArray(ids)) ids = [ids];
            const leave = await this.LeaveService.updateLeave(ids, duration, type, status);
            res.status(200).json({
                success: `Successfully updated leave record`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    deleteLeave = async (req, res) => {
        try {
            let { ids } = req.query;
            if (!Array.isArray(ids)) ids = [ids];
            const leave = await this.LeaveService.deleteLeave(ids)
            res.status(200).json({
                success: `Successfully deleted leave record`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = LeaveController