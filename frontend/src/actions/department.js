import { REMOVE_FROM_DEPARTMENT_SELECTED, FETCH_DEPARTMENT, UPDATE_DEPARTMENT, CONFIRM_DEPARTMENT_UPDATE, DELETE_DEPARTMENT, RESET_DEPARTMENT, TOGGLE_CREATE_DEPARTMENT, TOGGLE_DEPARTMENT_FILTERING, RESET_DEPARTMENT_QUERY, FETCH_DEPARTMENT_BY_QUERY, TOGGLE_DEPARTMENT_UPDATING, TOGGLE_DEPARTMENT_DELETING, ADD_TO_DEPARTMENT_SELECTED, REMOVE_ALL_FROM_DEPARTMENT_SELECTED, ADD_ALL_TO_DEPARTMENT_SELECTED, TOGGLE_DEPARTMENT_BATCH_DELETING, BATCH_DELETE_DEPARTMENT } from "../types/department"
import axios from 'axios'
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchDepartment = (page, limit, text) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/department', {
                params: {
                    page: page,
                    limit: limit,
                    text: text
                }
            })

            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit
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

export const confirmDepartmentUpdate = (id, name, description) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
                description: description
            }
            const res = await axios.put(`/department/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch({
                type: CONFIRM_DEPARTMENT_UPDATE,
                payload: {
                    id: res.data.id,
                    name: res.data.name,
                    desc: res.data.desc,
                    isUpdating: false
                }
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

export const gotoNextDepartmentPage = (page, limit, pageCount, queryDepartmentName) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageCount) return;
            const res = await axios.get('/department', {
                params: {
                    page: page + limit,
                    limit: limit,
                    text: queryDepartmentName
                }
            })
            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoPreviousDepartmentPage = (page, limit, queryDepartmentName) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/department', {
                params: {
                    page: page - limit,
                    limit: limit,
                    text: queryDepartmentName
                }
            })

            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    currentLimit: res.data.currentLimit
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
            type: TOGGLE_CREATE_DEPARTMENT,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const handleCreate = (departmentName, departmentDesc) => {
    return async (dispatch) => {
        try {
            const body = {
                name: departmentName,
                desc: departmentDesc
            }
            const res = await axios.post('/department', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch({
                type: TOGGLE_CREATE_DEPARTMENT,
                payload: {
                    isCreating: false,
                    createDepartmentName: "",
                    createDepartmentDesc: ""
                }
            })
            dispatch(fetchDepartment())
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchDepartmentsByEntries = (limit, currentPage, queryDepartmentName) => {
    return async (dispatch) => {
        try {
            console.log(limit, currentPage, queryDepartmentName)
            const res = await axios.get('/department', {
                params: {
                    page: currentPage,
                    limit: limit,
                    text: queryDepartmentName
                }
            })

            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res.data.dept,
                    pageLength: res.data.count,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
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
            type: TOGGLE_DEPARTMENT_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const resetDepartmentQuery = (page, limit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/department', {
                params: {
                    page: page,
                    limit: limit
                }
            })

            dispatch({
                type: RESET_DEPARTMENT_QUERY,
                payload: {
                    isFiltering: false,
                    queryDepartmentName: "",
                    record: res.data.dept,
                    currentPage: res.data.currentPage,
                    currentLimit: res.data.currentLimit,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchDepartmentByQuery = (queryDepartmentName) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/department', {
                params: {
                    text: queryDepartmentName
                }
            })

            dispatch({
                type: FETCH_DEPARTMENT_BY_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.dept,
                    currentPage: res.data.currentPage,
                    currentLimit: res.data.currentLimit,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd
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
            if (id) res = await axios.get(`/department/${id}`)
            dispatch({
                type: TOGGLE_DEPARTMENT_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    departmentId: id ? res.data.id : false,
                    departmentName: id ? res.data.name : false,
                    departmentDesc: id ? res.data.desc : false
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
            if (id) res = await axios.get(`/department/${id}`)
            dispatch({
                type: TOGGLE_DEPARTMENT_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    departmentId: id ? res.data.id : false,
                    departmentName: id ? res.data.name : false,
                    departmentDesc: id ? res.data.desc : false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleDelete = (id, currentPage, currentLimit, queryDepartmentName) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/department/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            dispatch({
                type: TOGGLE_DEPARTMENT_DELETING,
                payload: {
                    isDeleting: false,
                    departmentId: "",
                    departmentName: "",
                    departmentDesc: ""
                }
            })

            const res2 = await axios.get('/department', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryDepartmentName
                }
            })

            dispatch({
                type: FETCH_DEPARTMENT,
                payload: {
                    record: res2.data.dept,
                    currentPage: res2.data.currentPage,
                    currentLimit: res2.data.currentLimit,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.count
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
            type: e.target.checked ? ADD_TO_DEPARTMENT_SELECTED : REMOVE_FROM_DEPARTMENT_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_DEPARTMENT_SELECTED : REMOVE_ALL_FROM_DEPARTMENT_SELECTED,
            payload: {
                id: e.target.checked ? rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DEPARTMENT_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const handleBatchDelete = (selectedRecord, currentPage, currentLimit, queryDepartmentName) => {
    return async (dispatch) => {
        try {

            const res = await axios.delete(`/department/${selectedRecord.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/department', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryDepartmentName
                }
            })

            dispatch({
                type: BATCH_DELETE_DEPARTMENT,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.dept,
                    pageLength: res2.data.count,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    currentLimit: res2.data.currentLimit
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
}