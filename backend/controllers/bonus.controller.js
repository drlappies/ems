class BonusController {
    constructor(BonusService) {
        this.BonusService = BonusService
    }

    createBonus = async (req, res) => {
        try {
            const { employeeId, reason, amount, date } = req.body;
            if (!employeeId && !reason && !amount && !date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.createBonus(employeeId, reason, amount, date);
            return res.status(200).json({
                success: `Successfully created bonus ${bonus.id}. Amount: ${bonus.amount}. Date: ${bonus.date}`
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
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.deleteBonus(id);
            return res.status(200).json({
                success: `Successfully deleted bonus ${bonus.id}`
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
            const { id } = req.params;
            const { employeeId, reason, amount, date } = req.body;
            if (!id && !employeeId && !reason && !amount && !date) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const bonus = await this.BonusService.editBonus(id, employeeId, reason, amount, date);
            return res.status(200).json({
                success: `Successfully edited bouns ${bonus.id}`
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
            const bonus = await this.BonusService.getAllBonus();
            return res.status(200).json(bonus)
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
            return res.status(200).json(bonus)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = BonusController