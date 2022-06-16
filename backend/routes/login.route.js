class LoginRoute {
    constructor({ router, controller, middlewares }) {
        this.router = router()
        this.controller = controller
        this.middlewares = middlewares
    }

    get route() {
        this.router.post('/api/login', this.middlewares.user.verify, this.controller.login)

        return this.router
    }
}

export default LoginRoute