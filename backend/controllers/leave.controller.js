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
            return res.status(200).json(leave)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getAllLeave = async (req, res) => {
        try {
            const leave = await this.LeaveService.getAllLeave();
            return res.status(200).json(leave);
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
            if (!employeeId && !reason && !from && !to && !duration && !type) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const leave = await this.LeaveService.createLeave(employeeId, reason, from, to, duration, type);
            res.status(200).json({
                success: `Successfully applied for leave from ${leave.from} to ${leave.to} for reason: ${leave.reason} type: ${leave.type} duration: ${leave.duration}`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    approveLeave = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!id && !status) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const leave = await this.LeaveService.approveLeave(id, status);
            res.status(200).json({
                success: `Successfully ${leave.status} leave id: ${leave.id}`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    leaveRate = async (req, res) => {
        try {
            const rate = await this.LeaveService.leaveRate();
            return res.status(200).json({ rate: rate })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = LeaveController