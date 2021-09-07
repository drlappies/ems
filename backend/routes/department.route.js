const express = require('express');

module.exports.DepartmentRoute = (departmentController) => {
    const router = express.Router();
    router.get('/', departmentController.getAllDepartment);
    router.get('/metric', departmentController.getDepartmentCount);
    router.get('/:id', departmentController.getDepartment);
    router.post('/', departmentController.createDepartment);
    router.put('/:id', departmentController.updateDepartment);
    router.delete('/:id', departmentController.deleteDepartment);
    router.delete('/', departmentController.batchDeleteDepartment);
    return router
}