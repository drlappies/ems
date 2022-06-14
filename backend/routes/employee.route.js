class EmployeeRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller;
    }

    get route() {
        this.router.get('/employee', this.controller.getAllEmployee)
        this.router.get('/employee/metric', this.controller.getEmployeeCount)
        this.router.get('/employee/:id', this.controller.getEmployee);
        this.router.post('/employee', this.controller.createEmployee);
        this.router.put('/employee', this.controller.updateEmployee);
        this.router.delete('/employee', this.controller.deleteEmployee);

        return this.router
    }
}

export default EmployeeRoute