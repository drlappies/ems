const express = require('express');

module.exports.DeductionRoute = (DeductionController) => {
    const router = express.Router();
    router.post('/', DeductionController.createDeduction)
    router.delete('/:id', DeductionController.deleteDeduction)
    router.put('/:id', DeductionController.updateDeduction)
    router.get('/', DeductionController.getAllDeduction)
    router.get('/:id', DeductionController.getDeduction)
    return router
}