import { SUCCESS, ERROR, DISMISS, RESET } from "../types/ui"

const initialState = {
    message: '',
    severity: '',
    snackbar: false,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SNACKBAR":
            return {
                message: action.payload.message,
                severity: action.payload.severity,
                snackbar: true,
            }
        case SUCCESS:
            return {
                message: action.payload,
                type: 'success',
                snackbar: true,
            }
        case ERROR:
            return {
                message: action.payload,
                type: 'error',
                snackbar: true,
            }
        case DISMISS:
            return {
                message: action.payload.message,
                severity: action.payload.severity,
                snackbar: false,
            }
        case RESET:
            return {
                message: '',
                type: '',
                snackbar: false,
            }
        default:
            return state
    }
}

export default uiReducer