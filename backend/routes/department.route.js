const express = require('express');

module.exports.DepartmentRoute = (departmentController) => {
    const router = express.Router();
    router.get('/', departmentController.getAllDepartment);
    router.get('/metric', departmentController.getDepartmentCount);
    router.get('/:id', departmentController.getDepartment);
    router.post('/', departmentController.createDepartment);
    router.put('/', departmentController.updateDepartment);
    router.delete('/', departmentController.deleteDepartment);
    return router
}