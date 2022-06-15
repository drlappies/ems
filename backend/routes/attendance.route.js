class AttendanceRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/api/attendance/:id', this.controller.getOneById)
        this.router.get('/api/attendance', this.controller.getMany)
        this.router.delete('/api/attendance/:id', this.controller.deleteOneById)
        this.router.put('/api/attendance/:id', this.controller.updateOneById)
        this.router.post('/api/attendance', this.controller.createOne)
        this.router.post('/api/attendance/check_in', this.controller.checkIn)
        this.router.post('/api/attendance/check_out', this.controller.checkOut)
        this.router.post('/api/attendance/batch_delete', this.controller.deleteManyByIds)
        this.router.post('/api/attendance/batch_update', this.controller.updateManyByIds)

        return this.router
    }
}

export default AttendanceRoute