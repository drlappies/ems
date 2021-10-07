const express = require('express');

module.exports.ReimbursementRoute = (ReimbursementController) => {
    const router = express.Router();
    router.post('/', ReimbursementController.createReimbursement);
    router.get('/metric', ReimbursementController.getReimbursementCount);
    router.put('/:id', ReimbursementController.updateReimbursement)
    router.get('/', ReimbursementController.getAllReimbursement);
    router.get('/:id', ReimbursementController.getReimbursement);
    router.get('/user/:id', ReimbursementController.getReimbursementByEmployee);
    router.delete('/', ReimbursementController.deleteReimbursement);
    return router
}