const express = require('express');

module.exports.PayrollRoute = (PayrollController) => {
    const router = express.Router()
    router.post('/', PayrollController.createPayroll);
    router.put('/', PayrollController.batchUpdatePayroll);
    router.delete('/', PayrollController.batchDeletePayroll);
    router.put('/:id', PayrollController.updatePayroll);
    router.delete('/:id', PayrollController.deletePayroll);
    router.get('/', PayrollController.getAllPayroll);
    router.get('/:id', PayrollController.getPayroll);
    router.get('/user/:id', PayrollController.getPayrollByEmployee);
    return router
}