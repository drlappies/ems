const express = require('express');

module.exports.AllowanceRoute = (AllowanceController) => {
    const router = express.Router();
    router.post('/', AllowanceController.createAllowance);
    router.delete('/entitlement/:allowanceId/employee/:employeeId', AllowanceController.removeEmployeeFromAllowance);
    router.delete('/', AllowanceController.deleteAllowance);
    router.put('/', AllowanceController.editAllowance);
    router.get('/', AllowanceController.getAllAllowance);
    router.get('/entitlement/:employee_id', AllowanceController.getAllAllowanceByEmployee)
    router.get('/:id', AllowanceController.getAllowance);
    router.post('/entitlement/:id', AllowanceController.addEmployeeToAllowance);
    return router
}