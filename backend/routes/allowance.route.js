const express = require('express');

module.exports.AllowanceRoute = (AllowanceController) => {
    const router = express.Router();
    router.post('/', AllowanceController.createAllowance);
    router.delete('/:id', AllowanceController.deleteAllowance);
    router.put('/:id', AllowanceController.editAllowance);
    router.get('/', AllowanceController.getAllAllowance);
    router.get('/:id', AllowanceController.getAllowance);
    router.post('/add-employee', AllowanceController.addEmployeeToAllowance);
    router.post('/remove-employee', AllowanceController.removeEmployeeFromAllowance);
    return router
}