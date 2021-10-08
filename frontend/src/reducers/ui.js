import { DISMISS, SNACKBAR } from "../types/ui"

const initialState = {
    message: '',
    severity: '',
    snackbar: false,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SNACKBAR:
            return {
                message: action.payload.message,
                severity: action.payload.severity,
                snackbar: true,
            }
        case DISMISS:
            return {
                message: action.payload.message,
                severity: action.payload.severity,
                snackbar: false,
            }
        default:
            return state
    }
}

export default uiReducer