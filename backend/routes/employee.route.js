class EmployeeRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller;
    }

    get route() {
        this.router.get('/api/employee', this.controller.getMany)
        this.router.get('/api/employee/:id', this.controller.getOneById);
        this.router.post('/api/employee', this.controller.createOne);
        this.router.put('/api/employee/:id', this.controller.updateOneById);
        this.router.delete('/api/employee/:id', this.controller.deleteOneById);
        this.router.post('/api/employee/batch_update', this.controller.updateManyByIds)
        this.router.post('/api/employee/batch_delete', this.controller.deleteManyByIds)

        return this.router
    }
}

export default EmployeeRoute