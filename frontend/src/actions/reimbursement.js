import { FETCH_REIMBURSEMENT, FETCH_SPECIFIC_REIMBURSEMENT, RESET_REIMBURSEMENT } from "../types/reimbursement";
import axios from 'axios';

export const fetchReimbursement = (page) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            const res = await axios.get('/reimbursement', {
                params: {
                    page: page
                }
            })
            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
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

export const fetchSpecificReimbursement = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/reimbursement/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_REIMBURSEMENT,
                payload: {
                    id: res.data.reimbursement.id,
                    employeeId: res.data.reimbursement.employee_id,
                    reason: res.data.reimbursement.reason,
                    status: res.data.reimbursement.status,
                    amount: res.data.reimbursement.amount,
                    date: res.data.reimbursement.date,
                    firstname: res.data.reimbursement.firstname,
                    lastname: res.data.reimbursement.lastname
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetReimbursement = () => {
    return (dispatch) => {
        dispatch({ type: RESET_REIMBURSEMENT })
    }
}

export const updateReimbursement = (id, status) => {
    return async (dispatch) => {
        try {
            const body = {
                status: status
            }
            await axios.put(`/reimbursement/${id}`, body)
            dispatch(fetchReimbursement())
            dispatch(resetReimbursement())
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoNextReimbursementPage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/reimbursement', {
                params: {
                    page: page + 15
                }
            })
            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
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

export const gotoPreviousReimbursementPage = (page) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/reimbursement', {
                params: {
                    page: page - 15
                }
            })
            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
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

export const fetchReimbursementByQuery = (text, from, to, status) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/reimbursement', {
                params: {
                    page: 0,
                    text: text,
                    from: from,
                    to: to,
                    status: status
                }
            })
            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
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
