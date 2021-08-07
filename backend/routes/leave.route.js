const express = require('express');

module.exports.LeaveRoute = (LeaveController) => {
    const router = express.Router();
    router.get('/', LeaveController.getAllLeave)
    router.get('/:id', LeaveController.getLeave)
    router.post('/', LeaveController.createLeave)
    router.put('/:id', LeaveController.approveLeave)
    return router
}