class PayrollService {
    constructor(knex) {
        this.knex = knex
    }

    createPayroll = async (employee_id, starting_date, ending_date, payday, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled) => {
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

        const [employee] = await this.knex('employee')
            .select(['id', 'salary_monthly', 'ot_pay_entitled', 'ot_hourly_salary'])
            .where('id', employee_id)

        let amount = 0;
        let totalAllowance = 0;
        let totalReimbursement = 0;
        let totalOvertime = 0;
        let totalBonus = 0;
        let totalDeduction = 0;

        const attendance = await this.knex('attendance')
            .select(['date'])
            .whereBetween('date', [starting_date, ending_date])
            .andWhere('employee_id', employee_id)

        for (let i = 0; i < attendance.length; i++) {
            const workingDays = workingDaysCounter(attendance[i].date.getFullYear(), attendance[i].date.getMonth())
            let dailySalary = employee.salary_monthly / workingDays
            amount = amount + dailySalary
        }

        if (isAllowanceCaled) {
            const allowance = await this.knex('allowance_employee')
                .select(['allowance_employee.allowance_id', 'allowance_employee.employee_id', 'allowance.name', 'allowance.amount', 'allowance.minimum_attendance_required', 'allowance.required_attendance_rate', 'allowance.status'])
                .join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
                .join('employee', 'allowance_employee.employee_id', 'employee.id')
                .where('allowance.status', 'active')
                .andWhere('allowance_employee.employee_id', employee_id)

            const startingDate = new Date(starting_date)
            const endingDate = new Date(ending_date)
            const monthsDiff = ((endingDate.getFullYear() - startingDate.getFullYear()) * 12) - startingDate.getMonth() + endingDate.getMonth() + 1;

            for (let i = 0; i < allowance.length; i++) {
                if (allowance[i].minimum_attendance_required) {
                    while (startingDate <= endingDate) {
                        const currentMonth = startingDate.getMonth()
                        for (let j = 0; j < attendance.length; j++) {
                            if (attendance[j].date.getMonth() < currentMonth) {
                                continue;
                            } else if (attendance[j].date.getMonth() > currentMonth) {
                                break;
                            } else {
                                const workingDays = workingDaysCounter(attendance[j].date.getFullYear(), attendance[j].date.getMonth());
                                const monthlyAttendance = attendance.filter(el => !el.date.getMonth() > currentMonth || !el.date.getMonth() < currentMonth)
                                const attendanceRate = Math.round((monthlyAttendance.length / workingDays) * 100)
                                if (attendanceRate < allowance[i].required_attendance_rate) {
                                    continue;
                                } else {
                                    totalAllowance = parseInt(totalAllowance) + parseInt(allowance[i].amount)
                                    break;
                                }
                            }
                        }
                        startingDate.setMonth(startingDate.getMonth() + 1)
                    }
                } else {
                    totalAllowance = totalAllowance + parseInt(allowance[i].amount) * monthsDiff;
                }
            }
        }

        if (isReimbursementCaled) {
            const reimbursement = await this.knex('reimbursement')
                .select(['amount', 'date', 'reason'])
                .whereBetween('date', [starting_date, ending_date])
                .andWhere('status', 'approved')
                .andWhere('employee_id', employee_id)

            const { amount: amount } = reimbursement.length >= 1 ? reimbursement.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }
            totalReimbursement = totalReimbursement + amount
        }

        if (isOTcaled) {
            const overtime = await this.knex('overtime')
                .select(['from', 'to', 'date'])
                .whereBetween('date', [starting_date, ending_date])
                .andWhere('employee_id', employee_id)
                .andWhere('status', 'approved')
                .whereNotNull('to')

            for (let i = 0; i < overtime.length; i++) {
                let from = new Date(`December 17, 1995 ${overtime[i].from}`)
                let to = new Date(`December 17, 1995 ${overtime[i].to}`)
                if (to.getMinutes() >= 30) {
                    to = new Date(new Date(to.setHours(to.getHours() + 1)).setMinutes(0))
                }
                amount = amount + (employee.ot_hourly_salary * (to.getHours() - from.getHours()))
                totalOvertime = totalOvertime + (employee.ot_hourly_salary * (to.getHours() - from.getHours()))
            }
        }

        if (isLeaveCaled) {
            const leave = await this.knex('leave')
                .select(['from', 'to', 'duration', 'type'])
                .whereBetween('from', [starting_date, ending_date])
                .whereBetween('to', [starting_date, ending_date])
                .andWhere('status', 'approved')
                .andWhere('employee_id', employee_id)

            for (let i = 0; i < leave.length; i++) {
                if (leave[i].type === 'sick_leave' || leave[i].type === 'annual_leave') {
                    continue
                } else {
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
        }

        if (isBonusCaled) {
            const bonus = await this.knex('bonus')
                .select(['date', 'amount', 'reason'])
                .whereBetween('date', [starting_date, ending_date])
                .andWhere('employee_id', employee_id)

            const { amount: amount } = bonus.length >= 1 ? bonus.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }
            totalBonus = totalBonus + amount
        }

        if (isDeductCaled) {
            const deduction = await this.knex('deduction')
                .select(['date', 'amount', 'reason'])
                .whereBetween('date', [starting_date, ending_date])
                .andWhere('employee_id', employee_id)

            const { amount: amount } = deduction.length >= 1 ? deduction.reduce((a, b) => { return { amount: parseInt(a.amount) + parseInt(b.amount) } }) : { amount: 0 }
            totalDeduction = totalDeduction + amount
        }

        const basicSalary = amount
        const mpf = amount * 0.05
        const total = amount - parseInt(mpf) + parseInt(totalBonus) + parseInt(totalReimbursement) - parseInt(totalDeduction)

        const [payroll] = await this.knex('payroll').insert({
            employee_id: employee_id,
            from: starting_date,
            to: ending_date,
            amount: total,
            basic_salary: basicSalary,
            reimbursement: totalReimbursement,
            allowance: totalAllowance,
            deduction: totalDeduction,
            bonus: totalBonus,
            overtime: totalOvertime,
            is_reimbursement_calculated: isReimbursementCaled,
            is_allowance_calculated: isAllowanceCaled,
            is_deduction_calculated: isDeductCaled,
            is_bonus_calculated: isBonusCaled,
            is_overtime_calculated: isOTcaled,
            is_leave_calculated: isLeaveCaled,
            payday: payday,
            mpf_deduction: mpf
        }, ['id', 'from', 'to', 'amount', 'employee_id'])

        return payroll
    }

