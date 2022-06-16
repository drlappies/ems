class BonusRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/api/bonus', this.controller.createOne);
        this.router.put('/api/bonus/:id', this.controller.updateOneById);
        this.router.delete('/api/bonus/:id', this.controller.deleteOneById)
        this.router.get('/api/bonus', this.controller.getMany);
        this.router.get('/api/bonus/:id', this.controller.getOneById)

        return this.router
    }
}

export default BonusRoute