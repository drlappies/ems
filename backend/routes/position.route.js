const express = require('express')

module.exports.PositionRoute = (positionController) => {
    const router = express.Router()
    router.get('/', positionController.getAllPosition)
    router.get('/metric', positionController.getPositionCount)
    router.get('/:id', positionController.getPosition)
    router.post('/', positionController.createPosition)
    router.put('/', positionController.updatePosition)
    router.delete('/', positionController.deletePosition)
    return router
}