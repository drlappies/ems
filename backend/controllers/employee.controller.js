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
            const { offset, limit, search, position, department, role, status, salaryFrom, salaryTo, hasOTpay } = req.query
            const query = await this.employeeService.getAllEmployee(offset, limit, search, position, department, role, status, salaryFrom, salaryTo, hasOTpay);
            return res.status(200).json({
                employee: query.employee,
                rowCount: query.count,
                positions: query.positions,
                departments: query.departments
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err })
        }
    }

    createEmployee = async (req, res) => {
        try {
            const { username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_pay_entitled, ot_hourly_salary } = req.body;
            if (!username || !password || !role || !firstname || !lastname || !address || !phone_number || !emergency_contact_person || !emergency_contact_number || !onboard_date) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            if (start_hour >= end_hour) {
                return res.status(400).json({
                    error: 'Employee start work hour cannot be greater than or equal to his/her off hour.'
                })
            }

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
            const { id, post_id, dept_id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, status, username, role, start_hour, end_hour, salary_monthly, ot_pay_entitled, ot_hourly_salary, annual_leave_count } = req.body;
            let { password } = req.body;
            if (password) password = await hashPassword(password)
            const employee = await this.employeeService.updateEmployee(id, post_id, dept_id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, status, username, password, role, start_hour, end_hour, salary_monthly, ot_pay_entitled, ot_hourly_salary, annual_leave_count)
            return res.status(200).json({
                success: employee.length > 1 ? `Successfully batch updated employee record.` : `Successfully updated employee ID: ${employee[0].id}`,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    deleteEmployee = async (req, res) => {
        try {
            let { id } = req.query;
            if (!Array.isArray(id)) id = [id];
            if (id.includes('1') || id.includes(1)) {
                return res.status(400).json({
                    error: "Cannot remove root user from the system!"
                })
            }
            const employee = await this.employeeService.deleteEmployee(id);
            return res.status(200).json({
                success: `Successfully deleted employee record ID: ${employee.id}`,
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

}

export default EmployeeController