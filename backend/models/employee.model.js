class Employee {
    create = (username, password, role, posId, deptId, firstname, lastname, address, startHour, endHour, phoneNo, eContactPerson, eContactNo, onBoardDate, payMonthly, hasOt, otPay) => {
        return {
            username: username,
            password: password,
            role: role,
            post_id: posId,
            dept_id: deptId,
            firstname: firstname,
            lastname: lastname,
            address: address,
            start_hour: startHour,
            end_hour: endHour,
            phone_number: phoneNo,
            emergency_contact_person: eContactPerson,
            emergency_contact_number: eContactNo,
            onboard_date: onBoardDate,
            salary_monthly: payMonthly,
            ot_pay_entitled: hasOt,
            ot_hourly_salary: otPay
        }
    }
}

export default Employee