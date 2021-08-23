class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService
    }

    getDepartment = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.getDepartment(id);
            return res.status(200).json(dept)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    getAllDepartment = async (req, res) => {
        try {
            const dept = await this.departmentService.getAllDepartment();
            return res.status(200).json({
                dept: dept
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    createDepartment = async (req, res) => {
        try {
            const { name, description } = req.body;
            if (!name && !description) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.createDepartment(name, description);
            return res.status(200).json({
                success: `Successfully created department: ${dept.name} id: ${dept.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    updateDepartment = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            if (!id && !name && !description) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.updateDepartment(id, name, description);
            return res.status(200).json({
                success: `Successfully updated department: ${dept.name} id: ${dept.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    deleteDepartment = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.deleteDepartment(id);
            return res.status(200).json({
                success: `Successfully deleted department: ${dept.name} id: ${dept.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }
}

module.exports = DepartmentController