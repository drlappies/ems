class DeductionRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/api/deduction', this.controller.createOne)
        this.router.delete('/api/deduction/:id', this.controller.deleteOneById)
        this.router.put('/api/deduction/:id', this.controller.updateOneById)
        this.router.get('/api/deduction', this.controller.getMany)
        this.router.get('/api/deduction/:id', this.controller.getOneById)
        this.router.post('/api/deduction/batch_update', this.controller.updateManyByIds)
        this.router.post('/api/deduction/batch_delete', this.controller.deleteManyByIds)

        return this.router
    }
}

export default DeductionRoute