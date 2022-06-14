class AllowanceEmployee {
    create = (employeeId, allowanceId) => {
        return {
            employee_id: employeeId,
            allowance_id: allowanceId
        }
    }
}

export default AllowanceEmployee