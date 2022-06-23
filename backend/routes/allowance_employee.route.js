class AllowanceEmployeeRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/api/allowance_employee/entitle', this.middlewares.user.verify, this.middlewares.user.verifyRole, this.controller.entitle)
        this.router.post('/api/allowance_employee/disentitle', this.middlewares.user.verify, this.middlewares.user.verifyRole, this.controller.disentitle)
        this.router.get('/api/allowance_employee', this.middlewares.user.verify, this.controller.getMany)

        return this.router
    }
}

export default AllowanceEmployeeRoute