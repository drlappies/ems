class EmployeeRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router();
        this.controller = controller;
    }

    get route() {
        this.router.get('/', this.controller.getAllEmployee)
        this.router.get('/metric', this.controller.getEmployeeCount)
        this.router.get('/:id', this.controller.getEmployee);
        this.router.post('/', this.controller.createEmployee);
        this.router.put('/', this.controller.updateEmployee);
        this.router.delete('/', this.controller.deleteEmployee);

        return this.router
    }
}

export default EmployeeRoute