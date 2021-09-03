class OvertimeService {
    constructor(knex) {
        this.knex = knex
    }

    createOvertimeTimein = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const from = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        const [overtimeTimein] = await this.knex('overtime').insert({
            employee_id: employee_id,
            from: from,
            date: date
        }, ['employee_id', 'from', 'date'])
        return overtimeTimein
    }

    createOvertimeTimeout = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const to = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        const [overtimeTimeout] = await this.knex('overtime')
            .where('date', date)
            .andWhere('employee_id', employee_id)
            .update({
                to: to
            }, ['id', 'employee_id', 'date', 'to'])
        return overtimeTimeout
    }

    createOvertime = async (employee_id, date, from, to, status) => {
        const [overtime] = await this.knex('overtime').insert({
            employee_id: employee_id,
            date: date,
            from: from,
            to: to,
            status: status
        }, ['id', 'from', 'to', 'date', 'status', 'employee_id'])

        const created = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .where('overtime.employee_id', overtime.employee_id)
            .andWhere('date', overtime.date)

        return created
    }

    updateOvertime = async (from, to, status, ids) => {
        console.log(from, to, status, ids)
        let batchUpdate = {};
        if (from) {
            batchUpdate.from = from
        }

        if (to) {
            batchUpdate.to = to
        }

        if (status) {
            batchUpdate.status = status
        }

        const overtime = await this.knex('overtime')
            .whereIn('id', ids)
            .update(batchUpdate, ['id'])

        return overtime
    }

    deleteOvertime = async (ids) => {
        if (!Array.isArray(ids)) ids = [ids]
        const [overtime] = await this.knex('overtime')
            .whereIn('id', ids)
            .del(['id'])
        return overtime
    }

    getAllOvertime = async (text, status, dateFrom, dateTo, checkinFrom, checkinTo, checkoutFrom, checkoutTo, page, limit) => {
        if (!page || page < 0) page = 0;
        if (!limit) limit = 10;
        let currentPage = parseInt(page);
        let currentLimit = parseInt(limit);
        let pageStart = parseInt(page) + 1;
        let pageEnd = parseInt(page) + parseInt(limit);

        console.log(page)
        const [count] = await this.knex('overtime')
            .count()
            .from(queryBuilder => {
                queryBuilder
                    .select(['employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status', 'overtime.from', 'overtime.from'])
                    .from('overtime')
                    .join('employee', 'overtime.employee_id', 'employee.id')
                    .modify(queryBuilder => {
                        if (status) {
                            queryBuilder.where('overtime.status', status)
                        }
                        if (dateFrom) {
                            queryBuilder.where('overtime.date', '>=', dateFrom)
                        }
                        if (dateTo) {
                            queryBuilder.where('overtime.date', '<=', dateTo)
                        }
                        if (checkinFrom) {
                            queryBuilder.where('overtime.from', '>=', checkinFrom)
                        }
                        if (checkinTo) {
                            queryBuilder.where('overtime.from', '<=', checkinTo)
                        }
                        if (checkoutFrom) {
                            queryBuilder.where('overtime.to', '>=', checkoutFrom)
                        }
                        if (checkoutTo) {
                            queryBuilder.where('overtime.to', '<=', checkoutTo)
                        }
                        if (text) {
                            queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || employee.id || ' ' || overtime.id) @@ plainto_tsquery('${text}')`)
                        }
                    })
                    .as('count')
            })

        const overtime = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .limit(currentLimit)
            .offset(page)
            .orderBy('id')
            .modify((queryBuilder) => {
                if (status) {
                    queryBuilder.where('overtime.status', status)
                }
                if (dateFrom) {
                    queryBuilder.where('overtime.date', '>=', dateFrom)
                }
                if (dateTo) {
                    queryBuilder.where('overtime.date', '<=', dateTo)
                }
                if (checkinFrom) {
                    queryBuilder.where('overtime.from', '>=', checkinFrom)
                }
                if (checkinTo) {
                    queryBuilder.where('overtime.from', '<=', checkinTo)
                }
                if (checkoutFrom) {
                    queryBuilder.where('overtime.to', '>=', checkoutFrom)
                }
                if (checkoutTo) {
                    queryBuilder.where('overtime.to', '<=', checkoutTo)
                }
                if (text) {
                    queryBuilder.whereRaw(`to_tsvector(employee.firstname || ' ' || employee.lastname || ' ' || employee.id || ' ' || overtime.id) @@ plainto_tsquery('${text}')`)
                }
            })

        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])
            .where('status', 'available')

        if (pageEnd > count.count) {
            pageEnd = parseInt(count.count)
        }

        return { overtime: overtime, count: count.count, currentPage: currentPage, pageStart: pageStart, pageEnd: pageEnd, employeeList: employee, currentLimit: currentLimit }
    }

    getOvertime = async (id) => {
        const [overtime] = await this.knex('overtime')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .join('employee', 'overtime.employee_id', 'employee.id')
            .where('overtime.id', id)

        return overtime
    }

    getEmployeeOvertimeStatus = async (employeeId) => {
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const [overtime] = await this.knex('overtime')
            .where('employee_id', employeeId)
            .andWhere('date', date)
        return overtime
    }

    checkIfTimedin = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
        return overtime
    }

    checkIfTimedout = async (employee_id) => {
        const currentTime = new Date();
        const date = `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}`
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
            .whereNotNull('to')
        return overtime
    }

    checkForConflict = async (employee_id, date) => {
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
        if (overtime.length >= 1) {
            return true
        }
        return false
    }
}

module.exports = OvertimeService