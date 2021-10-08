const express = require('express');

module.exports.AttendanceRoute = (AttendanceController) => {
    const router = express.Router();
    router.post('/', AttendanceController.createAttendance)
    router.post('/checkin', AttendanceController.createTimeIn);
    router.post('/checkout', AttendanceController.createTimeOut);
    router.get('/', AttendanceController.getAllAttendance)
    router.get('/user/:employeeId/status', AttendanceController.getTodayAttendanceByEmployee)
    router.get('/user/:employeeId/history', AttendanceController.getAllAttendanceByEmployee)
    router.get('/:id', AttendanceController.getAttendance)
    router.delete('/', AttendanceController.batchDeleteAttendance)
    router.delete('/:id', AttendanceController.deleteAttendance)
    router.put('/', AttendanceController.batchUpdateAttendance)
    router.put('/:id', AttendanceController.updateAttendance)
    return router
}