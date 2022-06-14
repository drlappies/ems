class Reimbursement {
    create = (employeeId, date, amount, reason, status) => {
        return {
            employee_id: employeeId,
            date: date,
            amount: amount,
            reason: reason,
            status: status
        }
    }
}

export default Reimbursement