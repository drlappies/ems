class ReimbursementRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/position', this.controller.createReimbursement);
        this.router.get('/position/metric', this.controller.getReimbursementCount);
        this.router.put('/position', this.controller.updateReimbursement)
        this.router.get('/position', this.controller.getAllReimbursement);
        this.router.get('/position/:id', this.controller.getReimbursement);
        this.router.get('/position/user/:id', this.controller.getReimbursementByEmployee);
        this.router.delete('/position', this.controller.deleteReimbursement);

        return this.router
    }
}

export default ReimbursementRoute