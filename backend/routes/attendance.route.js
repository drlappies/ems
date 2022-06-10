class AttendanceRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/', this.controller.createAttendance)
        this.router.post('/checkin', this.controller.createTimeIn);
        this.router.post('/checkout', this.controller.createTimeOut);
        this.router.get('/', this.controller.getAllAttendance)
        this.router.get('/user/:employeeId/status', this.controller.getTodayAttendanceByEmployee)
        this.router.get('/user/:employeeId/history', this.controller.getAllAttendanceByEmployee)
        this.router.get('/:id', this.controller.getAttendance)
        this.router.delete('/', this.controller.batchDeleteAttendance)
        this.router.delete('/:id', this.controller.deleteAttendance)
        this.router.put('/', this.controller.batchUpdateAttendance)
        this.router.put('/:id', this.controller.updateAttendance)

        return this.router
    }
}

export default AttendanceRoute