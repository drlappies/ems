class LoginRoute {
    constructor(router, path, controller) {
        this.path = path
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