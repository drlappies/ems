const express = require('express');

module.exports.EmployeeRoute = (employeeController) => {
    const router = express.Router();
    router.get('/', employeeController.getAllEmployee)
    router.get('/metric', employeeController.getEmployeeCount)
    router.get('/:id', employeeController.getEmployee);
    router.post('/', employeeController.createEmployee);
    router.put('/', employeeController.updateEmployee);
    router.delete('/', employeeController.deleteEmployee);
    return router
}