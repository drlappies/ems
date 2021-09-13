class AllowanceService {
    constructor(knex) {
        this.knex = knex
    }

    createAllowance = async (name, description, amount, rma, rate) => {
        const [allowance] = await this.knex('allowance').insert({
            name: name,
            description: description,
            amount: amount,
            minimum_attendance_required: rma,
            required_attendance_rate: rate
        }).returning(['id', 'name', 'description', 'amount'])
        return allowance
    }

    deleteAllowance = async (id) => {
        const [allowance] = await this.knex('allowance')
            .where('id', id)
            .del(['id', 'name'])
        return allowance
    }

    editAllowance = async (id, name, description, amount, status, minimum_attendance_required, required_attendance_rate) => {
        const [allowance] = await this.knex('allowance')
            .where('id', id)
            .update({
                name: name,
                description: description,
                amount: amount,
                status: status,
                minimum_attendance_required: minimum_attendance_required,
                required_attendance_rate: required_attendance_rate
            }, ['id', 'name', 'amount', 'status', 'description'])
        return allowance
    }

    getAllAllowance = async (page, limit, text, amountFrom, amountTo, status, isAttendRequired, requiredAttendRateFrom, requiredAttendRateTo) => {
        if (!page || page < 0) page = 0;
        if (!limit || limit < 0) limit = 10;

        let currentPage = parseInt(page)
        let currentPageStart = parseInt(page) + 1
        let currentPageEnd = parseInt(page) + parseInt(limit)
        let currentLimit = parseInt(limit)

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
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(name || ' ' || description || ' ' || name) @@ to_tsquery('${text}')`)
                }
                if (isAttendRequired === "yes") {
                    queryBuilder.where('minimum_attendance_required', isAttendRequired)
                }
                if (requiredAttendRateFrom) {
                    queryBuilder.where('required_attendance_rate', '>=', requiredAttendRateFrom)
                }
                if (requiredAttendRateTo) {
                    queryBuilder.where('required_attendance_rate', '<=', requiredAttendRateTo)
                }
            })

        const allowance = await this.knex('allowance')
            .select(['id', 'name', 'description', 'amount', 'status'])
            .limit(currentLimit)
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
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(name || ' ' || description || ' ' || name) @@ to_tsquery('${text}')`)
                }
                if (isAttendRequired === "yes") {
                    queryBuilder.where('minimum_attendance_required', isAttendRequired)
                }
                if (requiredAttendRateFrom) {
                    queryBuilder.where('required_attendance_rate', '>=', requiredAttendRateFrom)
                }
                if (requiredAttendRateTo) {
                    queryBuilder.where('required_attendance_rate', '<=', requiredAttendRateTo)
                }
            })

        if (currentPageEnd >= count.count) {
            currentPageEnd = parseInt(count.count)
        }
        return { allowance: allowance, currentPage: currentPage, currentPageStart: currentPageStart, currentPageEnd: currentPageEnd, pageLength: count.count, currentLimit: currentLimit }
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

    getAllAllowanceByEmployee = async (employee_id, offset, limit) => {
        if (offset <= 0 || !offset) offset = 0;
        if (limit <= 0 || !limit) limit = 10;
        offset = parseInt(offset)
        limit = parseInt(limit)
        let pageStart = offset + 1;
        let pageEnd = offset + limit;
        if (pageEnd >= limit) pageEnd = limit

        const [count] = await this.knex('allowance_employee')
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .select()
            .where('allowance_employee.employee_id', employee_id)
            .count('allowance.id')

        const allowance_employee = await this.knex('allowance_employee')
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .select('allowance.name', 'allowance.description', 'allowance.amount', 'allowance.status', 'allowance.minimum_attendance_required', 'allowance.required_attendance_rate')
            .offset(offset)
            .limit(limit)
            .where('allowance_employee.employee_id', employee_id)

        return { allowance_employee: allowance_employee, offset: offset, limit: limit, count: parseInt(count.count), pageStart: pageStart, pageEnd: pageEnd }
    }
}

module.exports = AllowanceService