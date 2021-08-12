class PayrollService {
    constructor(knex) {
        this.knex = knex
    }

    createPayroll = async (employee_id, starting_date, ending_date) => {
        const [employee] = await this.knex('employee')
            .where('id', employee_id)

        const leave = await this.knex('leave')
            .select(['from', 'to', 'duration', 'type'])
            .where('from', '>=', starting_date)
            .andWhere('to', '<=', ending_date)
            .andWhere('status', 'approved')
            .andWhere('employee_id', employee_id)

        const reimbursement = await this.knex('reimbursement')
            .select(['amount', 'date', 'reason'])
            .where('date', '>=', starting_date)
            .andWhere('date', '<=', ending_date)
            .andWhere('status', 'approved')
            .andWhere('employee_id', employee_id)

        const bonus = await this.knex('bonus')
            .select(['date', 'amount', 'reason'])
            .where('date', '>=', starting_date)
            .andWhere('date', '<=', ending_date)
            .andWhere('employee_id', employee_id)

        const deduction = await this.knex('deduction')
            .select(['date', 'amount', 'reason'])
            .where('date', '>=', starting_date)
            .andWhere('date', '<=', ending_date)
            .andWhere('employee_id', employee_id)

        const attendance = await this.knex('attendance')
            .select(['date'])
            .where('date', '>=', starting_date)
            .andWhere('date', '<=', ending_date)
            .andWhere('employee_id', employee_id)

        const allowance = await this.knex('allowance_employee')
            .select(['allowance_employee.allowance_id', 'allowance_employee.employee_id', 'allowance.name', 'allowance.amount'])
            .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
            .join('employee', 'allowance_employee.employee_id', 'employee.id')
            .where('allowance_employee.employee_id', employee_id)

        const workingDaysCounter = (year, month) => {
            const calendarDays = new Date(year, month + 1, 0).getDate();
            let weekendDays = 0;
            let day = 1;
            let date = new Date(year, month, day);
            while (date.getMonth() === month) {
                if (date.getDay() === 0 || date.getDay() === 6) {
                    weekendDays = weekendDays + 1;
                }
                day = day + 1;
                date = new Date(year, month, day)
            }
            return calendarDays - weekendDays
        }

        let amount = 0;

        for (let i = 0; i < attendance.length; i++) {
            const workingDays = workingDaysCounter(attendance[i].date.getFullYear(), attendance[i].date.getMonth())
            let dailySalary = employee.salary_monthly / workingDays
            amount = amount + dailySalary
        }

        for (let i = 0; i < allowance.length; i++) {
            const monthsDiff = ((new Date(ending_date).getFullYear() - new Date(starting_date).getFullYear()) * 12) - new Date(starting_date).getMonth() + new Date(ending_date).getMonth() + 1
            amount = amount + (allowance[i].amount * monthsDiff)
        }

        for (let i = 0; i < leave.length; i++) {
            if (leave[i].type === 'sick_leave' || leave[i].type === 'annual_leave') {
                continue;
            }

            if (leave[i].type === 'no_pay_leave') {
                if (leave[i].from === leave[i].to) {
                    const workingDays = workingDaysCounter(leave[i].from.getFullYear(), leave[i].from.getMonth())
                    let dailySalary = employee.salary_monthly / workingDays
                    if (leave[i].duration === 'full_day') {
                        amount = amount - dailySalary
                    } else {
                        amount = amount - (dailySalary / 2)
                    }
                } else {
                    for (let j = new Date(leave[i].from); j <= new Date(leave[i].to); j.setDate(j.getDate() + 1)) {
                        if (j.getDay() === 6 || j.getDay() === 0) {
                            continue;
                        }
                        const workingDays = workingDaysCounter(j.getFullYear(), j.getMonth())
                        let dailySalary = employee.salary_monthly / workingDays
                        if (leave[i].duration === 'full_day') {
                            amount = amount - dailySalary
                        } else {
                            amount = amount - (dailySalary / 2)
                        }
                    }
                }
            }
        }

        const { amount: totalBonus } = bonus.length >= 1 ? bonus.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }
        const { amount: totalReimbursement } = reimbursement.length >= 1 ? reimbursement.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }
        const { amount: totalDeduction } = deduction.length >= 1 ? deduction.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }
        const { amount: totalAllowance } = allowance.length >= 1 ? allowance.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }

        amount = Math.round(amount + parseInt(totalBonus) + parseInt(totalReimbursement) - parseInt(totalDeduction))

        const [payroll] = await this.knex('payroll').insert({
            employee_id: employee_id,
            from: starting_date,
            to: ending_date,
            amount: amount,
            reimbursement: parseInt(totalReimbursement),
            allowance: parseInt(totalAllowance),
            deduction: parseInt(totalDeduction),
            bonus: parseInt(totalBonus),
        }, ['id', 'from', 'to', 'amount', 'employee_id'])

        return payroll
    }

    checkIfPayrollOverlapped = async (employee_id, starting_date, ending_date) => {
        const payroll = await this.knex('payroll')
            .select()
            .where('employee_id', employee_id)
            .andWhere(function () {
                this.andWhere('from', '<=', ending_date)
                this.andWhere('to', '>=', starting_date)
            })
        return payroll
    }

    deletePayroll = async (id) => {
        const [payroll] = await this.knex('payroll')
            .where('id', id)
            .del(['id', 'from', 'to', 'employee_id'])
        return payroll
    }

    getPayroll = async (id) => {
        const [payroll] = await this.knex('payroll')
            .select()
            .where('id', id)
        return payroll
    }

    getAllPayroll = async () => {
        const payroll = await this.knex('payroll').select()
        return payroll
    }

    confirmPayroll = async (id, status) => {
        const [payroll] = await this.knex('payroll')
            .where('id', id)
            .update({
                status: status
            }, ['id', 'from', 'to', 'status'])
        return payroll
    }
}

module.exports = PayrollService