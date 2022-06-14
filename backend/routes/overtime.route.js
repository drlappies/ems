class OvertimeRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/overtime', this.controller.getAllOvertime);
        this.router.get('/overtime/user/:employeeId/status', this.controller.getEmployeeOvertimeStatus);
        this.router.get('/overtime/user/:employeeId/history', this.controller.getAllOvertimeByEmployee)
        this.router.get('/overtime/:id', this.controller.getOvertime)
        this.router.post('/overtime', this.controller.createOvertime);
        this.router.post('/overtime/timein', this.controller.createOvertimeTimein);
        this.router.post('/overtime/timeout', this.controller.createOvertimeTimeout);
        this.router.put('/overtime', this.controller.batchUpdateOvertime)
        this.router.put('/overtime/:id', this.controller.updateOvertime);
        this.router.delete('/overtime', this.controller.batchDeleteOvertime);
        this.router.delete('/overtime/:id', this.controller.deleteOvertime);

        return this.router
    }
}

export default OvertimeRoute