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

            req.user = user
            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default UserMiddleware