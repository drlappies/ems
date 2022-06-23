class OvertimeRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/api/overtime/user_check_in_status', this.middlewares.user.verify, this.controller.getCheckInStatusByUser)
        this.router.post('/api/overtime', this.middlewares.user.verify, this.controller.createOne)
        this.router.put('/api/overtime/:id', this.middlewares.user.verify, this.controller.updateOneById)
        this.router.delete('/api/overtime/:id', this.middlewares.user.verify, this.controller.deleteOneById)
        this.router.get('/api/overtime', this.middlewares.user.verify, this.controller.getMany)
        this.router.get('/api/overtime/:id', this.middlewares.user.verify, this.controller.getOneById)
        this.router.post('/api/overtime/check_in', this.middlewares.user.verify, this.controller.checkIn)
        this.router.post('/api/overtime/check_out', this.middlewares.user.verify, this.controller.checkOut)


        return this.router
    }
}

export default OvertimeRoute