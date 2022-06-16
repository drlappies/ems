class AllowanceRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/api/allowance', this.middlewares.user.verify, this.controller.getMany);
        this.router.get('/api/allowance/:id', this.middlewares.user.verify, this.controller.getOneById);
        this.router.delete('/api/allowance/:id', this.middlewares.user.verify, this.controller.deleteOneById);
        this.router.put('/api/allowance/:id', this.middlewares.user.verify, this.controller.updateOneById);
        this.router.post('/api/allowance', this.middlewares.user.verify, this.controller.createOne);
        this.router.post('/api/allowance/batch_update', this.middlewares.user.verify, this.controller.updateManyByIds)
        this.router.post('/api/allowance/batch_delete', this.middlewares.user.verify, this.controller.deleteManyByIds)



        // router.delete('/entitlement/:allowanceId/employee/:employeeId', controller.allowance.removeEmployeeFromAllowance);
        // router.get('/entitlement/:employee_id', controller.allowance.getAllAllowanceByEmployee)
        // router.post('/entitlement/:id', controller.allowance.addEmployeeToAllowance);

        return this.router
    }
}

export default AllowanceRoute