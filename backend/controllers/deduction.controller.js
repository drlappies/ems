class DeductionController {
    constructor(DeductionService) {
        this.DeductionService = DeductionService
    }

    createDeduction = async (req, res) => {
        try {
            const { employeeId, reason, amount, date } = req.body
            if (!employeeId || !reason || !amount || !date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const deduction = await this.DeductionService.createDeduction(employeeId, reason, amount, date)
            return res.status(200).json({
                success: `Successfully created deduction. Reason: ${deduction.reason}. Amount: ${deduction.amount}. Date: ${deduction.date} `
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    deleteDeduction = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const deduction = await this.DeductionService.deleteDeduction(id)
            return res.status(200).json({
                success: `Successfully removed deduction. id: ${deduction.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    updateDeduction = async (req, res) => {
        try {
            const { id } = req.params;
            const { employeeId, reason, amount, date } = req.body;
            if (!id || !employeeId || !reason || !amount || !date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const deduction = await this.DeductionService.updateDeduction(id, employeeId, reason, amount, date)
            return res.status(200).json({
                success: `Successfully updated deduction. ID: ${deduction.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllDeduction = async (req, res) => {
        try {
            const { page, limit, dateFrom, dateTo, amountFrom, amountTo, text, employee_id } = req.query
            const deduction = await this.DeductionService.getAllDeduction(page, limit, dateFrom, dateTo, amountFrom, amountTo, text, employee_id)
            return res.status(200).json({
                deduction: deduction.deduction,
                employee: deduction.employee,
                currentPage: deduction.currentPage,
                currentPageStart: deduction.currentPageStart,
                currentPageEnd: deduction.currentPageEnd,
                pageLength: deduction.pageLength,
                currentLimit: deduction.currentLimit
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getDeduction = async (req, res) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(200).json({
                    error: 'Missing required fields.'
                })
            }
            const deduction = await this.DeductionService.getDeduction(id)
            return res.status(200).json({
                deduction: deduction
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    batchUpdateDeduction = async (req, res) => {
        try {
            const { id, employee_id, date, reason, amount } = req.body;
            const deduction = await this.DeductionService.batchUpdateDeduction(id, employee_id, date, reason, amount)
            return res.status(200).json({
                success: 'Successfully batch updated deduction records.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = DeductionController