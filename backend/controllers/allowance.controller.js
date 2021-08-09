class AllowanceController {
    constructor(AllowanceService) {
        this.AllowanceService = AllowanceService
    }

    createAllowance = async (req, res) => {
        try {
            const { name, description, amount } = req.body;
            if (!name && !description && !amount) {
                return res.status(400).json({
                    error: 'Missing required fields'
                })
            }
            const allowance = await this.AllowanceService.createAllowance(name, description, amount);
            return res.status(200).json({
                success: `Successfully created allowance ${allowance.name}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    deleteAllowance = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const allowance = await this.AllowanceService.deleteAllowance(id);
            return res.status(200).json({
                success: `Successfully removed allowance ${allowance.name}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    editAllowance = async (req, res) => {
        try {
            const { id } = req.params
            const { name, description, amount, status } = req.body;
            if (!id && !name && !description && !amount && !status) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const allowance = await this.AllowanceService.editAllowance(id, name, description, amount, status)
            return res.status(200).json({
                success: `Successfully updated allowance ${allowance.name}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllAllowance = async (req, res) => {
        try {
            const allowance = await this.AllowanceService.getAllAllowance()
            return res.status(200).json(allowance)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllowance = async (req, res) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const allowance = await this.AllowanceService.getAllowance(id)
            return res.status(200).json(allowance)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    addEmployeeToAllowance = async (req, res) => {
        try {
            const { employeeId, allowanceId } = req.body
            if (!employeeId && !allowanceId) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const allowance_employee = await this.AllowanceService.isEmployeeInAllowance(employeeId, allowanceId);
            if (allowance_employee.length >= 1) {
                return res.status(400).json({
                    error: 'The employee is already entitled to this allowance.'
                })
            }
            const employee = await this.AllowanceService.addEmployeeToAllowance(employeeId, allowanceId)
            return res.status(200).json({
                success: `Sucessfully added employee to the allowance`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    removeEmployeeFromAllowance = async (req, res) => {
        try {
            const { employeeId, allowanceId } = req.body;
            const employee = await this.AllowanceService.removeEmployeeFromAllowance(employeeId, allowanceId)
            return res.status(200).json({
                success: `Successfully removed employee from the allowance`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                err: err
            })
        }
    }
}

module.exports = AllowanceController