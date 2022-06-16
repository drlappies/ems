class DepartmentRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/api/department', this.controller.getMany);
        this.router.get('/api/department/:id', this.controller.getOneById);
        this.router.post('/api/department', this.controller.createOne);
        this.router.put('/api/department/:id', this.controller.updateOneById);
        this.router.post('/api/department/batch_update', this.controller.updateManyByIds)
        this.router.post('/api/department/batch_delete', this.controller.deleteManyByIds)

        return this.router
    }
}

export default DepartmentRoute