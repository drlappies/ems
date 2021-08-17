const { checkPassword } = require('../utils/hashPassword')
const jwt = require('jsonwebtoken');

class LoginController {
    constructor(LoginService) {
        this.LoginService = LoginService
    }

    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(401).json({
                    'message': 'Incorrect credentials.'
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
                    'message': 'Incorrect credentials.'
                })
            }
            const payload = {
                id: user.id,
                dept: user.dept_id,
                post: user.post_id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                address: user.address,
                phone_number: user.phone_number,
                emergency_contact_person: user.emergency_contact_person,
                emergency_contact_number: user.emergency_contact_number,
                role: user.role,
                ot_entitled: user.ot_pay_entitled,
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
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = LoginController