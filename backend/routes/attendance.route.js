const express = require('express');

module.exports.AttendanceRoute = (AttendanceController) => {
    const router = express.Router();
    router.post('/time-in', AttendanceController.createTimeIn);
    router.post('/time-out', AttendanceController.createTimeOut);
    router.post('/re-time-in', AttendanceController.createSpecificTimeIn);
    router.post('/re-time-out', AttendanceController.createSpecificTimeOut);
    return router
}