import { FETCH_BONUS, FETCH_SPECIFIC_BONUS, UPDATE_BONUS, RESET_BONUS } from '../types/bonus';
import axios from 'axios'

export const fetchBonus = (page, dateFrom, dateTo, amountFrom, amountTo, text) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0;
            const res = await axios.get('/bonus', {
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
                type: FETCH_BONUS,
                payload: {
                    record: res.data.bonus,
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

export const fetchNextBonusPage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/bonus', {
                params: {
                    page: page + 15
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
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousBonusPage = (page) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/bonus', {
                params: {
                    page: page - 15
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
                    pageLength: res.data.pageLength
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchSpecificBonus = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/bonus/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_BONUS,
                payload: {
                    bonusId: res.data.bonus.id,
                    employeeId: res.data.bonus.employee_id,
                    reason: res.data.bonus.reason,
                    amount: res.data.bonus.amount,
                    date: res.data.bonus.date,
                    firstname: res.data.bonus.firstname,
                    lastname: res.data.bonus.lastname,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmBonusUpdate = (id, employeeId, reason, date, amount) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                date: date,
                amount: amount
            }
            await axios.put(`/bonus/${id}`, body)
            dispatch(fetchBonus())
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateBonus = (e) => {
    return (dispatch) => {
        const { name, value } = e.target
        dispatch({
            type: UPDATE_BONUS,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const deleteBonus = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/bonus/${id}`)
            dispatch(fetchBonus())
            dispatch({ type: RESET_BONUS })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetBonus = () => {
    return (dispatch) => {
        dispatch({ type: RESET_BONUS })
    }
}

export const createBonus = (employeeId, reason, amount, date) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                amount: amount,
                date: date
            }
            await axios.post('/bonus', body)
            dispatch(fetchBonus())
        } catch (err) {
            console.log(err)
        }
    }
}