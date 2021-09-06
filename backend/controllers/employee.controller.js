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
            const { page, limit, text, position, department, joinFrom, joinTo, status } = req.query
            const employee = await this.employeeService.getAllEmployee(page, limit, text, position, department, joinFrom, joinTo, status);
            return res.status(200).json({
                employee: employee.employee,
                count: employee.count,
                currentPage: employee.currentPage,
                currentPageStart: employee.currentPageStart,
                currentPageEnd: employee.currentPageEnd,
                currentLimit: employee.currentLimit,
                positions: employee.positions,
                departments: employee.departments
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
                success: `Successfully created employee: ${employee.firstname} ${employee.lastname}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    updateEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { post_id, dept_id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, status, username, password, role, start_hour, end_hour, salary_monthly, ot_pay_entitled, ot_hourly_salary, annual_leave_count } = req.body;
            const employee = await this.employeeService.updateEmployee(id, post_id, dept_id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, status, username, password, role, start_hour, end_hour, salary_monthly, ot_pay_entitled, ot_hourly_salary, annual_leave_count)
            return res.status(200).json({
                success: 'Successfully updated employee record',
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
                success: 'Successfully deleted employee record.',
                employee: employee
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    getEmployeeCount = async (req, res) => {
        try {
            const employeeCount = await this.employeeService.getEmployeeCount()
            return res.status(200).json({
                employeeCount: employeeCount
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    batchUpdateEmployee = async (req, res) => {
        try {
            const { id, start_hour, end_hour, status, role, ot_pay_entitled, ot_hourly_salary, salary_monthly } = req.body;
            if (!id) {
                return res.status(400).json({
                    error: 'Please provide ID of employee records to be updated!'
                })
            }
            const employee = await this.employeeService.batchUpdateEmployee(id, start_hour, end_hour, status, role, ot_pay_entitled, ot_hourly_salary, salary_monthly)
            return res.status(200).json({
                success: `Successfully batch updated employee records ID`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    batchDeleteEmployee = async (req, res) => {
        try {
            const { id } = req.query
            if (!id) {
                return res.status(400).json({
                    error: 'Please provide ID of employee records to be deleted!'
                })
            }
            const employee = await this.employeeService.batchDeleteEmployee(id)
            return res.status(200).json({
                success: 'Successfully deleted employee records'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }
}

module.exports = EmployeeController