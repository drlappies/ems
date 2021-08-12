const express = require('express')

module.exports.PayrollRoute = (PayrollController) => {
    const router = express.Router()
    router.post('/', PayrollController.createPayroll);
    router.delete('/:id', PayrollController.deletePayroll);
    router.get('/', PayrollController.getPayroll);
    router.get('/:id', PayrollController.getPayroll);
    return router
}