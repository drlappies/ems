const express = require('express');

module.exports.OvertimeRoute = (OvertimeController) => {
    const router = express.Router();
    router.get('/', OvertimeController.getAllOvertime);
    router.get('/status/:employeeId', OvertimeController.getEmployeeOvertimeStatus);
    router.get('/:id', OvertimeController.getOvertime)
    router.post('/', OvertimeController.createOvertime);
    router.post('/timein', OvertimeController.createOvertimeTimein);
    router.post('/timeout', OvertimeController.createOvertimeTimeout);
    router.put('/', OvertimeController.batchUpdateOvertime)
    router.put('/:id', OvertimeController.updateOvertime);
    router.delete('/', OvertimeController.batchDeleteOvertime);
    router.delete('/:id', OvertimeController.deleteOvertime);
    return router
}