import { DISMISS, SNACKBAR } from "../types/ui"

export const popMessage = (message, severity) => {
    return (dispatch) => {
        dispatch({
            type: SNACKBAR,
            payload: {
                message: message,
                severity: severity,
            }
        })
    }
}

export const dismissMessage = (message, severity) => {
    return (dispatch) => {
        dispatch({
            type: DISMISS,
            payload: {
                message: message,
                severity: severity,
            }
        })
    }
}