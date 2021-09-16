import { TOGGLE_EMPLOYEE_BATCH_DELETING, FETCH_EMPLOYEE, UPDATE_SPECIFIC_EMPLOYEE, TOGGLE_EMPLOYEE_CREATING, TOGGLE_EMPLOYEE_VIEWING, TOGGLE_EMPLOYEE_UPDATING, TOGGLE_EMPLOYEE_DELETING, TOGGLE_EMPLOYEE_FILTERING, ADD_TO_EMPLOYEE_SELECTED, REMOVE_FROM_EMPLOYEE_SELECTED, ADD_ALL_EMPLOYEE_SELECTED, REMOVE_ALL_EMPLOYEE_SELECTED, TOGGLE_EMPLOYEE_BATCH_UPDATING, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, CREATE_EMPLOYEE, BATCH_UPDATE_EMPLOYEE, BATCH_DELETE_EMPLOYEE } from '../types/employee'
import axios from 'axios';
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchEmployee = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/employee');
            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit,
                    pageCount: res.data.count,
                    positions: res.data.positions,
                    departments: res.data.departments
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchNextEmployeePage = (page, limit, pageCount, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageCount) return;
            const res = await axios.get('/api/employee', {
                params: {
                    page: page + limit,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            });

            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageCount: res.data.count,
                    currentLimit: res.data.currentLimit,
                    positions: res.data.positions,
                    departments: res.data.departments
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousEmployeePage = (page, limit, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/api/employee', {
                params: {
                    page: page - limit,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            });

            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageCount: res.data.count,
                    currentLimit: res.data.currentLimit,
                    positions: res.data.positions,
                    departments: res.data.departments
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchEmployeeByEntries = (page, limit, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            });

            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageCount: res.data.count,
                    currentLimit: res.data.currentLimit,
                    positions: res.data.positions,
                    departments: res.data.departments
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
            let { name, value, type, checked } = e.target
            if (type === 'checkbox') value = checked
            if (name === "employeeSalary" || name === "batchUpdateMonthlySalary" || name === "employeeOTpay" || name === "batchUpdateOTHourlyPay") {
                if (parseInt(value) > 999999.99 || value.length > 9) {
                    value = "999999.99"
                }
            }
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

