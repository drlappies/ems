import { CONFIRM_UPDATE_DEDUCTION, CREATE_DEDUCTION, DELETE_DEDUCTION, FETCH_DEDUCTION, FETCH_DEDUCTION_BY_ENTRIES, FETCH_DEDUCTION_BY_FILTER, RESET_DEDUCTION_FILTER, SELECT_ALL_DEDUCTION, SELECT_DEDUCTION, TOGGLE_DEDUCTION_CREATING, TOGGLE_DEDUCTION_DELETING, TOGGLE_DEDUCTION_FILTERING, TOGGLE_DEDUCTION_UPDATING, UNSELECT_ALL_DEDUCTION, UNSELECT_DEDUCTION, UPDATE_DEDUCTION, TOGGLE_DEDUCTION_BATCH_UPDATING, TOGGLE_DEDUCTION_BATCH_DELETING, BATCH_UPDATE_DEDUCTION } from '../types/deduction'
import axios from 'axios';
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchDeduction = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/deduction')
            dispatch({
                type: FETCH_DEDUCTION,
                payload: {
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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

export const updateDeduction = (e, result) => {
    return (dispatch) => {
        const { name, value } = result || e.target
        dispatch({
            type: UPDATE_DEDUCTION,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const confirmDeductionUpdate = (deductionId, employeeId, reason, amount, date, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const body = {
                id: deductionId,
                employeeId: employeeId,
                reason: reason,
                amount: amount,
                date: date
            }
            const res = await axios.put(`/deduction/${deductionId}`, body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/deduction', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo
                }
            })
            dispatch({
                type: CONFIRM_UPDATE_DEDUCTION,
                payload: {
                    isUpdating: false,
                    record: res2.data.deduction,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    deductionId: "",
                    employeeId: "",
                    reason: "",
                    amount: "",
                    date: "",
                    firstname: "",
                    lastname: "",
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteDeduction = (id, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/deduction/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/deduction', {
                page: currentPage + currentLimit,
                limit: currentLimit,
                dateFrom: queryDateFrom,
                dateTo: queryDateTo,
                amountFrom: queryAmountFrom,
                amountTo: queryAmountTo,
                text: queryText
            })
            dispatch({
                type: DELETE_DEDUCTION,
                payload: {
                    isDeleting: false,
                    record: res2.data.deduction,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    deductionId: "",
                    employeeId: "",
                    reason: "",
                    amount: "",
                    date: "",
                    firstname: "",
                    lastname: "",
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createDeduction = (employeeId, reason, amount, date, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                amount: amount,
                date: date,
            }
            const res = await axios.post('/deduction', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/deduction', {
                page: currentPage + currentLimit,
                limit: currentLimit,
                dateFrom: queryDateFrom,
                dateTo: queryDateTo,
                amountFrom: queryAmountFrom,
                amountTo: queryAmountTo,
                text: queryText
            })
            dispatch({
                type: CREATE_DEDUCTION,
                payload: {
                    isCreating: false,
                    record: res2.data.deduction,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    createEmployeeId: "",
                    createReason: "",
                    createAmount: "",
                    createDate: ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchNextDeductionPage = (currentPage, currentLimit, pageLength, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            if (currentPage + currentLimit > pageLength) return;
            const res = await axios.get('/deduction', {
                page: currentPage + currentLimit,
                limit: currentLimit,
                dateFrom: queryDateFrom,
                dateTo: queryDateTo,
                amountFrom: queryAmountFrom,
                amountTo: queryAmountTo,
                text: queryText
            })

            dispatch({
                type: FETCH_DEDUCTION,
                payload: {
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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

export const fetchPreviousDeductionPage = (currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            if (currentPage <= 0) return;
            const res = await axios.get('/deduction', {
                params: {
                    page: currentPage - currentLimit,
                    limit: currentLimit,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    text: queryText
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
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchDeductionByEntries = (currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/deduction', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    text: queryText
                }
            })

            dispatch({
                type: FETCH_DEDUCTION_BY_ENTRIES,
                payload: {
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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
            if (id) res = await axios.get(`/deduction/${id}`)
            dispatch({
                type: TOGGLE_DEDUCTION_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    deductionId: id ? res.data.deduction.id : "",
                    employeeId: id ? res.data.deduction.employee_id : "",
                    reason: id ? res.data.deduction.reason : "",
                    amount: id ? res.data.deduction.amount : "",
                    date: id ? `${new Date(res.data.deduction.date).getFullYear()}-${new Date(res.data.deduction.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(res.data.deduction.date).toLocaleDateString('en-US', { day: "2-digit" })}` : "",
                    firstname: id ? res.data.deduction.firstname : "",
                    lastname: id ? res.data.deduction.lastname : ""
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
            if (id) res = await axios.get(`/deduction/${id}`)
            dispatch({
                type: TOGGLE_DEDUCTION_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    deductionId: id ? res.data.deduction.id : "",
                    employeeId: id ? res.data.deduction.employee_id : "",
                    reason: id ? res.data.deduction.reason : "",
                    amount: id ? res.data.deduction.amount : "",
                    date: id ? `${new Date(res.data.deduction.date).getFullYear()}-${new Date(res.data.deduction.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(res.data.deduction.date).toLocaleDateString('en-US', { day: "2-digit" })}` : "",
                    firstname: id ? res.data.deduction.firstname : "",
                    lastname: id ? res.data.deduction.lastname : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DEDUCTION_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DEDUCTION_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const fetchDeductionByFilter = (queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/deduction', {
                params: {
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo
                }
            })

            dispatch({
                type: FETCH_DEDUCTION_BY_FILTER,
                payload: {
                    isFiltering: false,
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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

export const resetDeductionFilter = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/deduction')
            dispatch({
                type: RESET_DEDUCTION_FILTER,
                payload: {
                    isFiltering: false,
                    record: res.data.deduction,
                    employeeRecord: res.data.employee,
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

export const selectDeduction = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? SELECT_DEDUCTION : UNSELECT_DEDUCTION,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const selectAllDeduction = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? SELECT_ALL_DEDUCTION : UNSELECT_ALL_DEDUCTION,
            payload: {
                id: e.target.checked ? rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DEDUCTION_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DEDUCTION_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const batchUpdateDeduction = (selectedRecord, updateEmployeeId, updateDate, updateReason, updateAmount, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const body = {
                id: selectedRecord,
                employee_id: updateEmployeeId,
                date: updateDate,
                reason: updateReason,
                amount: updateAmount
            }
            const res = await axios.put('/deduction', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/deduction', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    text: queryText
                }
            })

            dispatch({
                type: BATCH_UPDATE_DEDUCTION,
                payload: {
                    isBatchUpdating: false,
                    record: res2.data.deduction,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    updateEmployeeId: "",
                    updateDate: "",
                    updateReason: "",
                    updateAmount: ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}