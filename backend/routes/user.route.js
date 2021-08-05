const express = require('express');

module.exports.UserRoute = (userController) => {
    const router = express.Router();
    router.post('/', userController.createUser)
    router.delete('/:id', userController.deleteUser)
    router.put('/:id', userController.updateUser)
    return router
}