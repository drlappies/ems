const { hashPassword, checkPassword } = require('../utils/hashPassword');

class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService
    }

    getEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await this.employeeService.getEmployee(id);
            return res.status(200).json(employee)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    getAllEmployee = async (req, res) => {
        try {
            const employee = await this.employeeService.getAllEmployee();
            return res.status(200).json(employee);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err })
        }
    }

    createEmployee = async (req, res) => {
        try {
            const { username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date } = req.body;
            if (!username || !password || !role || !firstname || !lastname || !address || !phone_number || !emergency_contact_person || !emergency_contact_number || !onboard_date) {
                return res.status(401).json({ error: 'Missing required fields' });
            }
            const isUsernameTaken = await this.employeeService.checkDuplicate(username)
            if (isUsernameTaken.length >= 1) {
                return res.status(409).json({ error: 'Username has been taken' })
            }
            const hashedPassword = await hashPassword(password)
            const employee = await this.employeeService.createEmployee(username, hashedPassword, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date)
            return res.status(200).json({
                success: `Successfully created employee: ${employee.lastname} ${employee.firstname}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    updateEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status } = req.body;
            const hashedPassword = await hashPassword(password)
            const employee = await this.employeeService.updateEmployee(id, username, hashedPassword, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status)
            return res.status(200).json({
                success: `Successfully created employee: ${employee.lastname} ${employee.firstname} id: ${employee.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    deleteEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await this.employeeService.deleteEmployee(id);
            return res.status(200).json({
                success: `Successfully deleted employee: ${employee.lastname} ${employee.firstname} id: ${employee.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }
}

module.exports = EmployeeController