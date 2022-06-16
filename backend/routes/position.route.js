class PositionRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.get('/position/', this.middlewares.user.verify, this.controller.getAllPosition)
        this.router.get('/position/metric', this.middlewares.user.verify, this.controller.getPositionCount)
        this.router.get('/position/:id', this.middlewares.user.verify, this.controller.getPosition)
        this.router.post('/position', this.middlewares.user.verify, this.controller.createPosition)
        this.router.put('/position', this.middlewares.user.verify, this.controller.updatePosition)
        this.router.delete('/position', this.middlewares.user.verify, this.controller.deletePosition)

        return this.router
    }
}

export default PositionRoute