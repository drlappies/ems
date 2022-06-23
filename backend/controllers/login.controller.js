class LoginController {
    constructor({ logger, services, utils, jwt }) {
        this.logger = logger
        this.services = services
        this.utils = utils
        this.jwt = jwt
    }

    login = async (req, res) => {
        try {
            const username = req.body.username
            const password = req.body.password

            if (!username || !password) {
                return res.status(401).json({
                    error: 'Incorrect credentials.'
                })
            }

            const user = await this.services.employee.getOneByUsername(username)
            if (!user || user.status === 'unavailable' || user.status === 'temporarily_unavailable') {
                return res.status(401).json({
                    error: 'Incorrect credentials.'
                })
            }

            const isPwValid = await this.utils.password.validatePassword(password, user.password)

            if (!isPwValid) {
                return res.status(401).json({
                    error: 'Incorrect credentials.'
                })
            }

            const userObj = user;
            delete userObj.password
            delete userObj.username

            const token = await this.jwt.sign(userObj, process.env.SECRET, { expiresIn: '7d' })

            res.status(200).json({ token, userObj })
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default LoginController