class DepartmentRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/api/department', this.middlewares.user.verify, this.controller.getMany);
        this.router.get('/api/department/:id', this.middlewares.user.verify, this.controller.getOneById);
        this.router.post('/api/department', this.middlewares.user.verify, this.controller.createOne);
        this.router.put('/api/department/:id', this.middlewares.user.verify, this.controller.updateOneById);
        this.router.post('/api/department/batch_update', this.middlewares.user.verify, this.controller.updateManyByIds)
        this.router.post('/api/department/batch_delete', this.middlewares.user.verify, this.controller.deleteManyByIds)

        return this.router
    }
}

export default DepartmentRoute