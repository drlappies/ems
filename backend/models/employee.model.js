class Employee {
    create = (username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled) => {
        return {
            username: username,
            password: password,
            role: role,
            post_id: post_id,
            dept_id: dept_id,
            firstname: firstname,
            lastname: lastname,
            address: address,
            start_hour: start_hour,
            end_hour: end_hour,
            phone_number: phone_number,
            emergency_contact_person: emergency_contact_person,
            emergency_contact_number: emergency_contact_number,
            onboard_date: onboard_date,
            salary_monthly: salary_monthly,
            ot_pay_entitled: ot_pay_entitled,
            ot_hourly_salary: ot_hourly_salary
        }
    }
}

export default Employee