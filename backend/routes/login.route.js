class LoginRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/login', this.controller.login)
        this.router.get('/verify', this.controller.verify)

        return this.router
    }
}

export default LoginRoute