class Payroll {
    create = (employeeId, from, to, amount, basicSalary, reimbursement, allowance, deduction, overtime, isReimbursementCaled, isAllowanceCaled, isDeductionCaled, isBonusCaled, isOTcaled, isLeaveCaled, payday) => {
        return {
            employee_id: employeeId,
            from: from,
            to: to,
            amount: amount,
            basic_salary: basicSalary,
            reimbursement: reimbursement,
            allowance: allowance,
            deduction: deduction,
            bonus: bonus,
            overtime: overtime,
            is_reimbursement_calculated: isReimbursementCaled,
            is_allowance_calculated: isAllowanceCaled,
            is_deduction_calculated: isDeductionCaled,
            is_bonus_calculated: isBonusCaled,
            is_overtime_calculated: isOTcaled,
            is_leave_calculated: isLeaveCaled,
            payday: payday,
        }
    }
}

export default Payroll