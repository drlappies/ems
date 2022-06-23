import { v4 as uuidv4 } from 'uuid'
import snackbarActionTypes from "../actions/notification"

const initialState = {
    snackbars: [],
}

const snackbarReducer = (state = initialState, action) => {
    const { payload, type } = action

    switch (type) {
        case snackbarActionTypes.ADD_SNACKBAR:
            return {
                ...state,
                snackbars: [...state.snackbars, { key: uuidv4(), ...payload }]
            }

        case snackbarActionTypes.REMOVE_SNACKBAR:
            return {
                ...state,
                snackbars: state.snackbars.map(el => el.key === payload.key ? { ...el, dismissed: true } : { ...el })
            }

        default:
            return { ...state }
    }
}

export default snackbarReducer


