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
        }

        let obj = {
            employee_id: employee_id,
            status: "on_time",
            check_in: "09:00 AM",
            check_out: "6:00 PM",
            date: new Date(time)
        }

        time.setDate(time.getDate() + 1)
        attendance.push(obj)
    }

    return attendance;
}

module.exports.generateAttendanceWithLeave = (timespan, employee_id, probability) => {
    if (probability > 1) probability = 1;
    const time = new Date();
    time.setMonth(0)
    time.setDate(1);
    time.setDate(2021)

    const attendance = [];
    for (let i = 0; i < timespan; i++) {
        if (time.getDay() === 6 || time.getDay() === 0) {
            time.setDate(time.getDate() + 1)
            continue;
        }

        if (Math.random() < probability) {
            let obj = {
                employee_id: employee_id,
                status: "on_time",
                check_in: "09:00 AM",
                check_out: "6:00 PM",
                date: new Date(time)
            }
            attendance.push(obj)
        }
        time.setDate(time.getDate() + 1)
    }
    return attendance
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
                date: new Date(time)
            }
            overtime.push(obj)
        }
        time.setDate(time.getDate() + 1)
    }
    return overtime
}

module.exports.generateLeave = (timespan, employee_id) => {
    const time = new Date()
    time.setMonth(0)
    time.setDate(1);
    const leave = []
    for (let i = 0; i < timespan; i++) {
        if (time.getDay() === 6 || time.getDay() === 0) {
            time.setDate(time.getDate() + 1)
            continue;
        } else {
            let obj = {
                employee_id: employee_id,
                reason: `Testing pagination ${i}`,
                from: time,
                to: time,
                status: 'pending',
                duration: 'full_day',
                type: 'sick_leave'
            }
            leave.push(obj)
        }
        time.setDate(time.getDate() + 1)
    }
    return leave
}