import { FETCH_BONUS, UPDATE_BONUS, FETCH_BONUS_BY_ENTRIES, TOGGLE_BONUS_CREATING, TOGGLE_BONUS_UPDATING, CREATE_BONUS, TOGGLE_BONUS_FILTERING, FETCH_BONUS_BY_FILTER, RESET_BONUS_FILTER, CONFIRM_BONUS_UPDATE, ADD_TO_BONUS_SELECTED, REMOVE_FROM_BONUS_SELECTED, ADD_ALL_TO_BONUS_SELECTED, REMOVE_ALL_FROM_BONUS_SELECTED, TOGGLE_BONUS_BATCH_UPDATING, BATCH_UPDATE_BONUS, TOGGLE_BONUS_BATCH_DELETING, BATCH_DELETE_BONUS, TOGGLE_BONUS_DELETING, DELETE_BONUS } from '../types/bonus';
import axios from 'axios'
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchBonus = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/bonus')
            dispatch({
                type: FETCH_BONUS,
                payload: {
                    record: res.data.bonus,
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

export const fetchNextBonusPage = (currentPage, currentLimit, pageLength, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            if (currentPage + currentLimit > pageLength) return;
            const res = await axios.get('/bonus', {
                params: {
                    page: currentPage + currentLimit,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo
                }
            })
            dispatch({
                type: FETCH_BONUS,
                payload: {
                    record: res.data.bonus,
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

export const fetchPreviousBonusPage = (currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            if (currentPage <= 0) return;
            const res = await axios.get('/bonus', {
                params: {
                    page: currentPage + currentLimit,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo
                }
            })
            dispatch({
                type: FETCH_BONUS,
                payload: {
                    record: res.data.bonus,
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

export const confirmBonusUpdate = (id, employeeId, reason, date, amount, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                date: date,
                amount: amount
            }
            const res = await axios.put(`/bonus/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/bonus', {
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
                type: CONFIRM_BONUS_UPDATE,
                payload: {
                    isUpdating: false,
                    record: res2.data.bonus,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateBonus = (e, result) => {
    return (dispatch) => {
        const { name, value } = result || e.target
        dispatch({
            type: UPDATE_BONUS,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const deleteBonus = (id, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/bonus/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/bonus', {
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
                type: DELETE_BONUS,
                payload: {
                    isDeleting: false,
                    record: res2.data.bonus,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    bonusId: "",
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

export const createBonus = (employeeId, reason, amount, date, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                amount: amount,
                date: date
            }
            const res = await axios.post('/bonus', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/bonus', {
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
                type: CREATE_BONUS,
                payload: {
                    isCreating: false,
                    record: res2.data.bonus,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchBonusByEntries = (currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/bonus', {
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
                type: FETCH_BONUS_BY_ENTRIES,
                payload: {
                    record: res.data.bonus,
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
            if (id) res = await axios.get(`/bonus/${id}`)
            dispatch({
                type: TOGGLE_BONUS_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    bonusId: id ? res.data.bonus.id : "",
                    employeeId: id ? res.data.bonus.employee_id : "",
                    reason: id ? res.data.bonus.reason : "",
                    amount: id ? res.data.bonus.amount : "",
                    date: id ? `${new Date(res.data.bonus.date).getFullYear()}-${new Date(res.data.bonus.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(res.data.bonus.date).toLocaleDateString('en-US', { day: "2-digit" })}` : "",
                    firstname: id ? res.data.bonus.firstname : "",
                    lastname: id ? res.data.bonus.lastname : "",
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
            type: TOGGLE_BONUS_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_BONUS_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const fetchBonusByFilter = (queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo, queryEmployeeId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/bonus', {
                params: {
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    employee_id: queryEmployeeId
                }
            })

            dispatch({
                type: FETCH_BONUS_BY_FILTER,
                payload: {
                    isFiltering: false,
                    record: res.data.bonus,
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

export const resetBonusFilter = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/bonus')
            dispatch({
                type: RESET_BONUS_FILTER,
                payload: {
                    isFiltering: false,
                    record: res.data.bonus,
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

export const handleSelect = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_BONUS_SELECTED : REMOVE_FROM_BONUS_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_BONUS_SELECTED : REMOVE_ALL_FROM_BONUS_SELECTED,
            payload: {
                id: e.target.checked ? rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_BONUS_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const batchUpdateBonus = (selectedRecord, updateEmployeeId, updateDate, updateReason, updateAmount, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const body = {
                id: selectedRecord,
                employee_id: updateEmployeeId,
                date: updateDate,
                reason: updateReason,
                amount: updateAmount,
            }

            const res = await axios.put('/bonus', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/bonus', {
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
                type: BATCH_UPDATE_BONUS,
                payload: {
                    isBatchUpdating: false,
                    record: res2.data.bonus,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    updateEmployeeId: "",
                    updateDate: "",
                    updateReason: "",
                    updateAmount: "",
                    selectedRecord: []
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
            type: TOGGLE_BONUS_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const batchDeleteBonus = (selectedRecord, currentPage, currentLimit, queryText, queryDateFrom, queryDateTo, queryAmountFrom, queryAmountTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/bonus/${selectedRecord.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/bonus', {
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
                type: BATCH_DELETE_BONUS,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.bonus,
                    employeeRecord: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    selectedRecord: []
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
            if (id) res = await axios.get(`/bonus/${id}`)
            dispatch({
                type: TOGGLE_BONUS_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    bonusId: id ? res.data.bonus.id : "",
                    employeeId: id ? res.data.bonus.employee_id : "",
                    reason: id ? res.data.bonus.reason : "",
                    amount: id ? res.data.bonus.amount : "",
                    date: id ? `${new Date(res.data.bonus.date).getFullYear()}-${new Date(res.data.bonus.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(res.data.bonus.date).toLocaleDateString('en-US', { day: "2-digit" })}` : "",
                    firstname: id ? res.data.bonus.firstname : "",
                    lastname: id ? res.data.bonus.lastname : "",
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}