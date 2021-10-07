class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService
    }

    getDepartment = async (req, res) => {
        try {
            const { id } = req.params;
            const dept = await this.departmentService.getDepartment(id);
            return res.status(200).json({
                id: dept.id,
                name: dept.name,
                desc: dept.description
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    getAllDepartment = async (req, res) => {
        try {
            const { offset, limit, search } = req.query
            const query = await this.departmentService.getAllDepartment(offset, limit, search);
            return res.status(200).json({
                dept: query.dept,
                rowCount: query.count
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    createDepartment = async (req, res) => {
        try {
            const { name, desc } = req.body;
            if (!name) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.createDepartment(name, desc);
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
            const { id, name, desc } = req.body;
            if (!id || !name) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.updateDepartment(id, name, desc);
            return res.status(200).json({
                success: dept.length > 1 ? "Successfully batch updated departments" : `Successfully updated department ${dept[0].id}`,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    deleteDepartment = async (req, res) => {
        try {
            const { id } = req.query;
            const dept = await this.departmentService.deleteDepartment(id);
            return res.status(200).json({
                success: dept.length > 1 ? "Successfully batch deleted departments" : `Successfully deleted department ID: ${dept.id}`,
            })
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    getDepartmentCount = async (req, res) => {
        try {
            const departmentCount = await this.departmentService.getDepartmentCount();
            return res.status(200).json({
                departmentCount: departmentCount
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }
}

module.exports = DepartmentController