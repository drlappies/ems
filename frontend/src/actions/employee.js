import { CONFIRM_EMPLOYEE_UPDATE, FETCH_EMPLOYEE, FETCH_SPECIFIC_EMPLOYEE, UPDATE_SPECIFIC_EMPLOYEE, DELETE_EMPLOYEE, RESET_EMPLOYEE } from '../types/employee'
import axios from 'axios';

export const fetchEmployee = (page, firstname, lastname, joinStart, joinEnd) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/employee', {
                params: {
                    employeeFirstname: firstname,
                    employeeLastname: lastname,
                    joinStart: joinStart,
                    joinEnd: joinEnd,
                    page: page
                }
            });
            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageCount: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchNextEmployeePage = (page, pageCount, firstname, lastname, joinStart, joinEnd) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return
            const res = await axios.get('/employee', {
                params: {
                    employeeFirstname: firstname,
                    employeeLastname: lastname,
                    joinStart: joinStart,
                    joinEnd: joinEnd,
                    page: page + 15
                }
            });
            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageCount: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousEmployeePage = (page, firstname, lastname, joinStart, joinEnd) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return
            const res = await axios.get('/employee', {
                params: {
                    employeeFirstname: firstname,
                    employeeLastname: lastname,
                    joinStart: joinStart,
                    joinEnd: joinEnd,
                    page: page - 15
                }
            });
            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageCount: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchSpecificEmployee = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/employee/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_EMPLOYEE,
                payload: {
                    employeeId: res.data.employee.id,
                    employeeFirstname: res.data.employee.firstname,
                    employeeLastname: res.data.employee.lastname,
                    employeeAddress: res.data.employee.address,
                    employeePosition: res.data.employee.post,
                    employeePositionId: res.data.employee.post_id,
                    employeeDepartment: res.data.employee.name,
                    employeeDepartmentId: res.data.employee.dept_id,
                    employeeNumber: res.data.employee.phone_number,
                    employeeContactPerson: res.data.employee.emergency_contact_person,
                    employeeContactNumber: res.data.employee.emergency_contact_number,
                    employeeOnboardDate: res.data.employee.onboard_date,
                    employeeRole: res.data.employee.role,
                    employeeSalary: res.data.employee.salary_monthly,
                    employeeOT: res.data.employee.ot_pay_entitled,
                    employeeOTpay: res.data.employee.ot_hourly_salary,
                    employeeStatus: res.data.employee.status,
                    employeeStartHour: res.data.employee.start_hour,
                    employeeEndHour: res.data.employee.end_hour
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateSpecificEmployee = (e) => {
    return (dispatch) => {
        try {
            const name = e.target.name
            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
            dispatch({
                type: UPDATE_SPECIFIC_EMPLOYEE,
                payload: {
                    name: name,
                    value: value
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmEmployeeUpdate = (id, firstname, lastname, position, department, address, phoneNumber, contactPerson, contactNumber, onboardDate, status, isOtEntitled, otPay, startHour, endHour) => {
    return async (dispatch) => {
        try {
            const body = {
                department: department,
                position: position,
                firstname: firstname,
                lastname: lastname,
                address: address,
                phone_number: phoneNumber,
                emergency_contact_number: contactNumber,
                emergency_contact_person: contactPerson,
                onboard_date: onboardDate,
                status: status,
                ot_pay_entitled: isOtEntitled,
                ot_hourly_salary: otPay,
                starting: startHour,
                ending: endHour
            }
            const res = await axios.put(`/employee/${id}`, body)
            dispatch({
                type: CONFIRM_EMPLOYEE_UPDATE,
                payload: {
                    employeeId: res.data.employee.id,
                    employeeFirstname: res.data.employee.firstname,
                    employeeLastname: res.data.employee.lastname,
                    employeeAddress: res.data.employee.address,
                    employeePosition: res.data.employee.post,
                    employeeDepartment: res.data.employee.name,
                    employeeNumber: res.data.employee.phone_number,
                    employeeContactPerson: res.data.employee.emergency_contact_person,
                    employeeContactNumber: res.data.employee.emergency_contact_number,
                    employeeOnboardDate: res.data.employee.onboard_date,
                    employeeRole: res.data.employee.role,
                    employeeSalary: res.data.employee.salary_monthly,
                    employeeOT: res.data.employee.ot_pay_entitled,
                    employeeOTpay: res.data.employee.ot_hourly_salary,
                    employeeStatus: res.data.employee.status,
                    employeeStartHour: res.data.employee.start_hour,
                    employeeEndHour: res.data.employee.end_hour
                }
            })
            dispatch({
                type: RESET_EMPLOYEE
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteEmployee = (employeeId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/employee/${employeeId}`)
            console.log(res.data)
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: {
                    employeeId: res.data.employee.id
                }
            })
            dispatch({
                type: RESET_EMPLOYEE
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetEmployee = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_EMPLOYEE
        })
    }
}

export const createEmployee = (username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled) => {
    return async (dispatch) => {
        try {
            const body = {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                post_id: post_id,
                dept_id: dept_id,
                address: address,
                phone_number: phone_number,
                start_hour: start_hour,
                end_hour: end_hour,
                role: role,
                emergency_contact_number: emergency_contact_number,
                emergency_contact_person: emergency_contact_person,
                salary_monthly: salary_monthly,
                ot_pay_entitled: ot_pay_entitled,
                ot_hourly_salary: ot_hourly_salary,
                onboard_date: onboard_date
            }
            await axios.post('/employee', body)
            dispatch(fetchEmployee())
            dispatch({
                type: RESET_EMPLOYEE
            })

        } catch (err) {
            console.log(err)
        }
    }
}