const express = require('express')

module.exports.PositionRoute = (positionController) => {
    const router = express.Router()
    router.get('/', positionController.getAllPosition)
    router.get('/:id', positionController.getPosition)
    router.post('/', positionController.createPosition)
    router.put('/:id', positionController.updatePosition)
    router.delete('/:id', positionController.deletePosition)
    return router
}