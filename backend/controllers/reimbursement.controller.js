class ReimbursementController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createReimbursement = async (req, res) => {
        try {
            const { employeeId, date, amount, reason, status } = req.body;
            if (!employeeId || !date || !amount || !reason) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.createReimbursement(employeeId, date, amount, reason, status);
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
            const { id, status, reason, date, amount } = req.body;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const reimbursement = await this.ReimbursementService.updateReimbursement(id, status, reason, date, amount);
            return res.status(200).json({
                success: reimbursement.length > 1 ? "Successfully batch updated reimbursement" : `Successfully updated reimbursement ID: ${reimbursement[0].id}`,
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
            const { offset, limit, search, employee, status, dateFrom, dateTo, amountFrom, amountTo } = req.query
            const query = await this.ReimbursementService.getAllReimbursement(offset, limit, search, employee, status, dateFrom, dateTo, amountFrom, amountTo);
            return res.status(200).json({
                reimbursement: query.reimbursement,
                rowCount: query.count,
                employee: query.employee
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

    getReimbursementByEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { offset, limit } = req.query;
            const query = await this.ReimbursementService.getReimbursementByEmployee(id, offset, limit);
            return res.status(200).json({
                reimbursement: query.reimbursement,
                rowCount: query.count
            })
        } catch (err) {
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
            const { id } = req.query;
            const activeReimbursement = await this.ReimbursementService.checkIfStatusActive(id)
            if (activeReimbursement.length > 0) {
                return res.status(400).json({
                    error: 'Cannot delete approved reimbursement!'
                })
            }

            const reimbursement = await this.ReimbursementService.deleteReimbursement(id)
            return res.status(200).json({
                success: reimbursement.length > 1 ? "Successfully batch deleted reimubursement" : `Successfully deleted reimbursement record ID: ${reimbursement[0].id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

export default ReimbursementController