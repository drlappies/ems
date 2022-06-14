class AllowanceEmployeeRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/api/allowance_employee/entitle', this.controller.entitle)
        this.router.post('/api/allowance_employee/disentitle', this.controller.disentitle)
        this.router.get('/api/allowance_employee', this.controller.getMany)

        return this.router
    }
}

export default AllowanceEmployeeRoute