class Overtime {
    create = (employeeId, date, from) => {
        return {
            employee_id: employeeId,
            date: date,
            from: from,
        }
    }
}

export default Overtime