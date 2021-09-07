const express = require('express')

module.exports.PositionRoute = (positionController) => {
    const router = express.Router()
    router.get('/', positionController.getAllPosition)
    router.get('/metric', positionController.getPositionCount)
    router.get('/:id', positionController.getPosition)
    router.post('/', positionController.createPosition)
    router.put('/:id', positionController.updatePosition)
    router.delete('/', positionController.batchDeletePosition)
    router.delete('/:id', positionController.deletePosition)
    return router
}