class Attendance {
    create = (employeeId, date, checkInTime, checkOutTime, status) => {
        return {
            employee_id: employeeId,
            date: date,
            check_in: checkInTime,
            check_out: checkOutTime,
            status: status
        }
    }
}

export default Attendance