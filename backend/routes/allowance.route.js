const express = require('express');

module.exports.AllowanceRoute = (AllowanceController) => {
    const router = express.Router();
    router.post('/', AllowanceController.createAllowance);
    router.delete('/entitlement/:allowanceId/employee/:employeeId', AllowanceController.removeEmployeeFromAllowance);
    router.delete('/:id', AllowanceController.deleteAllowance);
    router.put('/:id', AllowanceController.editAllowance);
    router.get('/', AllowanceController.getAllAllowance);
    router.get('/entitlement/:employee_id', AllowanceController.getAllAllowanceByEmployee)
    router.get('/:id', AllowanceController.getAllowance);
    router.post('/entitlement/:id', AllowanceController.addEmployeeToAllowance);
    router.put('/', AllowanceController.batchUpdateAllowance)
    router.delete('/', AllowanceController.batchDeleteAllowance)
    return router
}