export const confirmEmployeeUpdate = (id, dept_id, post_id, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, status, ot_pay_entitled, ot_hourly_salary, salary_monthly, start_hour, end_hour, role, username, password, annual_leave_count, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus, page, limit) => {
    return async (dispatch) => {
        try {
            const body = {
                dept_id: dept_id,
                post_id: post_id,
                firstname: firstname,
                lastname: lastname,
                address: address,
                phone_number: phone_number,
                emergency_contact_person: emergency_contact_person,
                emergency_contact_number: emergency_contact_number,
                onboard_date: onboard_date,
                status: status,
                ot_pay_entitled: ot_pay_entitled,
                ot_hourly_salary: ot_hourly_salary,
                salary_monthly: salary_monthly,
                start_hour: start_hour,
                end_hour: end_hour,
                role: role,
                username: username,
                password: password,
                annual_leave_count: annual_leave_count
            }
            const res = await axios.put(`/api/employee/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            })
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: {
                    isUpdating: false,
                    employeeId: "",
                    employeeFirstname: "",
                    employeeLastname: "",
                    employeeAddress: "",
                    employeePosition: "",
                    employeePositionId: "",
                    employeeDepartment: "",
                    employeeDepartmentId: "",
                    employeeNumber: "",
                    employeeContactPerson: "",
                    employeeContactNumber: "",
                    employeeOnboardDate: "",
                    employeeRole: "",
                    employeeSalary: "",
                    employeeOT: false,
                    employeeOTpay: "",
                    employeeStatus: "",
                    employeeStartHour: "",
                    employeeEndHour: "",
                    employeeAl: "",
                    record: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageCount: res2.data.count,
                    currentLimit: res2.data.currentLimit,
                    positions: res2.data.positions,
                    departments: res2.data.departments
                }
            })
        } catch (err) {
            dispatch(popSuccessMessage(err.response.data.error))
        }
    }
}

export const deleteEmployee = (employeeId, page, limit, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/employee/${employeeId}`)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            })
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: {
                    isDeleting: false,
                    employeeId: "",
                    employeeFirstname: "",
                    employeeLastname: "",
                    employeeAddress: "",
                    employeePosition: "",
                    employeePositionId: "",
                    employeeDepartment: "",
                    employeeDepartmentId: "",
                    employeeNumber: "",
                    employeeContactPerson: "",
                    employeeContactNumber: "",
                    employeeOnboardDate: "",
                    employeeRole: "",
                    employeeSalary: "",
                    employeeOT: false,
                    employeeOTpay: "",
                    employeeStatus: "",
                    employeeStartHour: "",
                    employeeEndHour: "",
                    employeeAl: "",
                    record: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageCount: res2.data.count,
                    currentLimit: res2.data.currentLimit,
                    positions: res2.data.positions,
                    departments: res2.data.departments
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createEmployee = (username, password, role, firstname, lastname, address, phone_number, emergency_contact_person, emergency_contact_number, onboard_date, salary_monthly, start_hour, end_hour, post_id, dept_id, ot_hourly_salary, ot_pay_entitled, page, limit, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
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
            const res = await axios.post('/api/employee', body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            })
            dispatch({
                type: CREATE_EMPLOYEE,
                payload: {
                    isCreating: false,
                    employeeId: "",
                    employeeFirstname: "",
                    employeeLastname: "",
                    employeeAddress: "",
                    employeePosition: "",
                    employeePositionId: "",
                    employeeDepartment: "",
                    employeeDepartmentId: "",
                    employeeNumber: "",
                    employeeContactPerson: "",
                    employeeContactNumber: "",
                    employeeOnboardDate: "",
                    employeeRole: "",
                    employeeSalary: "",
                    employeeOT: false,
                    employeeOTpay: "",
                    employeeStatus: "",
                    employeeStartHour: "",
                    employeeEndHour: "",
                    employeeAl: "",
                    employeeUsername: "",
                    employeePassword: "",
                    record: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageCount: res2.data.count,
                    currentLimit: res2.data.currentLimit,
                    positions: res2.data.positions,
                    departments: res2.data.departments
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EMPLOYEE_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleViewing = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/api/employee/${id}`)
            dispatch({
                type: TOGGLE_EMPLOYEE_VIEWING,
                payload: {
                    isViewing: id ? true : false,
                    employeeId: id ? res.data.employee.id : "",
                    employeeFirstname: id ? res.data.employee.firstname : "",
                    employeeLastname: id ? res.data.employee.lastname : "",
                    employeeAddress: id ? res.data.employee.address : "",
                    employeePosition: id ? res.data.employee.post : "",
                    employeePositionId: id ? res.data.employee.post_id : "",
                    employeeDepartment: id ? res.data.employee.name : "",
                    employeeDepartmentId: id ? res.data.employee.dept_id : "",
                    employeeNumber: id ? res.data.employee.phone_number : "",
                    employeeContactPerson: id ? res.data.employee.emergency_contact_person : "",
                    employeeContactNumber: id ? res.data.employee.emerygency_contact_number : "",
                    employeeOnboardDate: id ? res.data.employee.onboard_date : "",
                    employeeRole: id ? res.data.employee.role : "",
                    employeeSalary: id ? res.data.employee.salary_monthly : "",
                    employeeOT: id ? res.data.employee.ot_pay_entitled : false,
                    employeeOTpay: id ? res.data.employee.ot_hourly_salary : "",
                    employeeStatus: id ? res.data.employee.status : "",
                    employeeStartHour: id ? res.data.employee.start_hour : "",
                    employeeEndHour: id ? res.data.employee.end_hour : "",
                    employeeAL: id ? res.data.employee.annual_leave_count : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        let res;
        if (id) res = await axios.get(`/api/employee/${id}`)
        dispatch({
            type: TOGGLE_EMPLOYEE_UPDATING,
            payload: {
                isUpdating: id ? true : false,
                employeeId: id ? res.data.employee.id : "",
                employeeFirstname: id ? res.data.employee.firstname : "",
                employeeLastname: id ? res.data.employee.lastname : "",
                employeeAddress: id ? res.data.employee.address : "",
                employeePosition: id ? res.data.employee.post : "",
                employeePositionId: id ? res.data.employee.post_id : "",
                employeeDepartment: id ? res.data.employee.name : "",
                employeeDepartmentId: id ? res.data.employee.dept_id : "",
                employeeNumber: id ? res.data.employee.phone_number : "",
                employeeContactPerson: id ? res.data.employee.emergency_contact_person : "",
                employeeContactNumber: id ? res.data.employee.emerygency_contact_number : "",
                employeeOnboardDate: id ? res.data.employee.onboard_date : "",
                employeeRole: id ? res.data.employee.role : "",
                employeeSalary: id ? res.data.employee.salary_monthly : "",
                employeeOT: id ? res.data.employee.ot_pay_entitled : false,
                employeeOTpay: id ? res.data.employee.ot_hourly_salary : "",
                employeeStatus: id ? res.data.employee.status : "",
                employeeStartHour: id ? res.data.employee.start_hour : "",
                employeeEndHour: id ? res.data.employee.end_hour : "",
                employeeAL: id ? res.data.employee.annual_leave_count : "",
                employeeUsername: id ? res.data.employee.username : "",
                employeePassword: ""
            }
        })
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/api/employee/${id}`)
            dispatch({
                type: TOGGLE_EMPLOYEE_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    employeeId: id ? res.data.employee.id : "",
                    employeeFirstname: id ? res.data.employee.firstname : "",
                    employeeLastname: id ? res.data.employee.lastname : "",
                    employeePosition: id ? res.data.employee.post : "",
                    employeePositionId: id ? res.data.employee.post_id : "",
                    employeeDepartment: id ? res.data.employee.name : "",
                    employeeDepartmentId: id ? res.data.employee.dept_id : "",
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EMPLOYEE_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const fetchEmployeeByQuery = (queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/employee', {
                params: {
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            })
            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit,
                    positions: res.data.positions,
                    departments: res.data.departments
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetEmployeeQuery = (page, limit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit
                }
            })
            dispatch({
                type: FETCH_EMPLOYEE,
                payload: {
                    record: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit,
                    positions: res.data.positions,
                    departments: res.data.departments
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const selectEmployee = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_EMPLOYEE_SELECTED : REMOVE_FROM_EMPLOYEE_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const selectAllEmployee = (e, rows) => {
    return (dispatch) => {
        rows = rows.map(el => el.id.toString())
        dispatch({
            type: e.target.checked ? ADD_ALL_EMPLOYEE_SELECTED : REMOVE_ALL_EMPLOYEE_SELECTED,
            payload: {
                id: e.target.checked ? rows : []
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EMPLOYEE_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const batchUpdateEmployee = (id, start_hour, end_hour, status, role, ot_pay_entitled, ot_hourly_salary, salary_monthly, page, limit, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const update = {
                id: id,
                start_hour: start_hour,
                end_hour: end_hour,
                status: status,
                role: role,
                ot_pay_entitled: ot_pay_entitled,
                ot_hourly_salary: ot_hourly_salary,
                salary_monthly: salary_monthly
            }
            const res = await axios.put('/api/employee', update)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            })
            dispatch({
                type: BATCH_UPDATE_EMPLOYEE,
                payload: {
                    isBatchUpdating: false,
                    batchUpdateStatus: "",
                    batchUpdateRole: "",
                    batchUpdateStartHour: "",
                    batchUpdateEndHour: "",
                    batchUpdateMonthlySalary: "",
                    batchUpdateOTentitlement: false,
                    batchUpdateOTHourlyPay: "",
                    record: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageCount: res2.data.count,
                    currentLimit: res2.data.currentLimit,
                    positions: res2.data.positions,
                    departments: res2.data.departments
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const batchDeleteEmployee = (id, page, limit, queryText, queryPosition, queryDepartment, queryJoinFrom, queryJoinTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/employee/${id.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/employee', {
                params: {
                    page: page,
                    limit: limit,
                    text: queryText,
                    position: queryPosition,
                    department: queryDepartment,
                    joinFrom: queryJoinFrom,
                    joinTo: queryJoinTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: BATCH_DELETE_EMPLOYEE,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageCount: res2.data.count,
                    currentLimit: res2.data.currentLimit,
                    positions: res2.data.positions,
                    departments: res2.data.departments
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EMPLOYEE_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

