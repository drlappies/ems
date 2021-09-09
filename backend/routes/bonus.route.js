const express = require('express');

module.exports.BonusRoute = (BonusController) => {
    const router = express.Router();
    router.post('/', BonusController.createBonus);
    router.put('/:id', BonusController.editBonus);
    router.delete('/:id', BonusController.deleteBonus)
    router.get('/', BonusController.getAllBonus);
    router.get('/:id', BonusController.getBonus)
    router.put('/', BonusController.batchUpdateBonus)
    router.delete('/', BonusController.batchDeleteBonus)
    return router
}