class OvertimeRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/', this.controller.getAllOvertime);
        this.router.get('/user/:employeeId/status', this.controller.getEmployeeOvertimeStatus);
        this.router.get('/user/:employeeId/history', this.controller.getAllOvertimeByEmployee)
        this.router.get('/:id', this.controller.getOvertime)
        this.router.post('/', this.controller.createOvertime);
        this.router.post('/timein', this.controller.createOvertimeTimein);
        this.router.post('/timeout', this.controller.createOvertimeTimeout);
        this.router.put('/', this.controller.batchUpdateOvertime)
        this.router.put('/:id', this.controller.updateOvertime);
        this.router.delete('/', this.controller.batchDeleteOvertime);
        this.router.delete('/:id', this.controller.deleteOvertime);

        return this.router
    }
}

export default OvertimeRoute