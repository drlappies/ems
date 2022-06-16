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

            const payload = {
                id: user.id,
                department: user.name,
                position: user.position,
                address: user.address,
                phone_number: user.phone_number,
                emergency_contact_person: user.emergency_contact_person,
                emergency_contact_number: user.emergency_contact_number,
                onboard_date: user.onboard_date,
                role: user.role,
                start_hour: user.start_hour,
                end_hour: user.end_hour,
                ot_pay_entitled: user.ot_pay_entitled,
                ot_hourly_salary: user.ot_hourly_salary,
                annual_leave_count: user.annual_leave_count,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }

            const token = await this.jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' })

            res.status(200).json({ token, payload })
        } catch (error) {
            this.logger.error(error)
            res.status(500).json(error)
        }
    }
}

export default LoginController