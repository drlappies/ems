const express = require('express');

module.exports.LoginRoute = (LoginController) => {
    const router = express.Router();
    router.post('/login', LoginController.login)
    router.get('/verify', LoginController.verify)
    return router
}