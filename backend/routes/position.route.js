class PositionRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/', this.controller.getAllPosition)
        this.router.get('/metric', this.controller.getPositionCount)
        this.router.get('/:id', this.controller.getPosition)
        this.router.post('/', this.controller.createPosition)
        this.router.put('/', this.controller.updatePosition)
        this.router.delete('/', this.controller.deletePosition)

        return this.router
    }
}

export default PositionRoute