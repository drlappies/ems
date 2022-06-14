class PositionController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createPosition = async (req, res) => {
        try {
            const { name } = req.body;
            const position = await this.PositionService.createPosition(name);
            return res.status(200).json({
                success: `Successfully created position ${position.post}`,
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
            const { id, name } = req.body
            if (!name) {
                return res.status(400).json({
                    error: 'Missing required fields!'
                })
            }
            const position = await this.PositionService.updatePosition(id, name)
            return res.status(200).json({
                success: position.length > 1 ? "Successfully batch updated positions" : `Successfully updated position ID: ${position[0].id}`,
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
            const { offset, limit, search } = req.query
            const query = await this.PositionService.getAllPosition(offset, limit, search)
            return res.status(200).json({
                position: query.position,
                rowCount: query.count
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
            const { id } = req.query
            const position = await this.PositionService.deletePosition(id)
            return res.status(200).json({
                success: position.length > 1 ? "Successfully batch deleted positions" : `Successfully deleted position ID: ${position[0].id}`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }

    getPositionCount = async (req, res) => {
        try {
            const positionCount = await this.PositionService.getPositionCount();
            return res.status(200).json({
                positionCount: positionCount
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }
    }
}

export default PositionController