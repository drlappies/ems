class AllowanceService {
    constructor(knex) {
        this.knex = knex
    }

    createAllowance = async (name, description, amount, status) => {
        const [allowance] = await this.knex('allowance').insert({
            name: name,
            description: description,
            amount: amount,
            status: status
        }).returning(['id', 'name', 'description', 'amount'])
        return allowance
    }

    deleteAllowance = async (id) => {
        if (!Array.isArray(id)) id = [id];
        const [allowance] = await this.knex('allowance')
            .whereIn('id', id)
            .del(['id', 'name'])
        return allowance
    }

    editAllowance = async (id, name, description, amount, status) => {
        if (!Array.isArray(id)) id = [id];
        let update = {}
        if (name) update.name = name;
        if (description) update.description = description;
        if (amount) update.amount = amount;
        if (status) update.status = status;

        const [allowance] = await this.knex('allowance')
            .whereIn('id', id)
            .update(update, ['id', 'name', 'amount', 'status', 'description'])
        return allowance
    }

    getAllAllowance = async (offset, limit, search, amountFrom, amountTo, status) => {
        const [count] = await this.knex('allowance')
            .modify(qb => {
                if (status) qb.where('status', '=', status)
                if (amountFrom && amountTo) qb.whereBetween('amount', [amountFrom, amountTo])
                if (search) qb.whereRaw(`to_tsvector(name || ' ' || description || ' ' || amount || ' ' || status) @@ plainto_tsquery('${search}')`)
            })
            .count('id')

        const allowance = await this.knex('allowance')
            .select(['id', 'name', 'description', 'amount', 'status'])
            .modify(qb => {
                if (status) qb.where('status', '=', status)
                if (amountFrom && amountTo) qb.whereBetween('amount', [amountFrom, amountTo])
                if (search) qb.whereRaw(`to_tsvector(name || ' ' || description || ' ' || amount || ' ' || status) @@ plainto_tsquery('${search}')`)
            })
            .limit(parseInt(limit))
            .offset(parseInt(limit) * parseInt(offset))
            .orderBy('id')

        return { allowance: allowance, count: count }
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
            }).returning(['employee_id'])
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

    batchUpdateAllowance = async (id, amount, status, minimum_attendance_required, required_attendance_rate) => {
        let update = {};
        if (amount) update.amount = amount;
        if (status) update.status = status;
        if (minimum_attendance_required) update.minimum_attendance_required = minimum_attendance_required === "yes" ? true : false;
        if (required_attendance_rate) update.required_attendance_rate = required_attendance_rate;

        const allowance = await this.knex('allowance')
            .whereIn('id', id)
            .update(update, ['id', 'amount', 'status', 'minimum_attendance_required', 'required_attendance_rate'])
        return allowance
    }

    batchDeleteAllowance = async (id) => {
        if (!Array.isArray(id)) id = [id]
        const allowance = await this.knex('allowance')
            .whereIn('id', id)
            .del()
        return allowance
    }

    getAllAllowanceByEmployee = async (employee_id) => {
        const [count] = await this.knex('allowance_employee')
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .where('allowance_employee.employee_id', employee_id)
            .count()

        const allowance_employee = await this.knex('allowance_employee')
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .select('allowance.id', 'allowance.name', 'allowance.description', 'allowance.amount', 'allowance.status')
            .where('allowance_employee.employee_id', employee_id)

        return { allowance_employee: allowance_employee, count: count }
    }
}

module.exports = AllowanceService