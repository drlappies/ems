class OvertimeRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/overtime', this.middlewares.user.verify, this.controller.getAllOvertime);
        this.router.get('/overtime/user/:employeeId/status', this.middlewares.user.verify, this.controller.getEmployeeOvertimeStatus);
        this.router.get('/overtime/user/:employeeId/history', this.controller.getAllOvertimeByEmployee)
        this.router.get('/overtime/:id', this.middlewares.user.verify, this.controller.getOvertime)
        this.router.post('/overtime', this.middlewares.user.verify, this.controller.createOvertime);
        this.router.post('/overtime/timein', this.middlewares.user.verify, this.controller.createOvertimeTimein);
        this.router.post('/overtime/timeout', this.middlewares.user.verify, this.controller.createOvertimeTimeout);
        this.router.put('/overtime', this.middlewares.user.verify, this.controller.batchUpdateOvertime)
        this.router.put('/overtime/:id', this.middlewares.user.verify, this.controller.updateOvertime);
        this.router.delete('/overtime', this.middlewares.user.verify, this.controller.batchDeleteOvertime);
        this.router.delete('/overtime/:id', this.middlewares.user.verify, this.controller.deleteOvertime);

        return this.router
    }
}

export default OvertimeRoute