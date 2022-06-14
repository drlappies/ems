class Deduction {
    create = (employeeId, reason, amount, date) => {
        return {
            employee_id: employeeId,
            reason: reason,
            amount: amount,
            date: date
        }
    }
}

export default Deduction