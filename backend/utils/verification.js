const jwt = require('jsonwebtoken');

module.exports.verify = (req, res, next) => {
    if (req.originalUrl === '/api/auth/login') {
        return next()
    }
    const { token } = req.headers
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                error: "Unauthorised"
            })
        } else {
            next()
        }
    })
}