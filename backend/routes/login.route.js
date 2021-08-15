const express = require('express');

module.exports.LoginRoute = (LoginController) => {
    const router = express.Router();
    router.post('/login', LoginController.login)
    router.post('/verify', LoginController.verify)
    return router
}