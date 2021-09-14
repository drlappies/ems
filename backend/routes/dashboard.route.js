const express = require('express')

module.exports.DashboardRoute = (dashboardController) => {
    const router = express.Router();
    router.get('/', dashboardController.getMetric);
    return router
}