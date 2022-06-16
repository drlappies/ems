class BonusRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/api/bonus', this.middlewares.user.verify, this.controller.createOne);
        this.router.put('/api/bonus/:id', this.middlewares.user.verify, this.controller.updateOneById);
        this.router.delete('/api/bonus/:id', this.middlewares.user.verify, this.controller.deleteOneById)
        this.router.get('/api/bonus', this.middlewares.user.verify, this.controller.getMany);
        this.router.get('/api/bonus/:id', this.middlewares.user.verify, this.controller.getOneById)

        return this.router
    }
}

export default BonusRoute