class BonusRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/', this.controller.createBonus);
        this.router.put('/', this.controller.editBonus);
        this.router.delete('/', this.controller.deleteBonus)
        this.router.get('/', this.controller.getAllBonus);
        this.router.get('/:id', this.controller.getBonus)
        this.router.get('/user/:id', this.controller.getBonusByEmployee)

        return this.router
    }
}

export default BonusRoute