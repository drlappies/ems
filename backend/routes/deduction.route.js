class DeductionRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/', this.controller.createDeduction)
        this.router.delete('/', this.controller.deleteDeduction)
        this.router.put('/', this.controller.updateDeduction)
        this.router.get('/', this.controller.getAllDeduction)
        this.router.get('/:id', this.controller.getDeduction)
        this.router.get('/user/:id', this.controller.getDeductionByEmployee)

        return this.router
    }
}

export default DeductionRoute