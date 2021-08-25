class ReimbursementController {
    constructor(ReimbursementService) {
        this.ReimbursementService = ReimbursementService
    }

    createReimbursement = async (req, res) => {
        try {
            const { employeeId, date, amount, reason } = req.body;
            if (!employeeId || !date || !amount || !reason) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.createReimbursement(employeeId, date, amount, reason);
            return res.status(200).json({
                success: `Successfully created reimbursement. Date: ${new Date(reimbursement.date).getFullYear()} - ${new Date(reimbursement.date).getMonth() + 1} - ${new Date(reimbursement.date).getDate()} Reason: ${reimbursement.reason} Amount: ${reimbursement.amount} `
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    updateReimbursement = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!id && !status) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.updateReimbursement(id, status);
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
            const { page, text, from, to, status } = req.query
            const reimbursement = await this.ReimbursementService.getAllReimbursement(page, text, from, to, status);
            return res.status(200).json({
                reimbursement: reimbursement.reimbursement,
                currentPage: reimbursement.currentPage,
                currentPageStart: reimbursement.currentPageStart,
                currentPageEnd: reimbursement.currentPageEnd,
                pageLength: reimbursement.pageLength
            })
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
            return res.status(200).json({
                reimbursement: reimbursement
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = ReimbursementController