class ReimbursementRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/position', this.middlewares.user.verify, this.controller.createReimbursement);
        this.router.get('/position/metric', this.middlewares.user.verify, this.controller.getReimbursementCount);
        this.router.put('/position', this.middlewares.user.verify, this.controller.updateReimbursement)
        this.router.get('/position', this.middlewares.user.verify, this.controller.getAllReimbursement);
        this.router.get('/position/:id', this.middlewares.user.verify, this.controller.getReimbursement);
        this.router.get('/position/user/:id', this.middlewares.user.verify, this.controller.getReimbursementByEmployee);
        this.router.delete('/position', this.middlewares.user.verify, this.controller.deleteReimbursement);

        return this.router
    }
}

export default ReimbursementRoute