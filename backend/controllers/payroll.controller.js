class PayrollController {
    constructor(PayrollService) {
        this.PayrollService = PayrollService;
    }

    createPayroll = async (req, res) => {
        try {
            const { employee_id, starting_date, ending_date, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled } = req.body;
            if (!employee_id || !starting_date || !ending_date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const isOverlapped = await this.PayrollService.checkIfPayrollOverlapped(employee_id, starting_date, ending_date);
            if (isOverlapped.length >= 1) {
                return res.status(400).json({
                    error: 'Payroll period overlapped.'
                })
            }
            const payroll = await this.PayrollService.createPayroll(employee_id, starting_date, ending_date, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled);
            return res.status(200).json({
                success: 'Successfully created payroll.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    deletePayroll = async (req, res) => {
        try {
            const { id } = req.query;
            const payroll = await this.PayrollService.deletePayroll(id);
            return res.status(200).json({
                success: 'Successfully deleted payroll'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getPayroll = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const payroll = await this.PayrollService.getPayroll(id)
            return res.status(200).json(payroll)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllPayroll = async (req, res) => {
        try {
            const { page, from, to, text, status, limit, amountFrom, amountTo, isReimbursementCaled, isAllowanceCaled, isBonusCaled, isDeductCaled, isLeaveCaled, isOvertimeCaled } = req.query
            const payroll = await this.PayrollService.getAllPayroll(page, limit, from, to, text, status, amountFrom, amountTo, isReimbursementCaled, isAllowanceCaled, isBonusCaled, isDeductCaled, isLeaveCaled, isOvertimeCaled);
            return res.status(200).json({
                payroll: payroll.payroll,
                employee: payroll.employee,
                currentPage: payroll.currentPage,
                currentPageStart: payroll.currentPageStart,
                currentPageEnd: payroll.currentPageEnd,
                pageLength: payroll.pageLength,
                currentLimit: payroll.currentLimit
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    updatePayroll = async (req, res) => {
        try {
            const { id, status } = req.body

            if (!id || !status) {
                return res.status(401).json({
                    error: 'Missing required fields.'
                })
            }

            const payroll = await this.PayrollService.updatePayroll(id, status);
            return res.status(200).json({
                success: 'Successfully updated payroll.'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = PayrollController