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
            const { status, reason, date, amount } = req.body;
            if (!id || !status || !reason || !date || !amount) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.updateReimbursement(id, status, reason, date, amount);
            return res.status(200).json({
                success: `Successfully updated reimbursement ID: ${reimbursement.id}`,
                reimbursement: reimbursement
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
            const { page, limit, text, dateFrom, dateTo, amountFrom, amountTo, status } = req.query
            const reimbursement = await this.ReimbursementService.getAllReimbursement(page, limit, text, dateFrom, dateTo, amountFrom, amountTo, status);
            return res.status(200).json({
                reimbursement: reimbursement.reimbursement,
                currentPage: reimbursement.currentPage,
                currentPageStart: reimbursement.currentPageStart,
                currentPageEnd: reimbursement.currentPageEnd,
                pageLength: reimbursement.pageLength,
                currentLimit: reimbursement.currentLimit,
                employeeList: reimbursement.employeeList
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

    getReimbursementCount = async (req, res) => {
        try {
            const reimbursementCount = await this.ReimbursementService.getReimbursementCount();
            return res.status(200).json({
                reimbursementCount: reimbursementCount
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    deleteReimbursement = async (req, res) => {
        try {
            const { id } = req.params;
            const reimbursement = await this.ReimbursementService.deleteReimbursement(id)
            return res.status(200).json({
                success: `Successfully deleted reimbursement record ID: ${reimbursement.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchUpdateReimbursement = async (req, res) => {
        try {
            const { id, amount, date, reason, status } = req.body;
            const reimbursement = await this.ReimbursementService.batchUpdateReimbursement(id, amount, date, reason, status);
            return res.status(200).json({
                success: 'Successfully batch updated reimbursement records.',
                update: reimbursement
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchDeleteReimbursement = async (req, res) => {
        try {
            const { id } = req.query
            const reimbursement = await this.ReimbursementService.batchDeleteReimbursement(id);
            return res.status(200).json({
                success: 'Successfully batch deleted reimbursement records.',
                delete: reimbursement
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