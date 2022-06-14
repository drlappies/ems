class PayrollController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createPayroll = async (req, res) => {
        try {
            const { employee_id, starting_date, ending_date, payday, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled } = req.body;
            if (!employee_id || !starting_date || !ending_date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }

            if (starting_date > ending_date) {
                return res.status(400).json({
                    error: 'Starting date of a payroll period cannot be later than its ending date!'
                })
            }

            const isOverlapped = await this.PayrollService.checkIfPayrollOverlapped(employee_id, starting_date, ending_date);
            if (isOverlapped.length >= 1) {
                return res.status(400).json({
                    error: `Payroll period overlapped, conflict found at record ID: ${isOverlapped[0].id}`
                })
            }
            const payroll = await this.PayrollService.createPayroll(employee_id, starting_date, ending_date, payday, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled);
            return res.status(200).json({
                success: `Successfully created payroll record ID: ${payroll.id}`
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
            const confirmedPayrolls = await this.PayrollService.checkIfPayrollConfirmed(id);
            if (confirmedPayrolls.length > 0) {
                return res.status(400).json({
                    error: "Cannot delete a confirmed payroll!"
                })
            }

            const payroll = await this.PayrollService.deletePayroll(id);
            return res.status(200).json({
                success: payroll.length > 1 ? "Successfully batch deleted payroll records" : `Successfully deleted payroll record ID: ${payroll[0].id}`
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

    getPayrollByEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { offset, limit } = req.query
            const query = await this.PayrollService.getPayrollByEmployee(id, offset, limit);
            return res.status(200).json({
                payroll: query.payroll,
                rowCount: query.count
            })
        } catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllPayroll = async (req, res) => {
        try {
            const { offset, limit, search, employee, status, dateFrom, dateTo, amountFrom, amountTo } = req.query
            const query = await this.PayrollService.getAllPayroll(offset, limit, search, employee, status, dateFrom, dateTo, amountFrom, amountTo);
            return res.status(200).json({
                payroll: query.payroll,
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

    updatePayroll = async (req, res) => {
        try {
            const { status, id } = req.body;
            if (!id || !status) {
                return res.status(401).json({
                    error: 'Missing required fields.'
                })
            }
            const payroll = await this.PayrollService.updatePayroll(id, status);
            console.log(payroll)
            return res.status(200).json({
                success: "Successfully updated payroll"
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

export default PayrollController