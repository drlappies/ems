class BonusController {
    constructor(BonusService) {
        this.BonusService = BonusService
    }

    createBonus = async (req, res) => {
        try {
            const { employeeId, reason, amount, date } = req.body;
            if (!employeeId || !reason || !amount || !date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.createBonus(employeeId, reason, amount, date);
            return res.status(200).json({
                success: `Successfully created bonus ${bonus.id}. Amount: ${bonus.amount}.`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    deleteBonus = async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.deleteBonus(id);
            return res.status(200).json({
                success: bonus.length > 1 ? "Successfully batch deleted bonus" : `Successfully deleted bonus ID: ${bonus[0].id}.`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    editBonus = async (req, res) => {
        try {
            const { id, employeeId, reason, amount, date } = req.body;
            if (!id && !employeeId && !reason && !amount && !date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.editBonus(id, employeeId, reason, amount, date);
            return res.status(200).json({
                success: `Successfully edited bouns ${bonus.id}`,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getAllBonus = async (req, res) => {
        try {
            const { offset, limit, search, employee, amountFrom, amountTo } = req.query
            const query = await this.BonusService.getAllBonus(offset, limit, search, employee, amountFrom, amountTo);
            return res.status(200).json({
                bonus: query.bonus,
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

    getBonus = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.getBonus(id);
            return res.status(200).json({
                bonus: bonus,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    getBonusByEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { offset, limit } = req.query
            const query = await this.BonusService.getBonusByEmployee(id, offset, limit);
            return res.status(200).json({
                bonus: query.bonus,
                rowCount: query.count
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = BonusController