class PayrollRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/', this.controller.createPayroll);
        this.router.put('/', this.controller.updatePayroll);
        this.router.delete('/', this.controller.deletePayroll);
        this.router.get('/', this.controller.getAllPayroll);
        this.router.get('/:id', this.controller.getPayroll);
        this.router.get('/user/:id', this.controller.getPayrollByEmployee);

        return this.router
    }
}

export default PayrollRoute