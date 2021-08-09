class DeductionService {
    constructor(knex) {
        this.knex = knex
    }

    createDeduction = async (employeeId, reason, amount, date) => {
        const [deduction] = await this.knex('deduction').insert({
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }).returning(['id', 'reason', 'amount', 'date'])
        return deduction
    }

    deleteDeduction = async (id) => {
        const [deduction] = await this.knex('deduction').where('id', id).del(['id'])
        return deduction
    }

    updateDeduction = async (id, employeeId, reason, amount, date) => {
        const [deduction] = await this.knex('deduction').where('id', id).update({
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }, ['id', 'employee_id', 'reason', 'amount', 'date'])
        return deduction
    }

    getAllDeduction = async () => {
        const deduction = await this.knex('deduction')
            .join('employee', 'deduction.employee_id', 'employee.id')
            .select(['deduction.id', 'deduction.employee_id', 'deduction.reason', 'deduction.amount', 'deduction.date', 'employee.firstname', 'employee.lastname'])
        return deduction
    }

    getDeduction = async (id) => {
        const [deduction] = await this.knex('deduction')
            .join('employee', 'deduction.employee_id', 'employee.id')
            .select(['deduction.id', 'deduction.employee_id', 'deduction.reason', 'deduction.amount', 'deduction.date', 'employee.firstname', 'employee.lastname'])
            .where('deduction.id', id)
        return deduction
    }
}

module.exports = DeductionService