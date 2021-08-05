const express = require('express');

module.exports.EmployeeRoute = (employeeService) => {
    const router = express.Router();
    router.get('/', employeeService.getAllEmployee)
    router.get('/:id', employeeService.getEmployee);
    router.post('/', employeeService.createEmployee);
    router.put('/:id', employeeService.updateEmployee);
    router.delete('/:id', employeeService.deleteEmployee);
    return router
}