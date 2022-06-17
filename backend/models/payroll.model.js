class Payroll {
    create = (employee_id, starting_date, ending_date, payday, basic_salary, amount, reimbursement, allowance, deduction, bonus, overtime, isDeductCaled, isBonusCaled, isAllowanceCaled, isOTcaled, isReimbursementCaled, isLeaveCaled) => {
        return {
            employee_id: employee_id,
            from: starting_date,
            to: ending_date,
            amount: amount,
            basic_salary: basic_salary,
            reimbursement: reimbursement,
            allowance: allowance,
            deduction: deduction,
            bonus: bonus,
            overtime: overtime,
            is_reimbursement_calculated: isReimbursementCaled,
            is_allowance_calculated: isAllowanceCaled,
            is_deduction_calculated: isDeductCaled,
            is_bonus_calculated: isBonusCaled,
            is_overtime_calculated: isOTcaled,
            is_leave_calculated: isLeaveCaled,
            payday: payday,
        }
    }
}

export default Payroll