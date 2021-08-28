import { FETCH_PAYROLL, UPDATE_PAYROLL, RESET_PAYROLL, FETCH_SPECIFIC_PAYROLL } from "../types/payroll";
import axios from 'axios';

export const fetchPayroll = (page, from, to, name) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            const res = await axios.get('/payroll', {
                params: {
                    page: page,
                    from: from,
                    to: to,
                    name: name
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
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchNextPayrollPage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/payroll', {
                params: {
                    page: page + 15
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
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousPayrollPage = (page) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/payroll', {
                params: {
                    page: page - 15
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
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchSpecificPayroll = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/payroll/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_PAYROLL,
                payload: {
                    from: res.data.from,
                    to: res.data.to,
                    amount: res.data.amount,
                    reimbursement: res.data.reimbursement,
                    allowance: res.data.allowance,
                    deduction: res.data.deduction,
                    bonus: res.data.bonus,
                    overtime: res.data.overtime,
                    status: res.data.status,
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    payrollId: res.data.id,
                    employeeId: res.data.employee_id
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createPayroll = (employeeId, starting, ending) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                starting: starting,
                ending: ending
            }
            await axios.post('/payroll', body)
            dispatch(resetPayroll())
            dispatch(fetchPayroll())
        } catch (err) {
            console.log(err)
        }
    }
}

export const updatePayroll = (e) => {
    return (dispatch) => {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        dispatch({
            type: UPDATE_PAYROLL,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const resetPayroll = () => {
    return (dispatch) => {
        dispatch({ type: RESET_PAYROLL })
    }
}

export const deletePayroll = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/payroll/${id}`)
            dispatch(resetPayroll())
            dispatch(fetchPayroll())
        } catch (err) {
            console.log(err)
        }
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
            await axios.post('/payroll', body)
            dispatch(fetchPayroll())
        } catch (err) {
            console.log(err)
        }
    }
}
