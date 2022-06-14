class BonusRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/bonus', this.controller.createBonus);
        this.router.put('/bonus', this.controller.editBonus);
        this.router.delete('/bonus', this.controller.deleteBonus)
        this.router.get('/bonus', this.controller.getAllBonus);
        this.router.get('/bonus/:id', this.controller.getBonus)
        this.router.get('/bonus/user/:id', this.controller.getBonusByEmployee)

        return this.router
    }
}

export default BonusRoute