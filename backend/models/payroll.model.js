class Payroll {
    create = () => {
        return {
            employee_id: '',
            from: '',
            to: '',
            amount: '',
            basic_salary: '',
            reimbursement: '',
            allowance: '',
            deduction: '',
            bonus: '',
            overtime: '',
            is_reimbursement_calculated: false,
            is_allowance_calculated: false,
            is_deduction_calculated: false,
            is_bonus_calculated: false,
            is_overtime_calculated: false,
            is_leave_calculated: false,
            payday: '',
        }
    }
}

export default Payroll