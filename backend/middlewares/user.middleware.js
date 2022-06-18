class UserMiddleware {
    constructor({ utils, services, jwt }) {
        this.utils = utils
        this.services = services
        this.jwt = jwt
    }

    verify = async (req, res, next) => {
        try {
            const token = req.headers.token
            const jwtRes = await this.jwt.verify(token, process.env.SECRET)

            const user = await this.services.employee.getOneById(jwtRes.id)

            if (user.status === "unavailable") {
                res.status(400).json({ error: "user is unavailable/banned" })
                return
            }

            req.user = user
            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }

    verifyStatus = async (req, res, next) => {
        try {
            let user = req.user

            if (!user) {
                const token = req.headers.token
                const jwtRes = await this.jwt.verify(token, process.env.SECRET)

                user = await this.services.employee.getOneById(jwtRes.id)
                req.user = user
            }

            if (user.status === "unavailable") {
                res.status(400).json({ error: "user is unavailable/banned" })
                return
            }

            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }

    verifyRole = async (req, res, next) => {
        try {
            let user = req.user

            if (!user) {
                const token = req.headers.token
                const jwtRes = await this.jwt.verify(token, process.env.SECRET)

                user = await this.services.employee.getOneById(jwtRes.id)
                req.user = user
            }

            if (user.role === "employee") {
                res.status(400).json({ error: "no permission" })
                return
            }

            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default UserMiddleware