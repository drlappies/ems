class PayrollRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/payroll', this.middlewares.user.verify, this.controller.createPayroll);
        this.router.put('/payroll', this.middlewares.user.verify, this.controller.updatePayroll);
        this.router.delete('/payroll', this.middlewares.user.verify, this.controller.deletePayroll);
        this.router.get('/payroll', this.middlewares.user.verify, this.controller.getAllPayroll);
        this.router.get('/payroll/:id', this.middlewares.user.verify, this.controller.getPayroll);
        this.router.get('/payroll/user/:id', this.middlewares.user.verify, this.controller.getPayrollByEmployee);

        return this.router
    }
}

export default PayrollRoute