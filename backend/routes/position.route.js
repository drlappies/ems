class PositionRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/position/', this.controller.getAllPosition)
        this.router.get('/position/metric', this.controller.getPositionCount)
        this.router.get('/position/:id', this.controller.getPosition)
        this.router.post('/position', this.controller.createPosition)
        this.router.put('/position', this.controller.updatePosition)
        this.router.delete('/position', this.controller.deletePosition)

        return this.router
    }
}

export default PositionRoute