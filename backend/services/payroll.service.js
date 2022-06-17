class PayrollService {
    constructor(models, repositories) {
        this.models = models
        this.repositories = repositories
    }

    createOne = async (employee_id, starting_date, ending_date, payday, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled) => {
        try {
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
            let totalAllowance = 0;
            let totalReimbursement = 0;
            let totalOvertime = 0;
            let totalBonus = 0;
            let totalDeduction = 0;

            const employee = await this.repositories.employee.getOneById(employee_id)

            const query = (qb) => {
                qb.whereBetween('date', [starting_date, ending_date])
                qb.andWhere('employee_id', employee_id)
            }

            const attendance = await this.repositories.attendance.getMany(query)

            for (let i = 0; i < attendance.length; i++) {
                const workingDays = workingDaysCounter(attendance[i].date.getFullYear(), attendance[i].date.getMonth())
                let dailySalary = employee.salary_monthly / workingDays
                amount = amount + dailySalary
            }

            if (isAllowanceCaled) {
                const query = (qb) => {
                    qb.select(['allowance_employee.allowance_id', 'allowance_employee.employee_id', 'allowance.name', 'allowance.amount', 'allowance.minimum_attendance_required', 'allowance.required_attendance_rate', 'allowance.status'])
                    qb.join('allowance', 'allowance_employee.allowance_id', 'allowance.id')
                    qb.join('employee', 'allowance_employee.employee_id', 'employee.id')
                    qb.where('allowance.status', 'active')
                    qb.andWhere('allowance_employee.employee_id', employee_id)
                }

                const result = await this.repositories.allowanceEmployee.getMany(query)

                const startingDate = new Date(starting_date)
                const endingDate = new Date(ending_date)
                const monthsDiff = ((endingDate.getFullYear() - startingDate.getFullYear()) * 12) - startingDate.getMonth() + endingDate.getMonth() + 1;

                for (let i = 0; i < result.length; i++) {
                    // if (allowance[i].minimum_attendance_required) {
                    //     while (startingDate <= endingDate) {
                    //         const currentMonth = startingDate.getMonth()
                    //         for (let j = 0; j < attendance.length; j++) {
                    //             if (attendance[j].date.getMonth() < currentMonth) {
                    //                 continue;
                    //             } else if (attendance[j].date.getMonth() > currentMonth) {
                    //                 break;
                    //             } else {
                    //                 const workingDays = workingDaysCounter(attendance[j].date.getFullYear(), attendance[j].date.getMonth());
                    //                 const monthlyAttendance = attendance.filter(el => !el.date.getMonth() > currentMonth || !el.date.getMonth() < currentMonth)
                    //                 const attendanceRate = Math.round((monthlyAttendance.length / workingDays) * 100)
                    //                 if (attendanceRate < allowance[i].required_attendance_rate) {
                    //                     continue;
                    //                 } else {
                    //                     totalAllowance = parseInt(totalAllowance) + parseInt(allowance[i].amount)
                    //                     break;
                    //                 }
                    //             }
                    //         }
                    //         startingDate.setMonth(startingDate.getMonth() + 1)
                    //     }
                    // } else {
                    totalAllowance = totalAllowance + parseFloat(allowance[i].amount) * monthsDiff;
                    // }
                }
            }

            if (isReimbursementCaled) {
                const query = (qb) => {
                    qb.select(['amount', 'date', 'reason'])
                    qb.whereBetween('date', [starting_date, ending_date])
                    qb.andWhere('status', 'approved')
                    qb.andWhere('employee_id', employee_id)
                }

                const result = await this.repositories.reimbursement.getMany(query)

                const { amount: amount } = result.length >= 1 ? result.reduce((a, b) => { return { amount: parseFloat(a.amount) + parseFloat(b.amount) } }) : { amount: 0 }
                totalReimbursement = totalReimbursement + amount
            }

            if (isOTcaled) {
                const query = (qb) => {
                    qb.select(['from', 'to', 'date'])
                    qb.whereBetween('date', [starting_date, ending_date])
                    qb.andWhere('employee_id', employee_id)
                    qb.andWhere('status', 'approved')
                    qb.whereNotNull('to')
                }

                const result = await this.repositories.overtime.getMany(query)

                for (let i = 0; i < result.length; i++) {
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
                const query = (qb) => {
                    qb.select(['from', 'to', 'duration', 'type'])
                    qb.whereBetween('from', [starting_date, ending_date])
                    qb.whereBetween('to', [starting_date, ending_date])
                    qb.andWhere('status', 'approved')
                    qb.andWhere('employee_id', employee_id)
                }

                const result = await this.repositories.leave.getMany(query)

                for (let i = 0; i < result.length; i++) {
                    if (result[i].type === 'sick_leave') {
                        continue
                    } else {
                        if (leave[i].from === leave[i].to) {
                            const workingDays = workingDaysCounter(result[i].from.getFullYear(), result[i].from.getMonth())
                            let dailySalary = employee.salary_monthly / workingDays
                            if (leave[i].duration === 'full_day') {
                                amount = amount - dailySalary
                            } else {
                                amount = amount - (dailySalary / 2)
                            }
                        } else {
                            for (let j = new Date(result[i].from); j <= new Date(result[i].to); j.setDate(j.getDate() + 1)) {
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
                const query = (qb) => {
                    qb.select(['date', 'amount', 'reason'])
                    qb.whereBetween('date', [starting_date, ending_date])
                    qb.andWhere('employee_id', employee_id)
                }

                const result = this.repositories.bonus.getMany(query)

                const { amount: amount } = result.length >= 1 ? result.reduce((a, b) => { return { amount: parseFloat(a.amount) + parseFloat(b.amount) } }) : { amount: 0 }
                totalBonus = totalBonus + amount
            }

            if (isDeductCaled) {
                const query = (qb) => {
                    qb.select(['date', 'amount', 'reason'])
                    qb.whereBetween('date', [starting_date, ending_date])
                    qb.andWhere('employee_id', employee_id)
                }

                const result = this.repositories.deduction.getMany(query)

                const { amount: amount } = result.length >= 1 ? result.reduce((a, b) => { return { amount: parseFloat(a.amount) + parseFloat(b.amount) } }) : { amount: 0 }
                totalDeduction = totalDeduction + amount
            }

            const basicSalary = amount
            const mpf = amount * 0.05
            const total = amount - parseFloat(mpf) + parseFloat(totalBonus) + parseFloat(totalReimbursement) + parseFloat(totalAllowance) - parseFloat(totalDeduction)

            const model = this.models.payroll.create(employee.id, starting_date, ending_date, payday, basicSalary, total, totalReimbursement, totalAllowance, totalDeduction, totalBonus, totalOvertime, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled)
            const result = this.repositories.payroll.createOne(model, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    deleteOneById = async (id) => {
        try {
            await this.repositories.payroll.deleteOneById(id)
        } catch (error) {
            throw error
        }
    }

    deleteManyByIds = async (ids) => {
        try {
            await this.repositories.payroll.deleteManyByIds(ids)
        } catch (error) {
            throw error
        }
    }

    getOneById = async (id) => {
        try {
            const result = await this.repositories.payroll.getOneById(id)

            return result
        } catch (error) {
            throw error
        }
    }

    getMany = async (params) => {
        try {
            const offset = params.offset
            const limit = params.limit
            const search = params.search
            const employee_id = params.employee_id
            const status = params.status
            const mindate = params.mindate
            const maxdate = params.maxdate
            const minamount = params.minamount
            const maxamount = params.maxamount

            const query = (qb) => {
                qb.join('employee', 'payroll.employee_id', 'employee.id')
                qb.select(['payroll.id', 'payroll.employee_id', 'employee.firstname', 'employee.lastname', 'payroll.from', 'payroll.to', 'payroll.payday', 'payroll.basic_salary', 'payroll.amount', 'payroll.status', 'payroll.is_reimbursement_calculated', 'payroll.is_allowance_calculated', 'payroll.is_deduction_calculated', 'payroll.is_bonus_calculated', 'payroll.is_overtime_calculated', 'payroll.is_leave_calculated', 'payroll.mpf_deduction'])
                if (search) qb.whereRaw(`to_tsvector(payroll.id || ' ' || payroll.employee_id || ' ' || employee.firstname || ' ' || employee.lastname || ' ' || payroll.from || ' ' || payroll.to || ' ' || payroll.payday || ' ' || payroll.amount || ' ' || payroll.status || ' ' || payroll.basic_salary) @@ plainto_tsquery('${search}')`)
                if (employee_id) qb.where('payroll.employee_id', '=', employee_id)
                if (status) qb.where('payroll.status', '=', status)
                if (mindate && maxdate) {
                    qb.whereBetween('payroll.from', [mindate, maxdate])
                    qb.whereBetween('payroll.to', [mindate, maxdate])
                    qb.whereBetween('payroll.payday', [mindate, maxdate])
                }
                if (minamount && maxamount) {
                    qb.whereBetween('payroll.amount', [minamount, maxamount])
                }

                if (offset) qb.offset(offset)
                if (limit) qb.limit(limit)
            }

            const result = await this.repositories.payroll.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    getManyApprovedByIds = async (ids) => {
        try {
            const query = qb => {
                qb.whereIn('id', ids)
                qb.andWhere('status', 'approved')
            }

            const result = await this.repositories.payroll.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }

    updateOneById = async (id, params) => {
        try {
            const status = params.status

            const data = {}
            if (status) data.status = status

            const result = await this.repositories.payroll.updateOneById(id, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    updateManyByIds = async (ids, params) => {
        try {
            const status = params.status

            const data = {}
            if (status) data.status = status

            const result = await this.repositories.payroll.updateManyByIds(ids, data, ['*'])

            return result
        } catch (error) {
            throw error
        }
    }

    checkIfPayrollOverlapped = async (employee_id, starting_date, ending_date) => {
        try {
            const query = qb => {
                qb.select('id')
                qb.where('employee_id', employee_id)
                qb.andWhere(qb => {
                    qb.andWhere('from', '<=', ending_date)
                    qb.andWhere('to', '>=', starting_date)
                })
            }

            const result = await this.repositories.payroll.getMany(query)

            return result
        } catch (error) {
            throw error
        }
    }
}

export default PayrollService