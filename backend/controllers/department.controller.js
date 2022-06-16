class DepartmentController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createOne = async (req, res) => {
        try {
            const name = req.body.name
            const description = req.body.description

            const result = await this.services.department.createOne(name, description)

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            const id = req.params.id

            const result = await this.services.department.getOneById(id)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getMany = async (req, res) => {
        try {
            const offset = req.query.offset ? parseInt(req.query.offset) : undefined
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined
            const search = req.query.search

            const params = {
                offset: offset,
                limit: limit,
                search: search
            }

            const result = await this.services.department.getMany(params)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            const id = req.params.id

            const data = {
                name: req.body.name,
                description: req.body.description
            }

            const result = await this.services.department.updateOneById(id, data)

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

            const result = await this.services.department.updateManyByIds(ids, req.body)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            const ids = req.body.ids
            delete req.body.ids

            await this.services.department.deleteManyByIds(ids)

            res.status(200).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default DepartmentController