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

    createOvertime = async (employee_id, date, from, to) => {
        const [overtime] = await this.knex('overtime').insert({
            employee_id: employee_id,
            date: date,
            from: from,
            to: to
        }, ['date', 'from', 'to'])
        return overtime
    }

    updateOvertime = async (id, from, to, status) => {
        const [overtime] = await this.knex('overtime')
            .where('id', id)
            .update({
                from: from,
                to: to,
                status: status
            }, ['id', 'from', 'to', 'status'])
        return overtime
    }

    deleteOvertime = async (id) => {
        const [overtime] = await this.knex('overtime')
            .where('id', id)
            .del(['id'])
        return overtime
    }

    recreateOvertimeTimeout = async (employee_id, date, to) => {
        const [overtimeTimeout] = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
            .whereNull('to')
            .update({
                to: to
            }, ['employee_id', 'date', 'to'])
        return overtimeTimeout
    }

    recreateOvertimeTimein = async (employee_id, date, from) => {
        const [overtimeTimein] = await this.knex('overtime')
            .insert({
                employee_id: employee_id,
                date: date,
                from: from
            }, ['date', 'from'])
        return overtimeTimein
    }

    getAllOvertime = async (starting, ending, employee_id, page, status) => {
        let currentPage = parseInt(page);
        let pageStart = parseInt(page) + 1;
        let pageEnd = parseInt(page) + 15;

        const [count] = await this.knex('overtime')
            .count('id')
            .where('date', '>=', starting)
            .andWhere('date', '<=', ending)
            .modify((queryBuilder) => {
                if (employee_id) {
                    queryBuilder.where('overtime.employee_id', employee_id)
                }
            })
            .modify((queryBuilder) => {
                if (status) {
                    queryBuilder.where('overtime.status', status)
                }
            })

        const overtime = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.from', 'overtime.to', 'overtime.date', 'overtime.status'])
            .limit(15)
            .offset(page)
            .orderBy('id')
            .where('date', '>=', starting)
            .andWhere('date', '<=', ending)
            .modify((queryBuilder) => {
                if (employee_id) {
                    queryBuilder.where('overtime.employee_id', employee_id)
                }
            })
            .modify((queryBuilder) => {
                if (status) {
                    queryBuilder.where('overtime.status', status)
                }
            })

        if (pageEnd > count.count) {
            pageEnd = parseInt(count.count)
        }

        return { overtime: overtime, count: count.count, currentPage: currentPage, pageStart: pageStart, pageEnd: pageEnd }
    }

    getOvertime = async (id) => {
        const currentTime = new Date()
        const date = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        const [overtime] = await this.knex('overtime')
            .where('employee_id', id)
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

    checkIfSpecificTimedin = async (employee_id, date) => {
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
        return overtime
    }

    checkIfSpecificTimedout = async (employee_id, date) => {
        const overtime = await this.knex('overtime')
            .where('employee_id', employee_id)
            .andWhere('date', date)
            .whereNotNull('to')
        return overtime
    }
}

module.exports = OvertimeService