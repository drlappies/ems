const express = require('express');

module.exports.DepartmentRoute = (departmentController) => {
    const router = express.Router();
    router.get('/', departmentController.getAllDepartment);
    router.get('/:id', departmentController.getDepartment);
    router.post('/', departmentController.createDepartment);
    router.put('/:id', departmentController.updateDepartment);
    router.delete('/:id', departmentController.deleteDepartment);
    return router
}