import { FETCH_POSITION, UPDATE_POSITION, TOGGLE_POSITION_CREATING, ADD_TO_POSITION_SELECTED, REMOVE_FROM_POSITION_SELECTED, ADD_ALL_TO_POSITION_SELECTED, REMOVE_ALL_FROM_POSITION_SELECTED, TOGGLE_POSITION_BATCH_DELETING, TOGGLE_POSITION_UPDATING, TOGGLE_POSITION_DELETING, TOGGLE_POSITION_FILTERING, RESET_POSITION_QUERY, FETCH_POSITION_BY_QUERY, UPDATE_POSITION_RECORD, DELETE_POSITION, BATCH_DELETE_POSITION, CREATE_POSITION } from "../types/position"
import axios from 'axios'
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchPositions = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/position')
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position,
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

export const updatePosition = (e) => {
    return (dispatch) => {
        const { name, value } = e.target
        dispatch({
            type: UPDATE_POSITION,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const confirmPositionUpdate = (id, name, page, limit, queryText) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name
            }
            const res = await axios.put(`/api/position/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/position', {
                params: {
                    page: page,
                    limit: limit,
                    name: queryText
                }
            })
            dispatch({
                type: UPDATE_POSITION_RECORD,
                payload: {
                    isUpdating: false,
                    record: res2.data.position,
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

export const confirmPositionDelete = (id, page, limit, queryText) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/position/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get(`/api/position`, {
                params: {
                    page: page,
                    limit: limit,
                    name: queryText
                }
            })

            dispatch({
                type: DELETE_POSITION,
                payload: {
                    isDeleting: false,
                    record: res2.data.position,
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

export const gotoNextPositionPage = (page, pageCount, limit, queryText) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageCount) return;
            const res = await axios.get('/api/position', {
                params: {
                    page: page + limit,
                    limit: limit,
                    name: queryText
                }
            })
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position,
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

export const gotoPreviousPositionPage = (page, limit, name) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/api/position', {
                params: {
                    page: page - limit,
                    limit: limit,
                    name: name
                }
            })
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position,
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

export const fetchPositionByQuery = (page, limit, queryText) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/position', {
                params: {
                    page: page,
                    limit: limit,
                    name: queryText
                }
            })

            dispatch({
                type: FETCH_POSITION_BY_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.position,
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

export const createPosition = (name, page, limit, queryText) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
            }
            const res = await axios.post('/api/position', body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/position', {
                params: {
                    page: page,
                    limit: limit,
                    name: queryText
                }
            })
            dispatch({
                type: CREATE_POSITION,
                payload: {
                    isCreating: false,
                    record: res2.data.position,
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

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_POSITION_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const handleSelect = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_POSITION_SELECTED : REMOVE_FROM_POSITION_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_POSITION_SELECTED : REMOVE_ALL_FROM_POSITION_SELECTED,
            payload: {
                id: e.target.checked ? rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_POSITION_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const batchDeletePosition = (id, page, limit, queryText) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/position/${id.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/position', {
                params: {
                    page: page,
                    limit: limit,
                    name: queryText
                }
            })
            dispatch({
                type: BATCH_DELETE_POSITION,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.position,
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

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        let res;
        if (id) res = await axios.get(`/api/position/${id}`)
        dispatch({
            type: TOGGLE_POSITION_UPDATING,
            payload: {
                isUpdating: id ? true : false,
                positionId: id ? res.data.position.id : "",
                positionName: id ? res.data.position.post : ""
            }
        })
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        let res;
        if (id) res = await axios.get(`/api/position/${id}`)
        dispatch({
            type: TOGGLE_POSITION_DELETING,
            payload: {
                isDeleting: id ? true : false,
                positionId: id ? res.data.position.id : "",
                positionName: id ? res.data.position.post : ""
            }
        })
    }
}

export const fetchByEntries = (limit, currentPage, pageLength, queryText) => {
    return async (dispatch) => {
        try {
            console.log(limit)
            const res = await axios.get('/api/position', {
                params: {
                    page: currentPage,
                    limit: limit,
                    pageLength: pageLength,
                    name: queryText
                }
            })

            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position,
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
            type: TOGGLE_POSITION_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const resetPositionQuery = (page, limit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/position', {
                params: {
                    page: page,
                    limit: limit
                }
            })

            dispatch({
                type: RESET_POSITION_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.position,
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