    checkIfPayrollOverlapped = async (employee_id, starting_date, ending_date) => {
        const payroll = await this.knex('payroll')
            .select('id')
            .where('employee_id', employee_id)
            .andWhere(queryBuilder => {
                queryBuilder.andWhere('from', '<=', ending_date)
                queryBuilder.andWhere('to', '>=', starting_date)
            })
        return payroll
    }

    deletePayroll = async (id) => {
        if (!Array.isArray(id)) id = [id];
        const [payroll] = await this.knex('payroll')
            .whereIn('id', id)
            .del('id')
        return payroll
    }

    getPayroll = async (id) => {
        const [payroll] = await this.knex('payroll')
            .join('employee', 'payroll.employee_id', 'employee.id')
            .select(['payroll.id', 'payroll.employee_id', 'employee.firstname', 'employee.lastname', 'payroll.from', 'payroll.to', 'payroll.amount', 'payroll.status', 'payroll.reimbursement', 'payroll.allowance', 'payroll.deduction', 'payroll.bonus', 'payroll.overtime', 'payroll.is_reimbursement_calculated', 'payroll.is_allowance_calculated', 'payroll.is_deduction_calculated', 'payroll.is_bonus_calculated', 'payroll.is_overtime_calculated', 'payroll.is_leave_calculated', 'payroll.payday', 'payroll.basic_salary', 'payroll.mpf_deduction'])
            .where('payroll.id', id)
        return payroll
    }

    getAllPayroll = async (offset, limit, search, employee_id, status, dateFrom, dateTo, amountFrom, amountTo) => {
        const employee = await this.knex('employee')
            .select(['id', 'firstname', 'lastname'])
            .where('status', 'available')
            .orderBy('id')

        const [count] = await this.knex('payroll')
            .join('employee', 'payroll.employee_id', 'employee.id')
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(payroll.id || ' ' || payroll.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || payroll.from || ' ' || payroll.to || ' ' || payroll.payday || ' ' || payroll.amount || ' ' || payroll.status || ' ' || payroll.basic_salary) @@ plainto_tsquery('${search}')`)
                if (employee_id) qb.where('payroll.employee_id', '=', employee_id)
                if (status) qb.where('payroll.status', '=', status)
                if (dateFrom && dateTo) qb.whereBetween('payroll.from', [dateFrom, dateTo])
                if (dateFrom && dateTo) qb.whereBetween('payroll.to', [dateFrom, dateTo])
                if (dateFrom && dateTo) qb.whereBetween('payroll.payday', [dateFrom, dateTo])
                if (amountFrom && amountTo) qb.whereBetween('payroll.amount', [amountFrom, amountTo])
            })
            .count()

        const payroll = await this.knex('payroll')
            .join('employee', 'payroll.employee_id', 'employee.id')
            .select(['payroll.id', 'payroll.employee_id', 'employee.firstname', 'employee.lastname', 'payroll.from', 'payroll.to', 'payroll.payday', 'payroll.basic_salary', 'payroll.amount', 'payroll.status', 'payroll.is_reimbursement_calculated', 'payroll.is_allowance_calculated', 'payroll.is_deduction_calculated', 'payroll.is_bonus_calculated', 'payroll.is_overtime_calculated', 'payroll.is_leave_calculated', 'payroll.mpf_deduction'])
            .modify(qb => {
                if (search) qb.whereRaw(`to_tsvector(payroll.id || ' ' || payroll.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || payroll.from || ' ' || payroll.to || ' ' || payroll.payday || ' ' || payroll.amount || ' ' || payroll.status || ' ' || payroll.basic_salary) @@ plainto_tsquery('${search}')`)
                if (employee_id) qb.where('payroll.employee_id', '=', employee_id)
                if (status) qb.where('payroll.status', '=', status)
                if (dateFrom && dateTo) qb.whereBetween('payroll.from', [dateFrom, dateTo])
                if (dateFrom && dateTo) qb.whereBetween('payroll.to', [dateFrom, dateTo])
                if (dateFrom && dateTo) qb.whereBetween('payroll.payday', [dateFrom, dateTo])
                if (amountFrom && amountTo) qb.whereBetween('payroll.amount', [amountFrom, amountTo])
            })
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .orderBy('payroll.id')

        return { payroll: payroll, employee: employee, count: count }
    }

    getPayrollByEmployee = async (id, offset, limit) => {
        const [count] = await this.knex('payroll').count()

        const payroll = await this.knex('payroll')
            .limit(parseInt(limit))
            .offset(parseInt(offset) * parseInt(limit))
            .where('employee_id', id)
        return { payroll: payroll, count: count }
    }

    updatePayroll = async (id, status) => {
        if (!Array.isArray(id)) id = [id];
        let update = {};
        if (status) update.status = status
        const [payroll] = await this.knex('payroll')
            .whereIn('id', id)
            .update(update, ['id'])
        return payroll
    }
}

module.exports = PayrollService