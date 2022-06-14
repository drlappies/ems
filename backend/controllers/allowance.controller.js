class AllowanceController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    createOne = async (req, res) => {
        try {
            this.logger.info("POST create one allowance")
            const { name, description, amount, status } = req.body;

            if (!name || !description || !amount) {
                return res.status(400).json({
                    error: 'Missing required fields'
                })
            }

            const result = await this.services.allowance.createOne(name, description, amount, status)

            return res.status(200).json(result)
        } catch (err) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteOneById = async (req, res) => {
        try {
            this.logger.info("DELETE delete one allowance")
            const id = req.params.id;

            await this.services.allowance.deleteOneById(id)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    deleteManyByIds = async (req, res) => {
        try {
            this.logger.info("POST delete many allowance")
            const ids = req.body.ids

            await this.services.allowance.deleteManyByIds(ids)

            res.status(204).json()
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateOneById = async (req, res) => {
        try {
            this.logger.info("UPDATE update one allowance by id")
            const id = req.params.id

            const data = {
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount,
                status: req.body.status
            }

            const result = await this.services.allowance.updateOneById(id, data)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    updateManyByIds = async (req, res) => {
        try {
            this.logger.info("UPDATE update many allowance by ids")
            const ids = req.body.ids

            const data = {
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount,
                status: req.body.status,
            };

            const result = await this.services.allowance.updateManyByIds(ids, data)

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getMany = async (req, res) => {
        try {
            this.logger.info("GET get many allowance")
            const params = {
                offset: req.query.offset,
                limit: req.query.limit,
                minamount: req.query.minamount,
                maxamount: req.query.maxamount,
                search: req.query.search,
                status: req.query.status,
            }

            const result = await this.services.allowance.getMany(params)

            return res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }

    getOneById = async (req, res) => {
        try {
            this.logger.info("GET get one allowance by id")
            const id = req.params.id
            const result = await this.services.allowance.getOneById(id)

            if (!result) {
                res.status(400).json({ error: "resource not found " })
                return;
            }

            res.status(200).json(result)
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default AllowanceController