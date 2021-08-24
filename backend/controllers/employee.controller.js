const { hashPassword, checkPassword } = require('../utils/hashPassword');

class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService
    }

    getEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await this.employeeService.getEmployee(id);
            return res.status(200).json({
                employee: employee
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    getAllEmployee = async (req, res) => {
        try {
            const { employeeFirstname, employeeLastname, joinStart, joinEnd, status, page } = req.query
            const employee = await this.employeeService.getAllEmployee(employeeFirstname, employeeLastname, joinStart, joinEnd, status, page);
            return res.status(200).json({
                employee: employee.employee,
                count: employee.count,
                currentPage: employee.currentPage,
                currentPageStart: employee.currentPageStart,
                currentPageEnd: employee.currentPageEnd
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err })
        }
    }

    createEmployee = async (req, res) => {
        try {
            const { username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_pay_entitled, ot_hourly_salary } = req.body;
            // if (!username || !password || !role || !firstname || !lastname || !address || !phone_number || !emergency_contact_person || !emergency_contact_number || !onboard_date) {
            //     return res.status(400).json({ error: 'Missing required fields' });
            // }
            const isUsernameTaken = await this.employeeService.checkDuplicate(username)
            if (isUsernameTaken.length >= 1) {
                return res.status(409).json({ error: 'Username has been taken' })
            }
            const hashedPassword = await hashPassword(password)
            const employee = await this.employeeService.createEmployee(username, hashedPassword, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled)
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
            const { username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status, ot_entitled, ot_hourly_salary, salary, starting, ending } = req.body;
            // const hashedPassword = await hashPassword(password)
            const employee = await this.employeeService.updateEmployee(id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, department, position, status, ot_entitled, ot_hourly_salary, salary, starting, ending, role)
            return res.status(200).json({
                success: `Successfully updated employee: ${employee.lastname} ${employee.firstname} id: ${employee.id}`,
                employee: employee
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
                success: `Successfully deleted employee: ${employee.lastname} ${employee.firstname} id: ${employee.id}`,
                employee: employee
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }
}

module.exports = EmployeeController