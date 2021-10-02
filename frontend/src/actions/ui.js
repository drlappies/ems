import { SUCCESS, ERROR, DISMISS, SIDEBAR } from "../types/ui"

export const popMessage = (message, severity) => {
    console.log(message)
    return (dispatch) => {
        dispatch({
            type: "SNACKBAR",
            payload: {
                message: message,
                severity: severity,
            }
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
        dispatch({
            type: DISMISS,
            payload: {
                message: '',
                severity: ''
            }
        })
    }
}

export const toggleSidebar = () => {
    return (dispatch) => {
        dispatch({ type: SIDEBAR })
    }
}