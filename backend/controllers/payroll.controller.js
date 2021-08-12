class PayrollController {
    constructor(PayrollService) {
        this.PayrollService = PayrollService;
    }

    createPayroll = async (req, res) => {
        try {
            const { employee_id, starting_date, ending_date } = req.body;
            if (!employee_id && !starting_date && !ending_date) {
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
            const payroll = await this.PayrollService.createPayroll(employee_id, starting_date, ending_date);
            return res.status(200).json({
                success: `Successfully created payroll: ${new Date(payroll.from).getFullYear()}-${new Date(payroll.from).getMonth() + 1}-${new Date(payroll.from).getDate()} to ${new Date(payroll.to).getFullYear()}-${new Date(payroll.to).getMonth() + 1}-${new Date(payroll.to).getDate()} for employee ${payroll.employee_id}. Amount: ${payroll.amount}`
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
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const payroll = await this.PayrollService.deletePayroll(id);
            return res.status(200).json({
                success: `Successfully deleted payroll ${new Date(payroll.from).getFullYear()}-${new Date(payroll.from).getMonth() + 1}-${new Date(payroll.from).getDate()} to ${new Date(payroll.to).getFullYear()}-${new Date(payroll.to).getMonth() + 1}-${new Date(payroll.to).getDate()} of employee ${payroll.employee_id}.`
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
            const payroll = await this.PayrollService.getAllPayroll();
            return res.status(200).json(payroll)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    confirmPayroll = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!id && !status) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            if (status !== 'confirmed' || status !== 'pending') {
                return res.status(400).json({
                    error: 'Invalid status for payroll.'
                })
            }
            const payroll = await this.PayrollService.confirmPayroll(id, status);
            return res.status(200).json({
                success: `Successfully updated payroll id: ${payroll.id} status to ${payroll.status}. Period: ${new Date(payroll.from).getFullYear()}-${new Date(payroll.from).getMonth() + 1}-${new Date(payroll.from).getDate()} to ${new Date(payroll.to).getFullYear()}-${new Date(payroll.to).getMonth() + 1}-${new Date(payroll.to).getDate()}`
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