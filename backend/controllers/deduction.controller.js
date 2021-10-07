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
            const { id } = req.query;
            const deduction = await this.DeductionService.deleteDeduction(id)
            return res.status(200).json({
                success: `Successfully removed deduction record.`
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
            const { id, employeeId, reason, amount, date } = req.body;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const deduction = await this.DeductionService.updateDeduction(id, employeeId, reason, amount, date)
            return res.status(200).json({
                success: deduction.length > 1 ? "Successfully batch updated deduction" : `Successfully updated deduction. ID: ${deduction[0].id}`
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
            const { offset, limit, search, employee, amountFrom, amountTo } = req.query
            const query = await this.DeductionService.getAllDeduction(offset, limit, search, employee, amountFrom, amountTo)
            return res.status(200).json({
                deduction: query.deduction,
                employee: query.employee,
                rowCount: query.count
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

    getDeductionByEmployee = async (req, res) => {
        try {
            const { id } = req.params
            const deduction = await this.DeductionService.getDeductionByEmployee(id);
            return res.status(200).json({
                deduction: deduction
            })
        } catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = DeductionController