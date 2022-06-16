class LeaveRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/api/leave', this.controller.getMany)
        this.router.get('/api/leave/:id', this.controller.getOneById)
        this.router.post('/api/leave', this.controller.createOne)
        this.router.put('/api/leave/:id', this.controller.updateOneById)
        this.router.delete('/api/leave/:id', this.controller.deleteOneById)
        this.router.post('/api/leave/batch_update', this.controller.updateManyByIds)
        this.router.post('/api/leave/batch_delete', this.controller.deleteManyByIds)

        return this.router
    }
}

export default LeaveRoute