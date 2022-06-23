// import { DISMISS, SNACKBAR } from "../../types/ui"

export const popMessage = (message, severity) => {
    return (dispatch) => {
        dispatch({

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

            payload: {
                message: message,
                severity: severity,
            }
        })
    }
}