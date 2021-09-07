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
                success: `Successfully updated position ID: ${position.id}`,
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
            const { page, name, limit } = req.query
            const query = await this.PositionService.getAllPosition(page, name, limit)
            return res.status(200).json({
                position: query.position,
                currentPage: query.currentPage,
                currentPageStart: query.currentPageStart,
                currentPageEnd: query.currentPageEnd,
                pageLength: query.count,
                currentLimit: query.currentLimit
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
                success: `Successfully deleted position ID: ${position.id}`
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

    batchDeletePosition = async (req, res) => {
        try {
            let { id } = req.query
            if (!Array.isArray(id)) id = [id]
            const position = await this.PositionService.batchDeletePosition(id)
            return res.status(200).json({
                success: 'Successfully deleted position records.'
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