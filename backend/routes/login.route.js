const express = require('express');
const { verify } = require('../utils/verification')

module.exports.LoginRoute = (LoginController) => {
    const router = express.Router();
    router.post('/login', verify, LoginController.login)
    router.get('/verify', LoginController.verify)
    return router
}