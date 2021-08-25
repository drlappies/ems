import { FETCH_POSITION, FETCH_SPECIFIC_POSITION, RESET_POSITION, UPDATE_POSITION, DELETE_POSITION } from "../types/position"
import axios from 'axios'

export const fetchPositions = (page, name) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            if (!name) name = ""
            const res = await axios.get('/position', {
                params: {
                    page: page,
                    name: name
                }
            })
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position.position,
                    currentPage: res.data.position.currentPage,
                    currentPageStart: res.data.position.currentPageStart,
                    currentPageEnd: res.data.position.currentPageEnd,
                    pageLength: res.data.position.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchSpecificPosition = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/position/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_POSITION,
                payload: {
                    positionId: res.data.position.id,
                    positionName: res.data.position.post
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetPosition = () => {
    return (dispatch) => {
        dispatch({ type: RESET_POSITION })
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

export const confirmPositionUpdate = (id, name) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name
            }
            await axios.put(`/position/${id}`, body)
            dispatch(resetPosition())
            dispatch(fetchPositions())
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmPositionDelete = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/position/${id}`)
            dispatch({
                type: DELETE_POSITION,
                payload: {
                    positionId: res.data.position.id,
                    positionName: res.data.position.positionName
                }
            })
            dispatch(resetPosition())
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoNextPositionPage = (page, pageCount) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            if (page + 15 >= pageCount) return;
            const res = await axios.get('/position', {
                params: {
                    page: page + 15
                }
            })
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position.position,
                    currentPage: res.data.position.currentPage,
                    currentPageStart: res.data.position.currentPageStart,
                    currentPageEnd: res.data.position.currentPageEnd,
                    pageLength: res.data.position.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoPreviousPositionPage = (page) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0;
            if (page <= 0) return;
            const res = await axios.get('/position', {
                params: {
                    page: page - 15
                }
            })
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position.position,
                    currentPage: res.data.position.currentPage,
                    currentPageStart: res.data.position.currentPageStart,
                    currentPageEnd: res.data.position.currentPageEnd,
                    pageLength: res.data.position.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPositionByQuery = (name) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/position', {
                params: {
                    page: 0,
                    name: name
                }
            })
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position.position,
                    currentPage: res.data.position.currentPage,
                    currentPageStart: res.data.position.currentPageStart,
                    currentPageEnd: res.data.position.currentPageEnd,
                    pageLength: res.data.position.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createPosition = (name) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name
            }
            await axios.post('/position', body)
            dispatch(fetchPositions())
            dispatch(resetPosition())
        } catch (err) {
            console.log(err)
        }
    }
}