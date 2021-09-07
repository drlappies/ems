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
            const { page, limit, text } = req.query
            console.log(text)
            const dept = await this.departmentService.getAllDepartment(page, limit, text);
            return res.status(200).json({
                dept: dept.dept,
                count: dept.count,
                currentPage: dept.currentPage,
                currentPageStart: dept.currentPageStart,
                currentPageEnd: dept.currentPageEnd,
                currentLimit: dept.currentLimit
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
            const { id } = req.params;
            const { name, description } = req.body;
            if (!id || !name || !description) {
                return res.status(400).json({
                    error: 'Missing required fields.'
                })
            }
            const dept = await this.departmentService.updateDepartment(id, name, description);
            return res.status(200).json({
                success: `Successfully updated department: ${dept.name} id: ${dept.id}`,
                id: dept.id,
                name: dept.name,
                desc: dept.description
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
                success: `Successfully deleted department: ${dept.name} id: ${dept.id}`,
                dept: dept
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    batchDeleteDepartment = async (req, res) => {
        try {
            const { id } = req.query
            const dept = await this.departmentService.batchDeleteDepartment(id);
            return res.status(200).json({
                success: 'Successfully batch deleted department records.'
            })
        } catch {
            console.log(err)
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