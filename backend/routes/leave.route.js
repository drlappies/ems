const express = require('express');

module.exports.LeaveRoute = (LeaveController) => {
    const router = express.Router();
    router.get('/metric', LeaveController.leaveRate)
    router.get('/', LeaveController.getAllLeave)
    router.get('/:id', LeaveController.getLeave)
    router.post('/', LeaveController.createLeave)
    router.put('/', LeaveController.updateLeave)
    router.delete('/', LeaveController.deleteLeave)
    return router
}