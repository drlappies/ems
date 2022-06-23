class UserRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/api/user', this.middlewares.user.verify, this.controller.getUser)
        this.router.get('/api/user/attendance', this.middlewares.user.verify, this.controller.getAttendanceByUser)
        this.router.get('/api/user/leave', this.middlewares.user.verify, this.controller.getLeaveByUser)
        this.router.get('/api/user/overtime', this.middlewares.user.verify, this.controller.getOvertimeByUser)
        this.router.get('/api/user/payroll', this.middlewares.user.verify, this.controller.getPayrollByUser)
        this.router.get('/api/user/reimbursement', this.middlewares.user.verify, this.controller.getReimbursementByUser)
        this.router.get('/api/user/allowance', this.middlewares.user.verify, this.controller.getAllowanceByUser)
        this.router.get('/api/user/bonus', this.middlewares.user.verify, this.controller.getBonusByUser)
        this.router.get('/api/user/deduction', this.middlewares.user.verify, this.controller.getDeductionByUser)

        return this.router
    }
}

export default UserRoute