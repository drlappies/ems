import { FETCH_ALLOWANCE, FETCH_SPECIFIC_ALLOWANCE, UPDATE_ALLOWANCE, RESET_ALLOWANCE, ENTITLE_TO_ALLOWANCE, DISENTITLE_FROM_ALLOWANCE } from "../types/allowance";
import axios from 'axios';

export const fetchAllowance = (page) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            const res = await axios.get('/allowance', {
                params: {
                    page: page,
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance.allowance,
                    currentPage: res.data.allowance.currentPage,
                    currentPageStart: res.data.allowance.currentPageStart,
                    currentPageEnd: res.data.allowance.currentPageEnd,
                    pageLength: res.data.allowance.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchSpecificAllowance = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/allowance/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_ALLOWANCE,
                payload: {
                    allowanceId: res.data.allowance.id,
                    allowanceName: res.data.allowance.name,
                    allowanceDescription: res.data.allowance.description,
                    allowanceAmount: res.data.allowance.amount,
                    allowanceStatus: res.data.allowance.status,
                    entitledEmployee: res.data.allowance_employee,
                    notEntitledEmployee: res.data.employee
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateAllowance = (e) => {
    return (dispatch) => {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        dispatch({
            type: UPDATE_ALLOWANCE,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const confirmAllowanceUpdate = (id, name, description, amount, status) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
                description: description,
                amount: amount,
                status: status
            }
            await axios.put(`/allowance/${id}`, body)
            dispatch(fetchAllowance())
            dispatch(resetAllowance())
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteAllowance = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/allowance/${id}`)
            dispatch(fetchAllowance())
            dispatch(resetAllowance())
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetAllowance = () => {
    return (dispatch) => {
        dispatch({ type: RESET_ALLOWANCE })
    }
}

export const addToEntitleList = (employeeId, allowanceId, firstname, lastname) => {
    return async (dispatch) => {
        try {
            const body = { employeeId: employeeId }
            await axios.post(`/allowance/entitlement/${allowanceId}`, body)
            dispatch({
                type: ENTITLE_TO_ALLOWANCE,
                payload: {
                    id: employeeId,
                    firstname: firstname,
                    lastname: lastname
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const removeFromEntitleList = (employeeId, allowanceId, firstname, lastname) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/allowance/entitlement/${allowanceId}/employee/${employeeId}`)
            dispatch({
                type: DISENTITLE_FROM_ALLOWANCE,
                payload: {
                    id: employeeId,
                    firstname: firstname,
                    lastname: lastname
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoNextAllowancePage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/allowance', {
                params: {
                    page: page + 15
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance.allowance,
                    currentPage: res.data.allowance.currentPage,
                    currentPageStart: res.data.allowance.currentPageStart,
                    currentPageEnd: res.data.allowance.currentPageEnd,
                    pageLength: res.data.allowance.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoPreviousAllowancePage = (page) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/allowance', {
                params: {
                    page: page - 15
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance.allowance,
                    currentPage: res.data.allowance.currentPage,
                    currentPageStart: res.data.allowance.currentPageStart,
                    currentPageEnd: res.data.allowance.currentPageEnd,
                    pageLength: res.data.allowance.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createAllowance = (name, desc, amount, interval, rma, rate) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
                description: desc,
                amount: amount,
                interval: interval,
                rma: rma,
                rate: rate
            }
            await axios.post('/allowance', body)
            dispatch(fetchAllowance())
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchAllowanceByQuery = (amountFrom, amountTo, status, query) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/allowance', {
                params: {
                    page: 0,
                    amountFrom: amountFrom,
                    amountTo: amountTo,
                    status: status,
                    query: query
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance.allowance,
                    currentPage: res.data.allowance.currentPage,
                    currentPageStart: res.data.allowance.currentPageStart,
                    currentPageEnd: res.data.allowance.currentPageEnd,
                    pageLength: res.data.allowance.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}