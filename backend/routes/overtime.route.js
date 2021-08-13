const express = require('express');

module.exports.OvertimeRoute = (OvertimeController) => {
    const router = express.Router();
    router.get('/', OvertimeController.getAllOvertime);
    router.get('/:id', OvertimeController.getOvertime);
    router.post('/', OvertimeController.createOvertime);
    router.post('/timein', OvertimeController.createOvertimeTimein);
    router.post('/timeout', OvertimeController.createOvertimeTimeout);
    router.post('/re-timein', OvertimeController.recreateOvertimeTimein);
    router.post('/re-timeout', OvertimeController.recreateOvertimeTimeout);
    router.put('/:id', OvertimeController.updateOvertime);
    router.delete('/:id', OvertimeController.deleteOvertime);
    return router
}