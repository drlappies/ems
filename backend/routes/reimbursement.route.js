class ReimbursementRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/', this.controller.createReimbursement);
        this.router.get('/metric', this.controller.getReimbursementCount);
        this.router.put('/', this.controller.updateReimbursement)
        this.router.get('/', this.controller.getAllReimbursement);
        this.router.get('/:id', this.controller.getReimbursement);
        this.router.get('/user/:id', this.controller.getReimbursementByEmployee);
        this.router.delete('/', this.controller.deleteReimbursement);

        return this.router
    }
}

export default ReimbursementRoute