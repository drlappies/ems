import { FETCH_DEPARTMENT, UPDATE_DEPARTMENT, FETCH_SPECIFIC_DEPARTMENT, CONFIRM_DEPARTMENT_UPDATE, DELETE_DEPARTMENT, RESET_DEPARTMENT, CREATE_DEPARTMENT } from "../types/department"
import axios from 'axios'

export const fetchDepartment = (page, name, description) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            const res = await axios.get('/department', {
                params: {
                    page: page,
                    name: name,
                    description: description
                }
            })
            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateDepartment = (e) => {
    return (dispatch) => {
        const { name, value } = e.target
        dispatch({
            type: UPDATE_DEPARTMENT,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const fetchSpecificDepartment = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/department/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_DEPARTMENT,
                payload: {
                    id: res.data.dept.id,
                    name: res.data.dept.name,
                    desc: res.data.dept.description
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmDepartmentUpdate = (id, name, description) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
                description: description
            }
            const res = await axios.put(`/department/${id}`, body)
            dispatch({
                type: CONFIRM_DEPARTMENT_UPDATE,
                payload: {
                    id: res.data.dept.id,
                    name: res.data.dept.name,
                    desc: res.data.dept.description
                }
            })
            dispatch({
                type: RESET_DEPARTMENT
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteDepartment = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/department/${id}`)
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: {
                    id: res.data.dept.id
                }
            })
            dispatch({
                type: RESET_DEPARTMENT
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetDepartment = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: RESET_DEPARTMENT
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoNextDepartmentPage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/department', {
                params: {
                    page: page + 15
                }
            })
            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoPreviousDepartmentPage = (page) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/department', {
                params: {
                    page: page - 15
                }
            })
            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createDepartment = (name, desc) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
                description: desc
            }
            await axios.post('/department', body)
            dispatch(fetchDepartment())
        } catch (err) {
            console.log(err)
        }
    }
}