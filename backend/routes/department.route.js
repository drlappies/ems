class DepartmentRoute {
    constructor(router, controller) {
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/department', this.controller.getAllDepartment);
        this.router.get('/department/metric', this.controller.getDepartmentCount);
        this.router.get('/department/:id', this.controller.getDepartment);
        this.router.post('/department', this.controller.createDepartment);
        this.router.put('/department', this.controller.updateDepartment);
        this.router.delete('/department', this.controller.deleteDepartment);

        return this.router
    }
}

export default DepartmentRoute