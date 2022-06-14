class PayrollRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/payroll', this.controller.createPayroll);
        this.router.put('/payroll', this.controller.updatePayroll);
        this.router.delete('/payroll', this.controller.deletePayroll);
        this.router.get('/payroll', this.controller.getAllPayroll);
        this.router.get('/payroll/:id', this.controller.getPayroll);
        this.router.get('/payroll/user/:id', this.controller.getPayrollByEmployee);

        return this.router
    }
}

export default PayrollRoute