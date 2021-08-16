class ReimbursementController {
    constructor(ReimbursementService) {
        this.ReimbursementService = ReimbursementService
    }

    createReimbursement = async (req, res) => {
        try {
            const { employeeId, date, amount, reason } = req.body;
            if (!employeeId && !date && !amount && !reason) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.createReimbursement(employeeId, date, amount, reason);
            return res.status(200).json({
                success: `Successfully created reimbursement. Date: ${reimbursement.date} Reason: ${reimbursement.reason} Amount: ${reimbursement.amount} `
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    approveReimbursement = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!id && !status) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.approveReimbursement(id, status);
            return res.status(200).json({
                success: `Successfully ${reimbursement.status} reimbursement ${reimbursement.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllReimbursement = async (req, res) => {
        try {
            const { status } = req.body
            const reimbursement = await this.ReimbursementService.getAllReimbursement(status);
            return res.status(200).json(reimbursement)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getReimbursement = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.getReimbursement(id)
            return res.status(200).json(reimbursement)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = ReimbursementController