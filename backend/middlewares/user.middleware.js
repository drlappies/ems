class UserMiddleware {
    constructor({ jwt, services }) {
        this.jwt = jwt
        this.services = services
    }

    getUser = (req, res, next) => {
        try {
            const token = req.headers.token

            this.jwt.verify(token, process.env.SECRET, err => {
                if (err) {
                    res.status(400).json({ error: "unauthorised" })
                    return
                }
            })

            //TODO fetch user from here

            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default UserMiddleware