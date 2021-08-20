const express = require('express');

module.exports.AttendanceRoute = (AttendanceController) => {
    const router = express.Router();
    router.post('/', AttendanceController.createAttendance)
    router.post('/time-in', AttendanceController.createTimeIn);
    router.post('/time-out', AttendanceController.createTimeOut);
    router.post('/re-time-in', AttendanceController.createSpecificTimeIn);
    router.post('/re-time-out', AttendanceController.createSpecificTimeOut);
    router.get('/', AttendanceController.getAllAttendance)
    router.get('/rate', AttendanceController.getOnTimeRate)
    router.get('/:employeeId', AttendanceController.getTodayAttendanceByEmployee)
    router.delete('/:id', AttendanceController.deleteAttendance)
    router.put('/:id', AttendanceController.updateAttendance)
    return router
}