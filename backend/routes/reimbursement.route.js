class ReimbursementRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/api/reimbursement', this.middlewares.user.verify, this.controller.createOne)
        this.router.put('/api/reimbursement/:id', this.middlewares.user.verify, this.controller.updateOneById)
        this.router.post('/api/reimbursement/batch_update', this.middlewares.user.verify, this.controller.updateManyByIds)
        this.router.get('/api/reimbursement', this.middlewares.user.verify, this.controller.getMany)
        this.router.get('/api/reimbursement/:id', this.middlewares.user.verify, this.controller.getOneById)
        this.router.post('/api/reimbursement/batch_delete', this.middlewares.user.verify, this.controller.deleteManyByIds)

        return this.router
    }
}

export default ReimbursementRoute