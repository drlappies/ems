import { FETCH_PAYROLL, UPDATE_PAYROLL, ADD_TO_PAYROLL_SELECTED, TOGGLE_PAYROLL_CREATING, TOGGLE_PAYROLL_VIEWING, TOGGLE_PAYROLL_DELETING, TOGGLE_PAYROLL_BATCH_UPDATING, REMOVE_FROM_PAYROLL_SELECTED, TOGGLE_PAYROLL_BATCH_DELETING, TOGGLE_PAYROLL_FILTERTING, RESET_PAYROLL_QUERY, TOGGLE_PAYROLL_UPDATING, ADD_ALL_TO_PAYROLL_SELECTED, RESET_PAYROLL_SELECTED } from "../types/payroll";
import axios from 'axios';
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchPayroll = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/payroll');
            dispatch({
                type: FETCH_PAYROLL,
                payload: {
                    record: res.data.payroll,
                    employeeList: res.data.employee,
                    unselectedEmployee: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updatePayroll = (e, result) => {
    return (dispatch) => {
        let { name, value } = result || e.target;
        if (e.target.type === 'checkbox') value = e.target.checked
        dispatch({
            type: UPDATE_PAYROLL,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const generatePayroll = (employeeId, starting, ending, isOTcaled, isLeaveCaled, isDeductCaled, isBonusCaled, isAllowanceCaled, isReimbursementCaled) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employeeId,
                starting_date: starting,
                ending_date: ending,
                isOTcaled: isOTcaled,
                isLeaveCaled: isLeaveCaled,
                isDeductCaled: isDeductCaled,
                isBonusCaled: isBonusCaled,
                isAllowanceCaled: isAllowanceCaled,
                isReimbursementCaled: isReimbursementCaled
            }
            const res = await axios.post('/payroll', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchPayroll())
            dispatch({
                type: TOGGLE_PAYROLL_CREATING,
                payload: {
                    isCreating: false,
                    employeeId: "",
                    starting: "",
                    ending: "",
                    isOTcaled: false,
                    isLeaveCaled: false,
                    isDeductCaled: false,
                    isBonusCaled: false,
                    isAllowanceCaled: false,
                    isReimbursementCaled: false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        try {
            dispatch({
                type: TOGGLE_PAYROLL_CREATING,
                payload: {
                    isCreating: !isCreating,
                    employeeId: "",
                    starting: "",
                    ending: "",
                    isOTcaled: false,
                    isLeaveCaled: false,
                    isDeductCaled: false,
                    isBonusCaled: false,
                    isAllowanceCaled: false,
                    isReimbursementCaled: false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleViewing = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) {
                res = await axios.get(`/payroll/${id}`)
                window.history.replaceState(null, "", `/payroll/${id}/delete`)
            } else {
                window.history.replaceState(null, "", "/payroll")
            }
            dispatch({
                type: TOGGLE_PAYROLL_VIEWING,
                payload: {
                    isViewing: id ? true : false,
                    from: id ? res.data.from : "",
                    to: id ? res.data.to : "",
                    amount: id ? res.data.amount : "",
                    reimbursement: id ? res.data.reimbursement : "",
                    allowance: id ? res.data.allowance : "",
                    deduction: id ? res.data.deduction : "",
                    bonus: id ? res.data.bonus : "",
                    overtime: id ? res.data.overtime : "",
                    status: id ? res.data.status : "",
                    firstname: id ? res.data.firstname : "",
                    lastname: id ? res.data.lastname : "",
                    payrollId: id ? res.data.id : "",
                    employeeId: id ? res.data.employee_id : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) {
                res = await axios.get(`/payroll/${id}`)
                window.history.replaceState(null, "", `/payroll/${id}/delete`)
            } else {
                window.history.replaceState(null, "", "/payroll")
            }
            dispatch({
                type: TOGGLE_PAYROLL_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    from: id ? res.data.from : "",
                    to: id ? res.data.to : "",
                    amount: id ? res.data.amount : "",
                    reimbursement: id ? res.data.reimbursement : "",
                    allowance: id ? res.data.allowance : "",
                    deduction: id ? res.data.deduction : "",
                    bonus: id ? res.data.bonus : "",
                    overtime: id ? res.data.overtime : "",
                    status: id ? res.data.status : "",
                    firstname: id ? res.data.firstname : "",
                    lastname: id ? res.data.lastname : "",
                    payrollId: id ? res.data.id : "",
                    employeeId: id ? res.data.employee_id : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleDelete = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/payroll/?id=${id}`)
            dispatch(fetchPayroll())
            dispatch({
                type: TOGGLE_PAYROLL_DELETING,
                payload: {
                    isDeleting: false,
                    from: "",
                    to: "",
                    amount: "",
                    reimbursement: "",
                    allowance: "",
                    deduction: "",
                    bonus: "",
                    overtime: "",
                    status: "",
                    firstname: "",
                    lastname: "",
                    payrollId: "",
                    employeeId: ""
                }
            })
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_PAYROLL_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_PAYROLL_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const handleSelect = (e) => {
    return (dispatch) => {
        if (e.target.checked) {
            dispatch({
                type: ADD_TO_PAYROLL_SELECTED,
                payload: {
                    id: e.target.name
                }
            })
        } else {
            dispatch({
                type: REMOVE_FROM_PAYROLL_SELECTED,
                payload: {
                    id: e.target.name
                }
            })
        }
    }
}

export const handleBatchDelete = (rows) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/payroll/${rows.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchPayroll())
            dispatch({
                type: TOGGLE_PAYROLL_BATCH_DELETING,
                payload: {
                    isBatchDeleting: false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleBatchUpdate = (rows, status) => {
    return async (dispatch) => {
        try {
            const body = {
                id: rows,
                status: status
            }
            const res = await axios.put('/payroll', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchPayroll())
            dispatch({
                type: TOGGLE_PAYROLL_BATCH_UPDATING,
                payload: {
                    isBatchUpdating: false
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const handleUpdate = (payrollId, status) => {
    return async (dispatch) => {
        try {
            const body = {
                id: payrollId,
                status: status
            }
            const res = await axios.put('/payroll', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchPayroll())
            dispatch({
                type: TOGGLE_PAYROLL_UPDATING,
                payload: {
                    isUpdating: false,
                    from: "",
                    to: "",
                    amount: "",
                    reimbursement: "",
                    allowance: "",
                    deduction: "",
                    bonus: "",
                    overtime: "",
                    status: "",
                    firstname: "",
                    lastname: "",
                    payrollId: "",
                    employeeId: "",
                    isReimbursementCaled: "",
                    isAllowanceCaled: "",
                    isDeductCaled: "",
                    isBonusCaled: "",
                    isOTcaled: "",
                    isLeaveCaled: ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const handleEntriesChange = (limit, page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/payroll', {
                params: {
                    page: page,
                    limit: limit
                }
            });
            dispatch({
                type: FETCH_PAYROLL,
                payload: {
                    record: res.data.payroll,
                    employeeList: res.data.employee,
                    unselectedEmployee: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchNextPayrollPage = (limit, page, pageLength) => {
    return async (dispatch) => {
        try {
            console.log(limit, page, pageLength)
            if (page + limit >= pageLength) return;
            const res = await axios.get('/payroll', {
                params: {
                    page: page + limit,
                    limit: limit
                }
            })
            dispatch({
                type: FETCH_PAYROLL,
                payload: {
                    record: res.data.payroll,
                    employeeList: res.data.employee,
                    unselectedEmployee: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousPayrollPage = (limit, page) => {
    return async (dispatch) => {
        try {
            if (page - limit <= 0) page = 0;
            const res = await axios.get('/payroll', {
                params: {
                    page: page - limit,
                    limit: limit
                }
            })
            dispatch({
                type: FETCH_PAYROLL,
                payload: {
                    record: res.data.payroll,
                    employeeList: res.data.employee,
                    unselectedEmployee: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
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
            type: TOGGLE_PAYROLL_FILTERTING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const resetQuery = (page, limit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/payroll', {
                params: {
                    page: page,
                    limit: limit
                }
            })

            dispatch({
                type: RESET_PAYROLL_QUERY,
                payload: {
                    record: res.data.payroll,
                    employeeList: res.data.employee,
                    unselectedEmployee: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleSearch = (page, limit, queryFrom, queryTo, queryText, queryStatus, queryAmountFrom, queryAmountTo, queryEmployeeId, queryIsReimbursementCaled, queryIsAllowanceCaled, queryIsDeductionCaled, queryIsBonusCaled, queryIsOvertimeCaled, queryIsLeaveCaled) => {
    console.log(queryIsLeaveCaled)
    return async (dispatch) => {
        try {
            const res = await axios.get('/payroll', {
                params: {
                    page: page,
                    limit: limit,
                    from: queryFrom,
                    to: queryTo,
                    text: queryText,
                    status: queryStatus,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    employee_id: queryEmployeeId,
                    isReimbursementCaled: queryIsReimbursementCaled,
                    isAllowanceCaled: queryIsAllowanceCaled,
                    isBonusCaled: queryIsBonusCaled,
                    isDeductCaled: queryIsDeductionCaled,
                    isOvertimeCaled: queryIsOvertimeCaled,
                    isLeaveCaled: queryIsLeaveCaled
                }
            })

            dispatch({
                type: FETCH_PAYROLL,
                payload: {
                    record: res.data.payroll,
                    employeeList: res.data.employee,
                    unselectedEmployee: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/payroll/${id}`)
            dispatch({
                type: TOGGLE_PAYROLL_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    from: id ? res.data.from : "",
                    to: id ? res.data.to : "",
                    amount: id ? res.data.amount : "",
                    reimbursement: id ? res.data.reimbursement : "",
                    allowance: id ? res.data.allowance : "",
                    deduction: id ? res.data.deduction : "",
                    bonus: id ? res.data.bonus : "",
                    overtime: id ? res.data.overtime : "",
                    status: id ? res.data.status : "",
                    firstname: id ? res.data.firstname : "",
                    lastname: id ? res.data.lastname : "",
                    payrollId: id ? res.data.id : "",
                    employeeId: id ? res.data.employee_id : "",
                    isReimbursementCaled: id ? res.data.is_reimbursement_calculated : false,
                    isAllowanceCaled: id ? res.data.is_allowance_calculated : false,
                    isDeductCaled: id ? res.data.is_deduction_calculated : false,
                    isBonusCaled: id ? res.data.is_bonus_calculated : false,
                    isOTcaled: id ? res.data.is_overtime_calculated : false,
                    isLeaveCaled: id ? res.data.is_leave_calculated : false,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        if (e.target.checked) {
            rows = rows.map(el => el.id.toString())
            dispatch({
                type: ADD_ALL_TO_PAYROLL_SELECTED,
                payload: {
                    selectedRecord: rows
                }
            })
        } else {
            dispatch({
                type: RESET_PAYROLL_SELECTED
            })
        }
    }
}