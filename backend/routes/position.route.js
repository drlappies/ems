class PositionRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/api/position', this.middlewares.user.verify, this.controller.getMany)
        this.router.get('/api/position/:id', this.middlewares.user.verify, this.controller.getOneById)
        this.router.post('/api/position', this.middlewares.user.verify, this.controller.createOne)
        this.router.put('/api/position/:id', this.middlewares.user.verify, this.controller.updateOneById)
        this.router.delete('/api/position/:id', this.middlewares.user.verify, this.controller.deleteOneById)
        this.router.post('/api/position/batch_update', this.middlewares.user.verify, this.controller.updateManyByIds)
        this.router.post('/api/position/batch_delete', this.middlewares.user.verify, this.controller.deleteManyByIds)

        return this.router
    }
}

export default PositionRoute