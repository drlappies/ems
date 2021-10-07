const express = require('express');

module.exports.DeductionRoute = (DeductionController) => {
    const router = express.Router();
    router.post('/', DeductionController.createDeduction)
    router.delete('/', DeductionController.deleteDeduction)
    router.put('/', DeductionController.updateDeduction)
    router.get('/', DeductionController.getAllDeduction)
    router.get('/:id', DeductionController.getDeduction)
    router.get('/user/:id', DeductionController.getDeductionByEmployee)
    return router
}