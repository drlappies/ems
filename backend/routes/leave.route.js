class LeaveRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/leave', this.controller.getAllLeave)
        this.router.get('/leave/:id', this.controller.getLeave)
        this.router.post('/leave', this.controller.createLeave)
        this.router.put('/leave', this.controller.updateLeave)
        this.router.delete('/leave', this.controller.deleteLeave)
        this.router.get('/leave/user/:employeeId/history', this.controller.getAllLeaveByEmployee)

        return this.router
    }
}

export default LeaveRoute