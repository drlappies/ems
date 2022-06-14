class AttendanceRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/api/attendance/', this.controller.createAttendance)
        this.router.post('/api/attendance/checkin', this.controller.createTimeIn);
        this.router.post('/api/attendance/checkout', this.controller.createTimeOut);
        this.router.get('/api/attendance', this.controller.getAllAttendance)
        this.router.get('/api/attendance/user/:employeeId/status', this.controller.getTodayAttendanceByEmployee)
        this.router.get('/api/attendance/user/:employeeId/history', this.controller.getAllAttendanceByEmployee)
        this.router.get('/api/attendance/:id', this.controller.getAttendance)
        this.router.delete('/api/attendance/', this.controller.batchDeleteAttendance)
        this.router.delete('/api/attendance/:id', this.controller.deleteAttendance)
        this.router.put('/api/attendance', this.controller.batchUpdateAttendance)
        this.router.put('/api/attendance/:id', this.controller.updateAttendance)

        return this.router
    }
}

export default AttendanceRoute