module.exports.generateAttendance = (timespan, employee_id) => {
    const time = new Date();
    time.setMonth(0)
    time.setDate(1);
    time.setFullYear(2021);

    const attendance = [];
    for (let i = 0; i < timespan; i++) {
        if (time.getDay() === 6 || time.getDay() === 0) {
            time.setDate(time.getDate() + 1)
            continue;
        } else {
            let obj = {
                employee_id: employee_id,
                status: "on_time",
                check_in: "09:00 AM",
                check_out: "6:00 PM",
                date: new Date(time.setDate(time.getDate() + 1))
            }
            attendance.push(obj)
        }
    }
    return attendance;
}

module.exports.generateOvertime = (timespan, employee_id) => {
    const time = new Date();
    time.setMonth(0)
    time.setDate(1);
    time.setFullYear(2021);
    const overtime = [];
    for (let i = 0; i < timespan; i++) {
        if (time.getDay() === 6 || time.getDay() === 0) {
            time.setDate(time.getDate() + 1)
            continue
        } else {
            let obj = {
                employee_id: employee_id,
                from: "06:00 PM",
                to: "09:00PM",
                date: new Date(time.setDate(time.getDate() + 1))
            }
            overtime.push(obj)
        }
    }
    return overtime
}