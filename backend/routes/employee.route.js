const express = require('express');

module.exports.EmployeeRoute = (employeeController) => {
    const router = express.Router();
    router.get('/', employeeController.getAllEmployee)
    router.get('/metric', employeeController.getEmployeeCount)
    router.get('/:id', employeeController.getEmployee);
    router.post('/', employeeController.createEmployee);
    router.put('/:id', employeeController.updateEmployee);
    router.put('/', employeeController.batchUpdateEmployee);
    router.delete('/:id', employeeController.deleteEmployee);
    router.delete('/', employeeController.batchDeleteEmployee);
    return router
}