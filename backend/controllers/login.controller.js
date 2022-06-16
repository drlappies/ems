class LoginController {
    constructor({ logger, services }) {
        this.logger = logger
        this.services = services
    }

    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(401).json({
                    error: 'Incorrect credentials.'
                })
            }
            const user = await this.LoginService.getUserByUsername(username);
            if (!user || user.status === 'unavailable' || user.status === 'temporarily_unavailable') {
                return res.status(401).json({
                    error: 'Incorrect credentials.'
                })
            }
            const isPasswordValid = await checkPassword(password, user.password)
            if (!isPasswordValid) {
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
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            return res.status(200).json({
                token: token,
                payload: payload
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

    verify = async (req, res) => {
        try {
            const { token } = req.headers
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            return res.status(200).json({
                token: token,
                payload: decoded
            })
        } catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    }
}

export default LoginController