class PositionController {
    constructor(PositionService) {
        this.PositionService = PositionService
    }

    createPosition = async (req, res) => {
        try {
            const { name } = req.body;
            const position = await this.PositionService.createPosition(name);
            return res.status(200).json({
                success: `Successfully created position ${position.post}`,
                position: position
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    updatePosition = async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            const position = await this.PositionService.updatePosition(id, name)
            return res.status(200).json({
                success: `Successfully created position ${position.post}`,
                position: position
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getAllPosition = async (req, res) => {
        try {
            const position = await this.PositionService.getAllPosition()
            return res.status(200).json({
                position: position
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getPosition = async (req, res) => {
        try {
            const { id } = req.params
            const position = await this.PositionService.getPosition(id)
            return res.status(200).json({
                position: position
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    deletePosition = async (req, res) => {
        try {
            const { id } = req.params
            const position = await this.PositionService.deletePosition(id)
            return res.status(200).json({
                position: position
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = PositionController