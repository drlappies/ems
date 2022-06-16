class LeaveRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/api/leave', this.middlewares.user.verify, this.controller.getMany)
        this.router.get('/api/leave/:id', this.middlewares.user.verify, this.controller.getOneById)
        this.router.post('/api/leave', this.middlewares.user.verify, this.controller.createOne)
        this.router.put('/api/leave/:id', this.middlewares.user.verify, this.controller.updateOneById)
        this.router.delete('/api/leave/:id', this.middlewares.user.verify, this.controller.deleteOneById)
        this.router.post('/api/leave/batch_update', this.middlewares.user.verify, this.controller.updateManyByIds)
        this.router.post('/api/leave/batch_delete', this.middlewares.user.verify, this.controller.deleteManyByIds)

        return this.router
    }
}

export default LeaveRoute