const express = require('express');

module.exports.UserRoute = (userController) => {
    const router = express.Router();
    router.post('/', userController.createUser)
    return router
}