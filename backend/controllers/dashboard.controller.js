class dashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService
    }

    getMetric = async (req, res) => {
        try {
            const metric = await this.dashboardService.getMetric();
            return res.status(200).json({
                metric: metric
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = dashboardController