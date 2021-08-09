class AllowanceService {
    constructor(knex) {
        this.knex = knex
    }

    createAllowance = async (name, description, amount) => {
        const [allowance] = await this.knex('allowance').insert({
            name: name,
            description: description,
            amount: amount
        }).returning(['id', 'name', 'description', 'amount'])
        return allowance
    }

    deleteAllowance = async (id) => {
        const [allowance] = await this.knex('allowance').where('id', id).del(['id', 'name'])
        return allowance
    }

    editAllowance = async (id, name, description, amount, status) => {
        const [allowance] = await this.knex('allowance').where('id', id).update({
            name: name,
            description: description,
            amount: amount,
            status: status
        }, ['id', 'name', 'amount', 'status'])
        return allowance
    }

    getAllAllowance = async () => {
        const allowance = await this.knex('allowance').select()
        return allowance
    }

    getAllowance = async (id) => {
        const allowance = await this.knex('allowance_employee')
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .join('employee', 'allowance_employee.employee_id', 'employee.id')
            .select(['allowance_id', 'employee_id', 'allowance.name', 'allowance.description', 'allowance.amount', 'allowance.status', 'employee.firstname', 'employee.lastname'])
            .where('allowance_id', id)
        return allowance
    }

    addEmployeeToAllowance = async (employeeId, allowanceId) => {
        const [employee] = await this.knex('allowance_employee')
            .insert({
                allowance_id: allowanceId,
                employee_id: employeeId
            }).returning(['employee_id', 'allowance_id'])
        return employee
    }

    removeEmployeeFromAllowance = async (employeeId, allowanceId) => {
        const [employee] = await this.knex('allowance_employee')
            .where('employee_id', employeeId)
            .andWhere('allowance_id', allowanceId)
            .del(['employee_id', 'allowance_id'])
        return employee
    }

    isEmployeeInAllowance = async (employeeId, allowanceId) => {
        const allowance_employee = await this.knex('allowance_employee')
            .select()
            .where('employee_id', employeeId)
            .andWhere('allowance_id', allowanceId)
        return allowance_employee
    }
}

module.exports = AllowanceService