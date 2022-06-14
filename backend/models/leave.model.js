class Leave {
    create = (employeeId, reason, from, to, duration, type) => {
        return {
            employee_id: employeeId,
            reason: reason,
            from: from,
            to: to,
            duration: duration,
            type: type
        }
    }
}

export default Leave