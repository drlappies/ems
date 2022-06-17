class PositionController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createOne = async (req, res) => {
        try {
            const post = req.body.post

            if (!post) {
                res.status(400).json({ error: "Position name is required" })
                return
            }

            const result = await this.services.position.createOne(post)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id
            const post = req.body.post

            if (!post) {
                res.status(400).json({ error: "Position name is required" })
                return
            }

            const result = await this.services.position.updateOneById(id, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            const post = req.body.post

            if (!post) {
                res.status(400).json({ error: "Position name is required" })
                return
            }

            const result = await this.services.position.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getMany = async (req, res) => {
        try {
            const offset = req.query.offset ? parseInt(req.query.offset) : req.query.offset
            const limit = req.query.limit ? parseInt(req.query.limit) : req.query.limit

            const params = {
                offset: offset,
                limit: limit,
                search: req.query.search
            }

            const result = await this.services.position.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.position.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            const id = req.params.id

            await this.services.position.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids

            await this.services.position.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default PositionController