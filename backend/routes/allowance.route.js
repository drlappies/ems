class AllowanceRoute {
    constructor(router, path, controller) {
        this.path = path
        this.router = router()
        this.controller = controller
    }

    get route() {
        this.router.post('/', this.controller.createAllowance);
        this.router.delete('/entitlement/:allowanceId/employee/:employeeId', this.controller.removeEmployeeFromAllowance);
        this.router.delete('/', this.controller.deleteAllowance);
        this.router.put('/', this.controller.editAllowance);
        this.router.get('/', this.controller.getAllAllowance);
        this.router.get('/entitlement/:employee_id', this.controller.getAllAllowanceByEmployee)
        this.router.get('/:id', this.controller.getAllowance);
        this.router.post('/entitlement/:id', this.controller.addEmployeeToAllowance);

        return this.router
    }
}

export default AllowanceRoute