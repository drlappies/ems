class LeaveRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/', this.controller.getAllLeave)
        this.router.get('/:id', this.controller.getLeave)
        this.router.post('/', this.controller.createLeave)
        this.router.put('/', this.controller.updateLeave)
        this.router.delete('/', this.controller.deleteLeave)
        this.router.get('/user/:employeeId/history', this.controller.getAllLeaveByEmployee)

        return this.router
    }
}

export default LeaveRoute