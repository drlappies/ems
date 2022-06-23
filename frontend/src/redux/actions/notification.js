const snackbarActionTypes = {
    ADD_SNACKBAR: "ADD_SNACKBAR",
    REMOVE_SNACKBAR: "REMOVE_SNACKBAR",
}

export default snackbarActionTypes

export function addSnackbar(payload) {
    return {
        type: snackbarActionTypes.ADD_SNACKBAR,
        payload
    }
}

export function removeSnackbar(payload) {
    return {
        type: snackbarActionTypes.REMOVE_SNACKBAR,
        payload
    }
}