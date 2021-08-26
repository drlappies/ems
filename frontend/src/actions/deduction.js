import { FETCH_DEDUCTION, FETCH_SPECIFIC_DEDUCTION, RESET_DEDUCTION, UPDATE_DEDUCTION } from '../types/deduction'
import axios from 'axios';

export const fetchDeduction = (page, dateFrom, dateTo, amountFrom, amountTo, text) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            const res = await axios.get('/deduction', {
                params: {
                    page: page,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    amountFrom: amountFrom,
                    amountTo: amountTo,
                    text: text
                }
            })
            dispatch({
                type: FETCH_DEDUCTION,
                payload: {
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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

export const fetchSpecificDeduction = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/deduction/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_DEDUCTION,
                payload: {
                    deductionId: res.data.deduction.id,
                    employeeId: res.data.deduction.employee_id,
                    reason: res.data.deduction.reason,
                    amount: res.data.deduction.amount,
                    date: res.data.deduction.date,
                    firstname: res.data.deduction.firstname,
                    lastname: res.data.deduction.lastname
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetDeduction = () => {
    return (dispatch) => {
        dispatch({ type: RESET_DEDUCTION })
    }
}

export const updateDeduction = (e) => {
    return (dispatch) => {
        const { name, value } = e.target
        dispatch({
            type: UPDATE_DEDUCTION,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const confirmDeductionUpdate = (deductionId, employeeId, reason, amount, date) => {
    return async (dispatch) => {
        try {
            const body = {
                id: deductionId,
                employeeId: employeeId,
                reason: reason,
                amount: amount,
                date: date
            }
            await axios.put(`/deduction/${deductionId}`, body)
            dispatch(fetchDeduction())
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteDeduction = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/deduction/${id}`)
            dispatch(fetchDeduction())
        } catch (err) {
            console.log(err)
        }
    }
}

export const createDeduction = (employeeId, reason, amount, date) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                amount: amount,
                date: date,
            }
            await axios.post('/deduction', body)
            dispatch(fetchDeduction())
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchNextDeductionPage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/deduction', {
                params: {
                    page: page + 15
                }
            })

            dispatch({
                type: FETCH_DEDUCTION,
                payload: {
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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

export const fetchPreviousDeductionPage = (page) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/deduction', {
                params: {
                    page: page - 15
                }
            })

            dispatch({
                type: FETCH_DEDUCTION,
                payload: {
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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