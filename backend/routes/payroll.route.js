const express = require('express');

module.exports.PayrollRoute = (PayrollController) => {
    const router = express.Router()
    router.post('/', PayrollController.createPayroll);
    router.put('/', PayrollController.updatePayroll);
    router.delete('/', PayrollController.deletePayroll);
    router.get('/', PayrollController.getAllPayroll);
    router.get('/:id', PayrollController.getPayroll);
    return router
}