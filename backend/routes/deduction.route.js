class DeductionRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/api/deduction', this.middlewares.user.verify, this.controller.createOne)
        this.router.delete('/api/deduction/:id', this.middlewares.user.verify, this.controller.deleteOneById)
        this.router.put('/api/deduction/:id', this.middlewares.user.verify, this.controller.updateOneById)
        this.router.get('/api/deduction', this.middlewares.user.verify, this.controller.getMany)
        this.router.get('/api/deduction/:id', this.middlewares.user.verify, this.controller.getOneById)
        this.router.post('/api/deduction/batch_update', this.middlewares.user.verify, this.controller.updateManyByIds)
        this.router.post('/api/deduction/batch_delete', this.middlewares.user.verify, this.controller.deleteManyByIds)

        return this.router
    }
}

export default DeductionRoute