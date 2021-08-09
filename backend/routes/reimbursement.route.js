const express = require('express');

module.exports.ReimbursementRoute = (ReimbursementController) => {
    const router = express.Router();
    router.post('/', ReimbursementController.createReimbursement);
    router.put('/:id', ReimbursementController.approveReimbursement)
    router.get('/', ReimbursementController.getAllReimbursement);
    router.get('/:id', ReimbursementController.getReimbursement);
    return router
}