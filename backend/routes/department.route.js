class DepartmentRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.get('/', this.controller.getAllDepartment);
        this.router.get('/metric', this.controller.getDepartmentCount);
        this.router.get('/:id', this.controller.getDepartment);
        this.router.post('/', this.controller.createDepartment);
        this.router.put('/', this.controller.updateDepartment);
        this.router.delete('/', this.controller.deleteDepartment);

        return this.router
    }
}

export default DepartmentRoute