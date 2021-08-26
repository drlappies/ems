class AllowanceService {
    constructor(knex) {
        this.knex = knex
    }

    createAllowance = async (name, description, amount, interval, rma, rate) => {
        const [allowance] = await this.knex('allowance').insert({
            name: name,
            description: description,
            amount: amount,
            interval: interval,
            minimum_attendance_required: rma,
            required_attendance_rate: rate
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

    getAllAllowance = async (page, amountFrom, amountTo, status, query) => {
        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + 15

        const [count] = await this.knex('allowance')
            .count('id')
            .modify((queryBuilder) => {
                if (amountFrom) {
                    queryBuilder.where('amount', '>=', amountFrom)
                }
                if (amountTo) {
                    queryBuilder.where('amount', '<=', amountTo)
                }
                if (status) {
                    queryBuilder.where('status', status)
                }
                if (query) {
                    queryBuilder.whereRaw(`to_tsvector(name || ' ' || description) @@ to_tsquery('${query}')`)
                }
            })

        const allowance = await this.knex('allowance')
            .select(['id', 'name', 'description', 'amount', 'status', 'interval'])
            .limit(15)
            .offset(currentPage)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (amountFrom) {
                    queryBuilder.where('amount', '>=', amountFrom)
                }
                if (amountTo) {
                    queryBuilder.where('amount', '<=', amountTo)
                }
                if (status) {
                    queryBuilder.where('status', status)
                }
                if (query) {
                    queryBuilder.whereRaw(`to_tsvector(name || ' ' || description) @@ to_tsquery('${query}')`)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }
        return { allowance: allowance, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count }
    }

    getAllowance = async (id) => {
        const [allowance] = await this.knex('allowance')
            .select()
            .where('id', id)

        const allowance_employee = await this.knex('allowance_employee')
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .join('employee', 'allowance_employee.employee_id', 'employee.id')
            .select(['employee.id', 'employee.firstname', 'employee.lastname'])
            .where('allowance_employee.allowance_id', id)

        const employeeId = allowance_employee.map(el => el.id)

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])
            .whereNotIn('id', employeeId)

        return { allowance_employee: allowance_employee, allowance: allowance, employee: employee }
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