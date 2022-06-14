class DeductionRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/deduction', this.controller.createDeduction)
        this.router.delete('/deduction', this.controller.deleteDeduction)
        this.router.put('/deduction', this.controller.updateDeduction)
        this.router.get('/deduction', this.controller.getAllDeduction)
        this.router.get('/deduction/:id', this.controller.getDeduction)
        this.router.get('/deduction/user/:id', this.controller.getDeductionByEmployee)

        return this.router
    }
}

export default DeductionRoute