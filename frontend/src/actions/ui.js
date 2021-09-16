import { SUCCESS, ERROR, DISMISS, SIDEBAR, RESET } from "../types/ui"

export const popMessage = (message, type) => {
    return (dispatch) => {
        dispatch({
            type: type,
            payload: message
        })
    }
}

export const popSuccessMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: SUCCESS,
            payload: message
        })
    }
}

export const popErrorMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: ERROR,
            payload: message
        })
    }
}

export const dismissMessage = () => {
    return (dispatch) => {
        dispatch({ type: DISMISS })
    }
}

export const toggleSidebar = () => {
    return (dispatch) => {
        dispatch({ type: SIDEBAR })
    }
}

export const resetUI = () => {
    return (dispatch) => {
        dispatch({ type: RESET })
    }
}