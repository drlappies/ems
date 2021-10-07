const express = require('express');

module.exports.BonusRoute = (BonusController) => {
    const router = express.Router();
    router.post('/', BonusController.createBonus);
    router.put('/', BonusController.editBonus);
    router.delete('/', BonusController.deleteBonus)
    router.get('/', BonusController.getAllBonus);
    router.get('/:id', BonusController.getBonus)
    router.get('/user/:id', BonusController.getBonusByEmployee)
    return router
}