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
        }, ['employee_id', 'from', 'to', 'date'])
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
            }, ['id'])
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

    getAllOvertime = async () => {
        const overtime = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.date', 'overtime.from', 'overtime.to'])
        return overtime
    }

    getOvertime = async (id) => {
        const [overtime] = await this.knex('overtime')
            .join('employee', 'overtime.employee_id', 'employee.id')
            .select(['overtime.id', 'overtime.employee_id', 'employee.firstname', 'employee.lastname', 'overtime.date', 'overtime.from', 'overtime.to'])
            .where('overtime.id', id)
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